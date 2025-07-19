import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Paperclip, Send, Bot, User, Loader2 } from "lucide-react";
import { ChatApiService, type ChatMessage } from "@/services/chatApi";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

interface ChatInterfaceProps {
  onSuggestAppointment?: (chatHistory: ChatMessage[]) => void;
}

export const ChatInterface = ({ onSuggestAppointment }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      content: "Hello! I'm your AI medical assistant. I can help analyze your symptoms, review medical documents, and connect you with the right specialists. How can I assist you today?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      content: inputValue,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const response = await ChatApiService.sendMessage(inputValue, messages);
      
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        content: response.message,
        sender: "bot",
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error('Failed to send message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsTyping(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setIsUploading(true);
    
    try {
      for (const file of Array.from(files)) {
        const uploadResponse = await ChatApiService.uploadFile(file);
        
        // Add user message showing the uploaded file
        const fileMessage: ChatMessage = {
          id: Date.now().toString(),
          content: `📎 Uploaded: ${file.name}`,
          sender: "user",
          timestamp: new Date(),
          attachments: [uploadResponse.fileId]
        };
        
        setMessages((prev) => [...prev, fileMessage]);
        
        // Add bot response with analysis
        if (uploadResponse.analysisResult) {
          const analysisMessage: ChatMessage = {
            id: (Date.now() + 1).toString(),
            content: uploadResponse.analysisResult,
            sender: "bot",
            timestamp: new Date(),
          };
          
          setMessages((prev) => [...prev, analysisMessage]);
        }
      }
      
      toast.success('Files uploaded successfully');
    } catch (error) {
      console.error('Failed to upload files:', error);
      toast.error('Failed to upload files. Please try again.');
    } finally {
      setIsUploading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  return (
    <Card className="h-[600px] w-full max-w-4xl mx-auto bg-gradient-card shadow-medical border-0">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-4 border-b bg-gradient-medical text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-full">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">MedicalGPT Assistant</h3>
                <p className="text-white/80 text-sm">AI-powered medical consultation</p>
              </div>
            </div>
            {onSuggestAppointment && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onSuggestAppointment(messages)}
                className="bg-white/20 hover:bg-white/30 text-white border-white/30"
              >
                Suggest Appointment
              </Button>
            )}
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
                  {message.attachments && (
                    <div className="mt-2 flex gap-2">
                      {message.attachments.map((attachment, index) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          📎 {attachment}
                        </Badge>
                      ))}
                    </div>
                  )}
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
            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*,.pdf,.doc,.docx,.txt"
              onChange={handleFileUpload}
              className="hidden"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => fileInputRef.current?.click()}
              disabled={isUploading}
              className="hover:bg-accent"
            >
              {isUploading ? (
                <Loader2 className="h-5 w-5 animate-spin" />
              ) : (
                <Paperclip className="h-5 w-5" />
              )}
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
        </div>
      </div>
    </Card>
  );
};