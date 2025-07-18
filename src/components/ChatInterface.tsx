import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Upload, FileText, Image, Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  attachments?: string[];
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "Hello! I'm MedicalGPT, your AI-powered medical assistant. I can help analyze your symptoms, review medical documents or images, and recommend appropriate specialists. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thank you for your question. Based on the information you've provided, I recommend consulting with a specialist. Let me suggest some doctors and available appointments for you.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = () => {
    // Placeholder for file upload functionality
    console.log("File upload clicked");
  };

  return (
    <Card className="h-[600px] w-full max-w-4xl mx-auto bg-gradient-card shadow-medical border-0">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-medical text-white rounded-t-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-full">
              <Bot className="h-6 w-6" />
            </div>
            <div>
              <h3 className="font-semibold text-lg">MedicalGPT Assistant</h3>
              <p className="text-white/80 text-sm">AI-powered medical consultation</p>
            </div>
          </div>
        </div>

        {/* Messages */}
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex gap-3 animate-fade-in",
                  message.sender === "user" ? "flex-row-reverse" : "flex-row"
                )}
              >
                <div className={cn(
                  "p-2 rounded-full w-8 h-8 flex items-center justify-center text-white text-sm",
                  message.sender === "user" 
                    ? "bg-medical-blue" 
                    : "bg-medical-green"
                )}>
                  {message.sender === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                </div>
                <div className={cn(
                  "max-w-[70%] p-3 rounded-lg shadow-card",
                  message.sender === "user"
                    ? "bg-primary text-primary-foreground ml-12"
                    : "bg-card text-card-foreground mr-12"
                )}>
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {message.timestamp.toLocaleTimeString([], { 
                      hour: '2-digit', 
                      minute: '2-digit' 
                    })}
                  </span>
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex gap-3 animate-fade-in">
                <div className="p-2 rounded-full w-8 h-8 flex items-center justify-center bg-medical-green text-white">
                  <Bot className="h-4 w-4" />
                </div>
                <div className="bg-card text-card-foreground p-3 rounded-lg shadow-card mr-12">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-medical-gray rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-medical-gray rounded-full animate-bounce [animation-delay:0.1s]"></div>
                    <div className="w-2 h-2 bg-medical-gray rounded-full animate-bounce [animation-delay:0.2s]"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>

        {/* Input */}
        <div className="p-4 border-t bg-muted/30">
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="icon"
              onClick={handleFileUpload}
              className="shrink-0 hover:bg-accent hover:shadow-medical transition-all duration-300"
            >
              <Upload className="h-4 w-4" />
            </Button>
            <div className="flex-1 relative">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Describe your symptoms or ask a medical question..."
                onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                className="pr-12 bg-background shadow-card border-border focus:shadow-medical transition-all duration-300"
              />
              <Button
                size="icon"
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="absolute right-1 top-1 h-8 w-8 bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="flex gap-2 mt-2">
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              <FileText className="h-3 w-3 mr-1" />
              Upload Document
            </Button>
            <Button variant="ghost" size="sm" className="text-xs text-muted-foreground hover:text-foreground">
              <Image className="h-3 w-3 mr-1" />
              Upload Image
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};