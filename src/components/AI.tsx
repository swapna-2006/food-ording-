
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Sparkles, Send, ArrowLeft, Bot, User } from 'lucide-react';

const AI = () => {
  const [apiKey, setApiKey] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI food assistant. I can help you find the perfect meal based on your preferences, mood, or dietary needs. What can I help you with today?'
    }
  ]);
  const [currentMessage, setCurrentMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const menuData = JSON.parse(localStorage.getItem('menuData') || '[]');

  const handleSendMessage = async () => {
    if (!currentMessage.trim()) return;

    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key to use AI suggestions.",
        variant: "destructive"
      });
      return;
    }

    const userMessage = { role: 'user', content: currentMessage };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setCurrentMessage('');
    setIsLoading(true);

    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: `You are a helpful AI assistant for IchirakuFlow, a Japanese food delivery service. 
              Here's our current menu: ${JSON.stringify(menuData)}
              
              User question: ${currentMessage}
              
              Please provide helpful suggestions based on our menu. If they ask for food recommendations, suggest specific items from our menu with reasons why they might like them. Keep responses friendly and food-focused.`
            }]
          }],
          generationConfig: {
            temperature: 0.7,
            topK: 1,
            topP: 1,
            maxOutputTokens: 2048,
          }
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get AI response');
      }

      const data = await response.json();
      const aiResponse = data.candidates[0]?.content?.parts[0]?.text || 'Sorry, I couldn\'t generate a response.';

      setMessages([...updatedMessages, { role: 'assistant', content: aiResponse }]);
      
    } catch (error) {
      console.error('AI API Error:', error);
      toast({
        title: "AI Error",
        description: "Failed to get AI response. Please check your API key and try again.",
        variant: "destructive"
      });
      
      // Add fallback response
      const fallbackResponse = generateFallbackResponse(currentMessage);
      setMessages([...updatedMessages, { role: 'assistant', content: fallbackResponse }]);
    } finally {
      setIsLoading(false);
    }
  };

  const generateFallbackResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase();
    
    if (lowerMessage.includes('spicy') || lowerMessage.includes('hot')) {
      return "I'd recommend trying our Sasuke Spicy Chicken! It's got the perfect kick and is one of our most popular spicy dishes. 🌶️";
    } else if (lowerMessage.includes('ramen') || lowerMessage.includes('noodles')) {
      return "Our signature Ichiraku Ramen is a must-try! It's the perfect comfort food. We also have Kakashi's Lightning Bowl for something more adventurous. 🍜";
    } else if (lowerMessage.includes('sushi')) {
      return "Try our Naruto Maki Roll! It's fresh, delicious, and beautifully presented. Perfect for sushi lovers! 🍣";
    } else if (lowerMessage.includes('drink') || lowerMessage.includes('tea')) {
      return "Our Sakura Blossom Tea is absolutely delightful! It's refreshing and pairs perfectly with any of our dishes. 🍵";
    } else if (lowerMessage.includes('appetizer') || lowerMessage.includes('starter')) {
      return "Hinata's Gentle Gyoza is a perfect starter! These dumplings are made with love and are incredibly flavorful. 🥟";
    } else {
      return "Based on our menu, I'd recommend starting with our signature Ichiraku Ramen - it's what we're famous for! For something different, try the Sasuke Spicy Chicken if you like bold flavors. What kind of flavors do you usually enjoy?";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const suggestedQuestions = [
    "What's your most popular dish?",
    "I want something spicy",
    "Recommend a healthy option",
    "What goes well with ramen?",
    "I'm feeling adventurous today"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-red-50 p-4">
      <div className="container mx-auto max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <Button 
            variant="outline" 
            onClick={() => window.location.href = '/'}
            className="flex items-center space-x-2"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Menu</span>
          </Button>
          <h1 className="text-3xl font-bold text-gray-800">AI Food Assistant</h1>
          <div></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* API Key Setup */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle className="text-sm flex items-center space-x-2">
                  <Sparkles className="h-4 w-4" />
                  <span>AI Setup</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="apiKey" className="text-xs">Gemini API Key</Label>
                  <Input
                    id="apiKey"
                    type="password"
                    placeholder="Enter your API key"
                    value={apiKey}
                    onChange={(e) => setApiKey(e.target.value)}
                    className="text-xs"
                  />
                  <p className="text-xs text-gray-500">
                    Get your free API key from{' '}
                    <a 
                      href="https://makersuite.google.com/app/apikey" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-orange-600 hover:underline"
                    >
                      Google AI Studio
                    </a>
                  </p>
                </div>

                <div className="space-y-2">
                  <Label className="text-xs">Quick Questions</Label>
                  <div className="space-y-1">
                    {suggestedQuestions.map((question, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="w-full text-xs justify-start h-auto py-2 px-3"
                        onClick={() => setCurrentMessage(question)}
                      >
                        {question}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Interface */}
          <div className="lg:col-span-3">
            <Card className="h-[600px] flex flex-col">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Bot className="h-5 w-5 text-orange-600" />
                  <span>Chat with AI Assistant</span>
                </CardTitle>
                <CardDescription>
                  Get personalized food recommendations based on your preferences
                </CardDescription>
              </CardHeader>
              
              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto space-y-4 p-4">
                {messages.map((message, index) => (
                  <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`flex items-start space-x-2 max-w-[80%] ${message.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        message.role === 'user' ? 'bg-orange-600' : 'bg-gray-200'
                      }`}>
                        {message.role === 'user' ? (
                          <User className="h-4 w-4 text-white" />
                        ) : (
                          <Bot className="h-4 w-4 text-gray-600" />
                        )}
                      </div>
                      <div className={`p-3 rounded-lg ${
                        message.role === 'user' 
                          ? 'bg-orange-600 text-white' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="flex items-start space-x-2">
                      <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                        <Bot className="h-4 w-4 text-gray-600" />
                      </div>
                      <div className="bg-gray-100 p-3 rounded-lg">
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
              
              {/* Input */}
              <div className="p-4 border-t">
                <div className="flex space-x-2">
                  <Textarea
                    placeholder="Ask me about our menu, get recommendations, or ask food-related questions..."
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    className="flex-1 min-h-[40px] max-h-[120px] resize-none"
                    rows={1}
                  />
                  <Button 
                    onClick={handleSendMessage}
                    disabled={isLoading || !currentMessage.trim()}
                    className="bg-orange-600 hover:bg-orange-700"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Card */}
        <Card className="mt-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Sparkles className="h-4 w-4" />
              <span>
                This AI assistant is powered by Google's Gemini AI and can help you discover new dishes, 
                get recommendations based on your preferences, and answer questions about our menu!
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AI;
