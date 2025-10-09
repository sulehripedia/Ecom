import React, { useState, useRef, useEffect } from 'react';
import { Send, Brain, Search, Zap, Globe, Code, BookOpen, Sparkles, Loader2, X, Settings } from 'lucide-react';

// Import the CSS file you will create below
import './AIAgent.css';

const FreeAIAgent = () => {
  const [messages, setMessages] = useState([
    {
      role: 'model', // Changed from 'assistant' to 'model' for Gemini
      content: "Hey! I'm an AI agent powered by Google's Gemini 1.5. I can search the web, answer questions, write code, and more. Ask me anything!",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [geminiKey, setGeminiKey] = useState('');
  const [showApiModal, setShowApiModal] = useState(false);
  const [currentSearchResults, setCurrentSearchResults] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const saved = localStorage.getItem('gemini_api_key');
    if (saved) setGeminiKey(saved);
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const searchWeb = async (query) => {
    try {
      // Using DuckDuckGo Instant Answer API (completely free, no key needed)
      const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(query)}&format=json&no_html=1&skip_disambig=1`);
      const data = await response.json();
      
      let results = [];
      if (data.AbstractText) {
        results.push({
          title: data.Heading || 'Summary',
          snippet: data.AbstractText,
          url: data.AbstractURL || ''
        });
      }
      if (data.RelatedTopics && data.RelatedTopics.length > 0) {
        data.RelatedTopics.slice(0, 3).forEach(topic => {
          if (topic.Text) {
            results.push({
              title: topic.Text.split(' - ')[0] || 'Related',
              snippet: topic.Text,
              url: topic.FirstURL || ''
            });
          }
        });
      }
      return results;
    } catch (error) {
      console.error('Search error:', error);
      return [];
    }
  };

  const callGeminiAPI = async (userMessage, context = '') => {
    if (!geminiKey) {
      return "⚠️ Please add your FREE Google Gemini API key to start chatting!\n\n1. Go to Google AI Studio (makersuite.google.com)\n2. Sign in with your Google account\n3. Click 'Get API key'\n4. Create an API key in a new project\n5. Click 'API Settings' and paste it here!";
    }

    const API_ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${geminiKey}`;
    
    const systemPrompt = `You are an intelligent AI assistant. You can:
- Answer questions accurately and helpfully
- Search the web for real-time information
- Write and explain code in any language
- Analyze data and solve complex problems
- Provide step-by-step explanations

${context ? `\nRelevant web search results:\n${context}\n\nUse this information to provide an accurate, up-to-date answer.` : ''}

Be conversational, clear, and helpful. Format your response with Markdown. Format code blocks with triple backticks and the language name. Keep responses concise but thorough.`;

    try {
      const response = await fetch(API_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: systemPrompt }, { text: `User query: ${userMessage}` }]
            }
          ],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 2048,
            topP: 1,
          },
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error?.message || 'API request failed');
      }

      const data = await response.json();
      // Handle cases where the model might not return content
      if (!data.candidates || data.candidates.length === 0 || !data.candidates[0].content) {
        return "The model did not provide a response. This could be due to safety settings or an empty response. Please try rephrasing your query.";
      }
      return data.candidates[0].content.parts[0].text;

    } catch (error) {
      console.error('Gemini API error:', error);
      if (error.message.includes('API key not valid')) {
          return `❌ Invalid API key. Please check your Google Gemini API key in settings.\n\nMake sure you copied the full key from Google AI Studio.`;
      }
      return `❌ Error: ${error.message}`;
    }
  };

  const shouldSearchWeb = (query) => {
    const searchKeywords = [
      'latest', 'recent', 'current', 'news', 'today', 'weather',
      'stock', 'price', 'search', 'find', 'look up', 'what is happening',
      'trending', 'update', '2025', 'now', 'currently' // Added 2025 based on current year
    ];
    return searchKeywords.some(keyword => query.toLowerCase().includes(keyword));
  };

  const processMessage = async (userMessage) => {
    setIsProcessing(true);
    setCurrentSearchResults([]);

    try {
      let aiResponse = '';
      let searchContext = '';
      let usedSearch = false;
      let results = [];

      if (shouldSearchWeb(userMessage)) {
        setMessages(prev => [...prev, {
          role: 'system',
          content: '🔍 Searching the web for latest information...',
          timestamp: new Date()
        }]);

        results = await searchWeb(userMessage);
        
        // Remove the "Searching..." message
        setMessages(prev => prev.slice(0, -1));

        if (results.length > 0) {
          usedSearch = true;
          setCurrentSearchResults(results);
          searchContext = results.map((r, i) => 
            `[${i + 1}] ${r.title}\n${r.snippet}\nSource: ${r.url}`
          ).join('\n\n');
        }
      }

      aiResponse = await callGeminiAPI(userMessage, searchContext);

      setMessages(prev => [...prev, {
        role: 'model', // Changed to 'model'
        content: aiResponse,
        timestamp: new Date(),
        searchUsed: usedSearch,
        searchResults: usedSearch ? results : [] // pass the results here
      }]);

    } catch (error) {
      setMessages(prev => [...prev, {
        role: 'model', // Changed to 'model'
        content: '❌ Something went wrong. Please try again.',
        timestamp: new Date()
      }]);
    }

    setIsProcessing(false);
  };

  const handleSubmit = () => {
    if (!input.trim() || isProcessing) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, {
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    }]);
    setInput('');
    processMessage(userMessage);
  };

  const saveApiKey = () => {
    localStorage.setItem('gemini_api_key', geminiKey);
    setShowApiModal(false);
  };
  
  const quickPrompts = [
    { icon: <Search />, text: "Latest AI news", query: "What are the latest developments in AI in 2025?" },
    { icon: <Code />, text: "Write code", query: "Write a Python function to read and parse a CSV file" },
    { icon: <Zap />, text: "Explain concept", query: "Explain machine learning in simple terms" },
    { icon: <Globe />, text: "Current trends", query: "What are the current trends in web development?" }
  ];

  return (
    <div className="ai-agent-container">
      <div className="ai-agent-inner">
        {/* Header */}
        <div className="header-card">
          <div className="header-content">
            <div className="header-title-group">
              <div className="header-icon-wrapper">
                <Brain className="header-icon" />
              </div>
              <div>
                <h1 className="header-title">AI Agent</h1>
                <p className="header-subtitle">Gemini 1.5 + Free Web Search</p>
              </div>
            </div>
            <button
              onClick={() => setShowApiModal(true)}
              className="api-settings-button"
            >
              <Settings className="icon-sm" />
              API Settings
            </button>
          </div>
          
          {!geminiKey && (
            <div className="setup-notice">
              <p>
                🎁 <strong>Setup Required:</strong> Click "API Settings" to add your FREE Gemini API key.
              </p>
            </div>
          )}
        </div>

        {/* API Key Modal */}
        {showApiModal && (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2 className="modal-title">API Settings</h2>
                <button onClick={() => setShowApiModal(false)} className="modal-close-button">
                  <X className="icon-md" />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="info-box">
                  <p>✅ <strong>100% FREE!</strong> Google gives you free access to the powerful Gemini model.</p>
                </div>
                <div>
                  <label className="input-label">Gemini API Key</label>
                  <input
                    type="password"
                    value={geminiKey}
                    onChange={(e) => setGeminiKey(e.target.value)}
                    placeholder="Enter your Gemini API key..."
                    className="modal-input"
                  />
                </div>
                <div className="instructions-box">
                  <p className="instructions-title">How to get your FREE API key:</p>
                  <ol className="instructions-list">
                    <li>Visit <a href="https://makersuite.google.com/" target="_blank" rel="noopener noreferrer">Google AI Studio</a></li>
                    <li>Sign in with your Google account</li>
                    <li>Click on "Get API key"</li>
                    <li>Click "Create API key"</li>
                    <li>Copy the key and paste it above</li>
                  </ol>
                </div>
                
                <button
                  onClick={saveApiKey}
                  disabled={!geminiKey}
                  className="modal-save-button"
                >
                  Save & Start Chatting
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Chat */}
        <div className="chat-container">
          <div className="chat-area">
            {messages.map((msg, idx) => (
              <div key={idx} className={`message-row ${msg.role === 'user' ? 'user-row' : 'assistant-row'}`}>
                {msg.role === 'system' ? (
                  <div className="system-message">
                    <Loader2 className="icon-sm icon-spin" />
                    {msg.content}
                  </div>
                ) : (
                  <div className={`message-bubble ${msg.role === 'user' ? 'user-bubble' : 'assistant-bubble'}`}>
                    {msg.searchUsed && (
                      <div className="search-tag">
                        <Search className="icon-xs" />
                        <span>Web search used</span>
                      </div>
                    )}
                    <div className="prose">
                      {/* Using a simple regex to format code blocks, for a full markdown parser, consider a library like 'react-markdown' */}
                      {msg.content.split('```').map((part, index) =>
                        index % 2 === 1 ? (
                          <pre key={index}><code>{part.split('\n').slice(1).join('\n')}</code></pre>
                        ) : (
                          <p key={index}>{part}</p>
                        )
                      )}
                    </div>
                    {msg.searchResults && msg.searchResults.length > 0 && (
                      <div className="sources-container">
                        <p className="sources-title">Sources:</p>
                        {msg.searchResults.map((result, i) => (
                          <a
                            key={i}
                            href={result.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="source-link"
                          >
                            <p className="source-title">{result.title}</p>
                            <p className="source-snippet">{result.snippet}</p>
                          </a>
                        ))}
                      </div>
                    )}
                    <p className="message-timestamp">
                      {msg.timestamp.toLocaleTimeString()}
                    </p>
                  </div>
                )}
              </div>
            ))}
            
            {isProcessing && (
              <div className="message-row assistant-row">
                <div className="assistant-bubble">
                  <div className="thinking-indicator">
                    <Loader2 className="icon-md icon-spin" />
                    <span>AI is thinking...</span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length <= 1 && (
            <div className="quick-prompts-container">
              <p className="quick-prompts-title">Try these:</p>
              <div className="quick-prompts-grid">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setInput(prompt.query);
                      // Use a timeout to ensure state update before submit
                      setTimeout(() => document.getElementById('submit-button').click(), 100);
                    }}
                    className="quick-prompt-button"
                  >
                    <div className="quick-prompt-header">
                      {React.cloneElement(prompt.icon, { className: "icon-sm" })}
                      <span>{prompt.text}</span>
                    </div>
                    <p className="quick-prompt-query">{prompt.query}</p>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="input-area">
            <div className="input-wrapper">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
                placeholder="Ask me anything... I'll search if needed!"
                className="chat-input"
                disabled={isProcessing}
              />
              <button
                id="submit-button"
                onClick={handleSubmit}
                disabled={isProcessing || !input.trim()}
                className="send-button"
              >
                {isProcessing ? <Loader2 className="icon-md icon-spin" /> : <Send className="icon-md" />}
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="footer">
          <div className="footer-items">
            <div className="footer-item">
              <Sparkles className="icon-sm" />
              <span>Gemini 1.5 Flash</span>
            </div>
            <div className="footer-item">
              <Search className="icon-sm" />
              <span>DuckDuckGo Search</span>
            </div>
            <div className="footer-item">
              <Zap className="icon-sm" />
              <span>100% FREE</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FreeAIAgent;