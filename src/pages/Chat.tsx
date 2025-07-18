import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Send, Upload, FileText, Image, Bot, User, ArrowLeft, Calendar, Stethoscope } from "lucide-react";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  attachments?: string[];
}

const Chat = () => {
  const navigate = useNavigate();
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
        content: "Thank you for your question. Based on the information you've provided, I recommend consulting with a specialist. You can use the appointment suggestion feature to find suitable doctors based on our conversation.",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 2000);
  };

  const handleFileUpload = () => {
    // Simulate file upload
    const fileMessage: Message = {
      id: Date.now().toString(),
      content: "I've uploaded a medical document for analysis.",
      sender: "user",
      timestamp: new Date(),
      attachments: ["document.pdf"],
    };
    setMessages(prev => [...prev, fileMessage]);

    // Simulate AI analysis response
    setTimeout(() => {
      const analysisResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: "I've analyzed your uploaded document. Based on the results, I recommend scheduling a consultation with a specialist. Would you like me to suggest available doctors?",
        sender: "bot",
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, analysisResponse]);
    }, 3000);
  };

  const handleSuggestAppointment = () => {
    // Analyze chat history and suggest doctors
    navigate("/doctors", { state: { fromChat: true, chatHistory: messages } });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/")}
                className="hover:bg-accent"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-gradient-medical rounded-full">
                  <Bot className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-foreground">MedicalGPT</h1>
                  <p className="text-sm text-muted-foreground">AI Medical Consultation</p>
                </div>
              </div>
            </div>
            <Button
              onClick={handleSuggestAppointment}
              className="bg-medical-green hover:bg-medical-green/90 text-white shadow-glow"
            >
              <Calendar className="h-4 w-4 mr-2" />
              Suggest Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="container mx-auto px-4 py-6">
        <Card className="h-[calc(100vh-200px)] bg-gradient-card shadow-medical border-0">
          <div className="flex flex-col h-full">
            {/* Messages */}
            <ScrollArea className="flex-1 p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex gap-4 animate-fade-in",
                      message.sender === "user" ? "flex-row-reverse" : "flex-row"
                    )}
                  >
                    <div className={cn(
                      "p-2 rounded-full w-10 h-10 flex items-center justify-center text-white",
                      message.sender === "user" 
                        ? "bg-medical-blue" 
                        : "bg-medical-green"
                    )}>
                      {message.sender === "user" ? <User className="h-5 w-5" /> : <Bot className="h-5 w-5" />}
                    </div>
                    <div className={cn(
                      "max-w-[70%] space-y-2",
                      message.sender === "user" ? "ml-16" : "mr-16"
                    )}>
                      <div className={cn(
                        "p-4 rounded-lg shadow-card",
                        message.sender === "user"
                          ? "bg-primary text-primary-foreground"
                          : "bg-card text-card-foreground"
                      )}>
                        <p className="leading-relaxed">{message.content}</p>
                        {message.attachments && (
                          <div className="mt-2 flex gap-2">
                            {message.attachments.map((attachment, index) => (
                              <Badge key={index} variant="secondary" className="text-xs">
                                <FileText className="h-3 w-3 mr-1" />
                                {attachment}
                              </Badge>
                            ))}
                          </div>
                        )}
                        <span className="text-xs opacity-70 mt-2 block">
                          {message.timestamp.toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex gap-4 animate-fade-in">
                    <div className="p-2 rounded-full w-10 h-10 flex items-center justify-center bg-medical-green text-white">
                      <Bot className="h-5 w-5" />
                    </div>
                    <div className="bg-card text-card-foreground p-4 rounded-lg shadow-card mr-16">
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
            <div className="p-6 border-t bg-muted/30">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={handleFileUpload}
                  className="shrink-0 hover:bg-accent hover:shadow-medical transition-all duration-300"
                >
                  <Upload className="h-5 w-5" />
                </Button>
                <div className="flex-1 relative">
                  <Input
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Describe your symptoms, upload documents, or ask medical questions..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    className="pr-14 h-12 bg-background shadow-card border-border focus:shadow-medical transition-all duration-300 text-base"
                  />
                  <Button
                    size="icon"
                    onClick={handleSendMessage}
                    disabled={!inputValue.trim()}
                    className="absolute right-2 top-2 h-8 w-8 bg-primary hover:bg-primary-glow shadow-glow transition-all duration-300"
                  >
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="flex gap-3 mt-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleFileUpload}
                  className="text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <FileText className="h-4 w-4 mr-2" />
                  Upload Document
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={handleFileUpload}
                  className="text-sm text-muted-foreground hover:text-foreground hover:bg-accent"
                >
                  <Image className="h-4 w-4 mr-2" />
                  Upload Image
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Chat;