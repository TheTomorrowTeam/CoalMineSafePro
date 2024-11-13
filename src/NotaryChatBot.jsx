import { useState, useEffect } from 'react';
import { MessageCircle, Send, X } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

const NotaryChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      handleInitialMessage();
    }
  }, [isOpen]);

  const handleInitialMessage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('http://localhost:5059/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: "hi! i am here to schedule my appoinment to schedule notori document" }),
      });

      const data = await response.json();
      const botMessage = { text: data.botMessage, sender: 'bot' };
      // setMessages([{ text: "hi! i am here to schedule my appoinment to schedule notori document", sender: 'user' }]);
      setMessages([botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages([{ text: 'Error connecting to the chatbot', sender: 'bot' }]);
    }
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    // Add user message
    const userMessage = { text: inputValue, sender: 'user' };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Call the backend to get the AI response
      const response = await fetch('http://localhost:5059/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: inputValue }),
      });

      const data = await response.json();
      const botMessage = { text: data.botMessage, sender: 'bot' };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Error:', error);
      setMessages((prev) => [...prev, { text: 'Error connecting to the chatbot', sender: 'bot' }]);
    }

    setIsLoading(false);
  };

  // Initial message
  useEffect(() => {
    if (messages.length === 0) {
      setMessages([{ text: "Hello! I'm here to help you schedule a notary appointment.", sender: 'bot' }]);
    }
  }, []);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg flex items-center justify-center"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {isOpen && (
        <div className="bg-white rounded-lg shadow-xl w-96 flex flex-col max-h-[600px]">
          <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
            <h3 className="font-semibold">Notary Appointment Assistant</h3>
            <button onClick={() => setIsOpen(false)} className="hover:bg-blue-700 p-1 rounded">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-4 min-h-[400px]">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.sender === 'bot' ? (
                    <ReactMarkdown>{message.text}</ReactMarkdown>
                  ) : (
                    message.text
                  )}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 p-3 rounded-lg">Typing...</div>
              </div>
            )}
          </div>

          <div className="border-t p-4">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type your message..."
                className="flex-1 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-600"
              />
              <button
                onClick={handleSend}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg p-2 disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NotaryChatBot;
