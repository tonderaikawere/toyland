# Toyland Toy Store & Gift Finder

Welcome to **Toyland**, a modern, interactive, and child-friendly toy store built with a gorgeous bento-grid layout, playful background designs, and robust features. This platform is designed for parents, grandparents, and gift shoppers to find the perfect toys for all age stages, track active deliveries, and manage shipping addresses for kids' birthdays and holidays.

## 🌟 Key Features

* **Bento Grid Design**: Sleek, modular, premium card layout grouping content cleanly for a modern aesthetic.
* **Kid-Friendly Aesthetics**: Soft floating clouds, colorful stars, and interactive balloons rendered as SVGs in the background.
* **PlayPal Support Assistant**: Live support chat drawer to search for toys, ask about age groups, track deliveries, or review policy documents.
* **Smart Recommendations**: Custom product carousel tailored to user browsing history, wishlists, and preferences.
* **Secure Checkout**: Full address management and checkout simulations.
* **Live Order Tracking**: Interactive timeline showing delivery updates.
* **Compliance Center**: Complete directory of 30 comprehensive legal and store policies (1500+ words each) for GDPR, COPPA, safety, shipping, etc.

## 🛠️ Technology Stack

* **Frontend**: React, TypeScript, TailwindCSS
* **Development Server**: Vite
* **Icons**: Lucide React
* **Hosting/Backend**: Express server with hot-reload integrations

## 📂 Project Structure

```
├── public/               # Static assets & generated legal docs
│   └── legal/            # 30 detailed legal compliance markdown files
├── src/
│   ├── components/       # UI elements (Header, Bento components, Drawers)
│   ├── context/          # State management (ToyStoreContext)
│   ├── data/             # Mock data (Toys catalog, reviews, orders)
│   ├── types.ts          # TypeScript type definitions
│   ├── App.tsx           # Main application shell
│   └── index.css         # Styling system
├── LICENSE               # MIT License
└── package.json          # Node scripts and dependencies
```

## 🚀 Running Locally

1. Install dependencies:
   ```bash
   npm install
   ```
2. Start the development server:
   ```bash
   npm run dev
   ```
3. Open `http://localhost:5173` in your browser.

## ⚖️ Compliance & Licensing

This project is licensed under the MIT License. It contains 30 comprehensive store policy documents under `/public/legal/` to meet all global retail compliance, digital accessibility, and children's safety regulations.