import React, { useState, useEffect, useRef } from 'react';
import './ChatBot.css';

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Bonjour ! Comment puis-je vous aider ?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const toggleChat = () => setIsOpen(o => !o);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const recruitmentKeywords = ['recrutement', 'effectif', 'formation', 'qualification', 'coût', 'round', 'annuler'];

  const isRecruitmentQuestion = (text) => {
    const lowerText = text.toLowerCase();
    return recruitmentKeywords.some(keyword => lowerText.includes(keyword));
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;
  
    const userText = input.trim();
    setMessages(prev => [...prev, { from: 'user', text: userText }]);
    setInput('');
    setIsLoading(true);
  
    const minLoadingTime = 800; 
    const startTime = Date.now();
  
    try {
      const res = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000'}/api/chatbot`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText }),
      });
  
      const data = await res.json();
      let botReply = data.reply || "Désolé, je n'ai pas de réponse.";
  
      botReply = botReply.replace(/\*\*/g, '');
  
      const elapsed = Date.now() - startTime;
      const remainingTime = minLoadingTime - elapsed;
  
      if (remainingTime > 0) {
        setTimeout(() => {
          setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
          setIsLoading(false);
        }, remainingTime);
      } else {
        setMessages(prev => [...prev, { from: 'bot', text: botReply }]);
        setIsLoading(false);
      }
    } catch (err) {
      console.error("Chatbot error:", err);
      setMessages(prev => [...prev, { from: 'bot', text: "Erreur lors de la réponse du bot." }]);
      setIsLoading(false);
    }
  };
  

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <>
      <div className="chatbot-bubble" onClick={toggleChat} aria-label="Ouvrir le chat">
        💬
      </div>

      <div className={`chatbot-window ${isOpen ? 'open' : ''}`} aria-live="polite">
        <div className="chatbot-header">
          <span>BIZ Support</span>
          <button className="close-btn" onClick={toggleChat} aria-label="Fermer">×</button>
        </div>

        <div className="chatbot-messages">
          {messages.map((msg, idx) => (
            <div key={idx} className={`chat-message ${msg.from}`}>
              {/* Découpe en lignes et détecte numéro + sous-titre + texte */}
              {msg.text.split('\n').map((line, i) => {
                const cleanLine = line.replace(/\*\*/g, '');
                // Regex : numéro + sous-titre + texte
                const match = cleanLine.match(/^(\d+[\.-])\s+([^:]+:\s*)(.*)$/);
                if (match) {
                  const number = match[1];
                  const subtitle = match[2];
                  const rest = match[3];
                  return (
                    <div key={i} className="chat-line">
                      <span className="chat-line-number">{number} </span>
                      <strong className="chat-line-subtitle">{subtitle}</strong>
                      <span className="chat-line-text">{rest}</span>
                    </div>
                  );
                }
                // Si ligne avec seulement numéro + texte sans sous-titre (optionnel)
                const matchSimple = cleanLine.match(/^(\d+[\.-])\s*(.*)$/);
                if (matchSimple) {
                  const number = matchSimple[1];
                  const rest = matchSimple[2];
                  return (
                    <div key={i} className="chat-line">
                      <strong className="chat-line-number">{number}</strong>
                      <span className="chat-line-text">{rest}</span>
                    </div>
                  );
                }
                // Sinon ligne simple
                return <div key={i} className="chat-line">{cleanLine}</div>;
              })}
            </div>
          ))}

          {isLoading && (
            <div className="chat-message bot loading-dots">
              <span>.</span><span>.</span><span>.</span>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="chatbot-input">
          <input
            type="text"
            placeholder="Tapez votre message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            disabled={isLoading}
            aria-label="Votre question"
          />
          <button onClick={sendMessage} disabled={isLoading} aria-label="Envoyer">
            {isLoading ? '...' : 'Envoyer'}
          </button>
        </div>
      </div>
    </>
  );
};

export default Chatbot;