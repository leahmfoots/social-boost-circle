
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Send, TrendingUp, TrendingDown, Activity } from "lucide-react";

interface Message {
  id: string;
  type: 'user' | 'bot';
  content: string;
  timestamp: Date;
  cryptoData?: {
    symbol: string;
    price: number;
    change: number;
    recommendation?: 'buy' | 'sell' | 'hold';
  };
}

const CryptoBotChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      content: 'Hello! I\'m your AI crypto assistant. I can help you analyze cryptocurrencies, provide market insights, and suggest trading strategies. What would you like to know?',
      timestamp: new Date(),
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const mockCryptoData = {
    'BTC': { symbol: 'BTC', price: 43250.00, change: 2.5 },
    'ETH': { symbol: 'ETH', price: 2580.75, change: -1.2 },
    'ADA': { symbol: 'ADA', price: 0.48, change: 4.8 },
    'SOL': { symbol: 'SOL', price: 98.50, change: 3.2 },
  };

  const generateBotResponse = (userMessage: string): Message => {
    const message = userMessage.toLowerCase();
    let response = '';
    let cryptoData = undefined;

    if (message.includes('btc') || message.includes('bitcoin')) {
      cryptoData = { ...mockCryptoData.BTC, recommendation: 'buy' as const };
      response = `Bitcoin (BTC) is currently trading at $${cryptoData.price.toLocaleString()} with a ${cryptoData.change > 0 ? 'gain' : 'loss'} of ${Math.abs(cryptoData.change)}%. Based on technical analysis, I recommend a ${cryptoData.recommendation.toUpperCase()} position. The RSI indicates oversold conditions and recent support levels suggest a potential upward movement.`;
    } else if (message.includes('eth') || message.includes('ethereum')) {
      cryptoData = { ...mockCryptoData.ETH, recommendation: 'hold' as const };
      response = `Ethereum (ETH) is trading at $${cryptoData.price.toLocaleString()} with a ${cryptoData.change > 0 ? 'gain' : 'loss'} of ${Math.abs(cryptoData.change)}%. Current recommendation is ${cryptoData.recommendation.toUpperCase()}. The upcoming network upgrades and DeFi activity suggest medium-term stability.`;
    } else if (message.includes('portfolio') || message.includes('analyze')) {
      response = 'I can help analyze your portfolio! Here\'s what I can do:\n\n• Risk assessment and diversification analysis\n• Performance tracking and benchmarking\n• Rebalancing recommendations\n• Market correlation insights\n\nWould you like to share your current holdings for a detailed analysis?';
    } else if (message.includes('market') || message.includes('trend')) {
      response = 'Current market analysis:\n\n• Overall sentiment: Cautiously optimistic\n• Market cap: $1.7T (+2.1% 24h)\n• Fear & Greed Index: 65 (Greed)\n• Top performers: SOL (+3.2%), ADA (+4.8%)\n• Key resistance levels being tested\n\nWould you like analysis on any specific cryptocurrency?';
    } else {
      response = 'I can help with cryptocurrency analysis, market insights, portfolio optimization, and trading strategies. Try asking about:\n\n• Specific coins (BTC, ETH, ADA, SOL)\n• Market trends and analysis\n• Portfolio recommendations\n• Technical indicators\n\nWhat interests you most?';
    }

    return {
      id: Date.now().toString(),
      type: 'bot',
      content: response,
      timestamp: new Date(),
      cryptoData,
    };
  };

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse = generateBotResponse(input);
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <Card className="h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Crypto Assistant
        </CardTitle>
        <CardDescription>
          Get real-time crypto insights and trading recommendations
        </CardDescription>
      </CardHeader>
      
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4" ref={scrollRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.type === 'bot' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
                
                <div className={`max-w-[80%] ${message.type === 'user' ? 'order-1' : ''}`}>
                  <div
                    className={`p-3 rounded-lg ${
                      message.type === 'user'
                        ? 'bg-primary text-primary-foreground ml-auto'
                        : 'bg-muted'
                    }`}
                  >
                    <p className="text-sm whitespace-pre-line">{message.content}</p>
                  </div>
                  
                  {message.cryptoData && (
                    <div className="mt-2 p-3 bg-card border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-semibold">{message.cryptoData.symbol}</span>
                        <Badge 
                          variant={message.cryptoData.recommendation === 'buy' ? 'default' : 
                                   message.cryptoData.recommendation === 'sell' ? 'destructive' : 'secondary'}
                        >
                          {message.cryptoData.recommendation?.toUpperCase()}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 text-sm">
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4" />
                          ${message.cryptoData.price.toLocaleString()}
                        </div>
                        <div className={`flex items-center gap-1 ${
                          message.cryptoData.change > 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {message.cryptoData.change > 0 ? (
                            <TrendingUp className="h-4 w-4" />
                          ) : (
                            <TrendingDown className="h-4 w-4" />
                          )}
                          {Math.abs(message.cryptoData.change)}%
                        </div>
                      </div>
                    </div>
                  )}
                  
                  <div className="text-xs text-muted-foreground mt-1">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>

                {message.type === 'user' && (
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                )}
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    <Bot className="h-4 w-4" />
                  </AvatarFallback>
                </Avatar>
                <div className="bg-muted p-3 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        
        <div className="p-4 border-t">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about crypto markets, analysis, or trading strategies..."
              className="flex-1"
            />
            <Button onClick={handleSendMessage} disabled={!input.trim() || isTyping}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CryptoBotChat;
