import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';
import { INITIAL_TOYS } from './src/data/mockData.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini Client
let ai: GoogleGenAI | null = null;

function getGeminiClient() {
  if (!ai && process.env.GEMINI_API_KEY) {
    ai = new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return ai;
}

// Helper for calling Gemini with retry and fallback model handling
async function callGeminiWithFallback(client: GoogleGenAI, params: any) {
  const modelsToTry = ['gemini-3.6-flash', 'gemini-2.5-flash'];
  let lastError: any = null;

  for (const modelName of modelsToTry) {
    try {
      const response = await client.models.generateContent({
        ...params,
        model: modelName
      });
      return response;
    } catch (err: any) {
      lastError = err;
      console.warn(`Gemini call failed with model ${modelName}:`, err?.message || err);
      // Wait 300ms before trying fallback model
      await new Promise(resolve => setTimeout(resolve, 300));
    }
  }
  throw lastError;
}

// Health Check API
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Live Chat Support API
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [], currentToy, userContext } = req.body;

    const client = getGeminiClient();

    if (!client) {
      return res.json({
        reply: "Hi there! I'm PlayPal, your Toy Store Assistant! 🧸 How can I help you today? You can ask me about gift ideas by age, order status, or recommendations!",
        suggestedToyIds: ['toy-1', 'toy-3', 'toy-4'],
        quickReplies: ['Toys for 3-5 year olds', 'Track my order', 'Best STEM gifts', 'Return Policy']
      });
    }

    const availableToysSummary = INITIAL_TOYS.map(t => 
      `ID: ${t.id} | Name: ${t.name} | Age: ${t.ageLabel} | Price: $${t.price} | Category: ${t.category} | Description: ${t.description}`
    ).join('\n');

    const systemPrompt = `You are "PlayPal", the friendly, knowledgeable, and energetic Live Chat Support Expert for Toyland Toy Store.
Your job is to assist parents, grandparents, and gift buyers in finding the perfect toys, checking age appropriateness, answering store queries, explaining safety details, and helping with order tracking.

Available Toy Store Catalog:
${availableToysSummary}

Current Page Context: ${currentToy ? `User is currently viewing: ${currentToy.name} (${currentToy.ageLabel}, $${currentToy.price})` : 'User is browsing the store'}
User Profile Info: ${userContext ? JSON.stringify(userContext) : 'Guest visitor'}

Instructions:
1. Always maintain a warm, playful, and extremely helpful tone with cute emojis.
2. If the user asks for recommendations (e.g. "gift for 6 year old", "educational toy"), suggest specific toys from the catalog using their EXACT IDs in the "suggestedToyIds" array.
3. Keep responses concise (2-4 short friendly sentences).
4. Return response strictly in JSON format matching the schema provided.`;

    const response = await callGeminiWithFallback(client, {
      contents: [
        {
          role: 'user',
          parts: [{ text: `${systemPrompt}\n\nUser Message: ${message}` }]
        }
      ],
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            reply: {
              type: Type.STRING,
              description: 'The conversational response to the user.'
            },
            suggestedToyIds: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'Array of exact toy IDs recommended for this prompt.'
            },
            quickReplies: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: '2-4 short suggested follow-up query chips.'
            }
          },
          required: ['reply']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      reply: parsed.reply || "I'd love to help you find the best toy! What age group or interest are you looking for?",
      suggestedToyIds: parsed.suggestedToyIds || [],
      quickReplies: parsed.quickReplies || ['Show Best Sellers', 'Toys by Age', 'Live Agent Help']
    });

  } catch (error: any) {
    console.warn('Chat API temporarily using smart fallback due to model demand:', error?.message || error);
    res.json({
      reply: "I'm always ready to help! 🧸 You can explore our toys categorized by age group or view our current top STEM picks.",
      suggestedToyIds: ['toy-1', 'toy-3', 'toy-4'],
      quickReplies: ['Browse Catalog', 'Order Tracking', 'Best STEM Gifts']
    });
  }
});

// Personalized Recommendation Engine API
app.post('/api/recommendations', async (req, res) => {
  const { orderHistory = [], wishlist = [], browsingHistory = [], preferredAge } = req.body;

  // Helper to construct smart fallback recommendations based on catalog & filters
  const getSmartFallbackRecommendations = () => {
    let candidateToys = INITIAL_TOYS;
    if (preferredAge && preferredAge !== 'all') {
      const matched = INITIAL_TOYS.filter(t => t.ageGroup === preferredAge);
      if (matched.length > 0) candidateToys = matched;
    }

    const selected = candidateToys.slice(0, 3);
    return selected.map(toy => ({
      toyId: toy.id,
      reason: `Top certified selection for ${toy.ageLabel} designed for ${toy.skillsLearned?.[0] || 'creative learning'}.`,
      badgeText: toy.isBestSeller ? 'Staff Favorite' : 'Bento Selection'
    }));
  };

  try {
    const client = getGeminiClient();

    if (!client) {
      return res.json({ recommendations: getSmartFallbackRecommendations() });
    }

    const catalogSummary = INITIAL_TOYS.map(t => ({
      id: t.id,
      name: t.name,
      category: t.category,
      ageGroup: t.ageGroup,
      price: t.price,
      skills: t.skillsLearned
    }));

    const prompt = `You are the Personalization Engine for Toyland Toy Store.
Analyze the user's data to recommend 3 specific, highly relevant toys from the catalog.

User Context:
- Past Orders: ${JSON.stringify(orderHistory)}
- Wishlist items: ${JSON.stringify(wishlist)}
- Recently viewed toys: ${JSON.stringify(browsingHistory)}
- Preferred Age Group Filter: ${preferredAge || 'All'}

Store Toy Catalog:
${JSON.stringify(catalogSummary)}

Task:
Select 3 toy IDs that best fit this user's profile and provide a short personalized explanation (1 sentence) for why it was recommended, plus a catchy 2-3 word badge text (e.g., "Matches Rocket Purchase", "Top STEM Pick", "Age 6-8 Match").`;

    const response = await callGeminiWithFallback(client, {
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            recommendations: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  toyId: { type: Type.STRING },
                  reason: { type: Type.STRING },
                  badgeText: { type: Type.STRING }
                },
                required: ['toyId', 'reason', 'badgeText']
              }
            }
          },
          required: ['recommendations']
        }
      }
    });

    const parsed = JSON.parse(response.text || '{}');
    res.json({
      recommendations: parsed.recommendations && parsed.recommendations.length > 0
        ? parsed.recommendations
        : getSmartFallbackRecommendations()
    });

  } catch (error: any) {
    console.warn('Recommendations API gracefully handled model peak demand:', error?.message || error);
    res.json({
      recommendations: getSmartFallbackRecommendations()
    });
  }
});

// Setup Vite development server or production static serving
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Toyland Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
