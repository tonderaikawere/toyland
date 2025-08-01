import React, { useState, useRef, useEffect } from 'react';
import { useToyStore } from '../context/ToyStoreContext';
import {
  MessageSquareText,
  X,
  Send,
  Sparkles,
  Bot,
  ShoppingBag,
  ExternalLink,
  ShieldCheck,
  Package
} from 'lucide-react';

export const LiveChatDrawer: React.FC = () => {
  const {
    chatMessages,
    isChatOpen,
    setIsChatOpen,
    sendChatMessage,
    addToCart,
    openProductDetail,
    trackOrderById,
    setActiveTab
  } = useToyStore();

  const [input, setInput] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isChatOpen) {
      scrollToBottom();
    }
  }, [chatMessages, isChatOpen]);

  if (!isChatOpen) return null;

  const handleSend = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || isSending) return;

    setInput('');
    setIsSending(true);
    await sendChatMessage(text);
    setIsSending(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        onClick={() => setIsChatOpen(false)}
        className="absolute inset-0 bg-slate-950/60 backdrop-blur-xs transition-opacity"
      />

      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between border-l border-slate-200">
          
          {/* Header */}
          <div className="p-4 bg-[#222222] text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-[#FF6A00] text-white flex items-center justify-center font-black">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="text-sm font-black text-white flex items-center gap-1.5">
                  Toyland Sourcing Assistant
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                </h3>
                <p className="text-[10px] text-slate-300 font-medium">
                  Instant Factory Direct & Custom Order Support • Powered by Gemini
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsChatOpen(false)}
              className="p-1.5 rounded-full hover:bg-slate-800 text-white transition-colors"
              id="close-chat-drawer-btn"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Container */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            
            {chatMessages.map(msg => {
              const isUser = msg.sender === 'user';

              return (
                <div
                  key={msg.id}
                  className={`flex flex-col ${isUser ? 'items-end' : 'items-start'}`}
                >
                  <div className="flex items-end gap-2 max-w-[85%]">
                    {!isUser && (
                      <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px] flex-shrink-0">
                        🤖
                      </div>
                    )}

                    <div
                      className={`p-3 rounded-2xl text-xs leading-relaxed shadow-xs ${
                        isUser
                          ? 'bg-slate-900 text-amber-300 rounded-br-none'
                          : 'bg-white text-slate-900 border border-slate-200 rounded-bl-none'
                      }`}
                    >
                      <p>{msg.text}</p>

                      {/* Toy Suggestion Cards embedded in chat */}
                      {msg.toySuggestions && msg.toySuggestions.length > 0 && (
                        <div className="mt-3 space-y-2 border-t border-slate-100 pt-2">
                          <p className="text-[10px] font-black uppercase text-amber-800">
                            Suggested Toys for You:
                          </p>
                          {msg.toySuggestions.map(toy => (
                            <div
                              key={toy.id}
                              className="bg-amber-50/80 border border-amber-200 rounded-xl p-2 flex items-center justify-between gap-2"
                            >
                              <div className="flex items-center gap-2">
                                <img
                                  src={toy.imageUrl}
                                  alt=""
                                  className="w-10 h-10 object-cover rounded-lg bg-white flex-shrink-0"
                                />
                                <div>
                                  <p className="font-bold text-slate-900 text-[11px] line-clamp-1">{toy.name}</p>
                                  <p className="text-[10px] text-amber-900 font-extrabold">${toy.price.toFixed(2)} • {toy.ageLabel}</p>
                                </div>
                              </div>
                              <button
                                onClick={() => {
                                  setIsChatOpen(false);
                                  openProductDetail(toy);
                                }}
                                className="px-2.5 py-1 bg-slate-900 text-amber-300 text-[10px] font-bold rounded-lg whitespace-nowrap"
                              >
                                View
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  <span className="text-[9px] text-slate-400 mt-1 px-1">
                    {msg.timestamp}
                  </span>

                  {/* Quick Reply Chips */}
                  {!isUser && msg.quickReplies && msg.quickReplies.length > 0 && (
                    <div className="flex flex-wrap gap-1.5 mt-2 max-w-[90%]">
                      {msg.quickReplies.map((reply, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSend(reply)}
                          className="text-[10px] font-bold bg-white hover:bg-amber-100 text-slate-800 border border-amber-300/80 px-2.5 py-1 rounded-full transition-colors shadow-2xs"
                          id={`chat-chip-${idx}`}
                        >
                          💬 {reply}
                        </button>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}

            {isSending && (
              <div className="flex items-center gap-2 text-xs text-slate-500 font-medium">
                <div className="w-6 h-6 rounded-full bg-amber-400 text-slate-950 flex items-center justify-center font-black text-[10px] animate-bounce">
                  🤖
                </div>
                <span>PlayPal is thinking...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Support Shortcuts Bar */}
          <div className="bg-amber-100/60 p-2 border-t border-amber-200/80 flex items-center justify-around text-[10px] font-bold text-slate-800">
            <button
              onClick={() => handleSend('Show me gift ideas for 3-5 year olds')}
              className="hover:text-amber-900 hover:underline"
            >
              🎁 Ages 3-5 Gifts
            </button>
            <button
              onClick={() => handleSend('Where is my order TY-89234?')}
              className="hover:text-amber-900 hover:underline"
            >
              📦 Track Order
            </button>
            <button
              onClick={() => handleSend('What is your return policy?')}
              className="hover:text-amber-900 hover:underline"
            >
              🛡️ Return Policy
            </button>
          </div>

          {/* Chat Input Bar */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-white border-t border-slate-200 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask about age gifts, safety, or order status..."
              className="flex-1 bg-slate-100 text-slate-900 text-xs px-3.5 py-2.5 rounded-2xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-slate-900"
              id="live-chat-input"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="w-9 h-9 rounded-lg bg-[#FF6A00] hover:bg-[#FF5500] text-white flex items-center justify-center transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
              id="send-chat-msg-btn"
            >
              <Send className="w-4 h-4 text-white" />
            </button>
          </form>

        </div>
      </div>
    </div>
  );
};
