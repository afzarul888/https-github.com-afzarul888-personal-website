"use client";

import { useState, useEffect, useRef, FormEvent } from "react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

const QUICK_SUGGESTIONS = [
  "Proxmox & VPS Setup",
  "Server Migration Inquiry",
  "DevOps Automation Quote",
  "Cloud Architecture Help",
];

export function LiveChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [sessionId, setSessionId] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      sender: "assistant",
      text: "Hello! 👋 I'm Afzarul's AI Assistant. How can I help you today with DevOps, Proxmox, server migrations, or automation?",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Generate or recover session ID
    let sid = sessionStorage.getItem("n8n_chat_session");
    if (!sid) {
      sid = "session-" + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem("n8n_chat_session", sid);
    }
    setSessionId(sid);
  }, []);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isOpen, loading]);

  const sendMessage = async (textToSend?: string) => {
    const text = textToSend || input;
    if (!text.trim() || loading) return;

    const userMsg: Message = {
      id: "user-" + Date.now(),
      sender: "user",
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: userMsg.text, sessionId }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        throw new Error(data.error || "Failed to get response");
      }

      const botMsg: Message = {
        id: "bot-" + Date.now(),
        sender: "assistant",
        text: data.response || "Message received! Thank you.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };

      setMessages((prev) => [...prev, botMsg]);
    } catch (error) {
      console.error("Error sending live chat message:", error);
      const errorMsg: Message = {
        id: "err-" + Date.now(),
        sender: "assistant",
        text: "Sorry, I couldn't connect to the chat workflow right now. Please try again or reach out directly on WhatsApp or Email.",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendMessage();
  };

  return (
    <>
      {/* Floating trigger button */}
      {!isOpen && (
        <button
          className="live-chat-trigger"
          onClick={() => setIsOpen(true)}
          aria-label="Open Live Chat with Afzarul's Assistant"
        >
          <span className="live-chat-pulse" />
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="trigger-text">Live Chat</span>
        </button>
      )}

      {/* Floating Chat Modal */}
      {isOpen && (
        <div className="live-chat-window" role="dialog" aria-label="Live Chat Assistant">
          {/* Header */}
          <div className="chat-header">
            <div className="chat-header-info">
              <span className="brand-mark">/\</span>
              <div>
                <strong>Afzarul AI Assistant</strong>
                <small className="online-status">
                  <span className="status-dot" /> Live n8n Assistant
                </small>
              </div>
            </div>
            <div className="chat-header-actions">
              <button
                type="button"
                className="chat-header-btn"
                title="Reset Chat"
                onClick={() =>
                  setMessages([
                    {
                      id: "welcome-1",
                      sender: "assistant",
                      text: "Hello! 👋 I'm Afzarul's AI Assistant. How can I help you today with DevOps, Proxmox, server migrations, or automation?",
                      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
                    },
                  ])
                }
              >
                ↺
              </button>
              <button
                type="button"
                className="chat-header-btn"
                title="Minimize Chat"
                onClick={() => setIsOpen(false)}
              >
                ✕
              </button>
            </div>
          </div>

          {/* Message History */}
          <div className="chat-body">
            {messages.map((msg) => (
              <div key={msg.id} className={`chat-message ${msg.sender}`}>
                {msg.sender === "assistant" && <span className="msg-avatar">/\</span>}
                <div className="msg-content">
                  <p>{msg.text}</p>
                  <span className="msg-time">{msg.timestamp}</span>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-message assistant">
                <span className="msg-avatar">/\</span>
                <div className="msg-content typing-indicator">
                  <span />
                  <span />
                  <span />
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggestions */}
          {messages.length <= 2 && !loading && (
            <div className="chat-suggestions">
              {QUICK_SUGGESTIONS.map((item) => (
                <button
                  key={item}
                  type="button"
                  className="suggestion-chip"
                  onClick={() => sendMessage(item)}
                >
                  {item}
                </button>
              ))}
            </div>
          )}

          {/* Input Form */}
          <form className="chat-footer" onSubmit={handleFormSubmit}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              disabled={loading}
            />
            <button
              type="submit"
              className="chat-send-btn"
              disabled={!input.trim() || loading}
              aria-label="Send message"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}
