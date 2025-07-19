import { useNavigate } from "react-router-dom";
import { ChatInterface } from "@/components/ChatInterface";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Stethoscope } from "lucide-react";
import { type ChatMessage } from "@/services/chatApi";

const Chat = () => {
  const navigate = useNavigate();

  const handleSuggestAppointment = (chatHistory: ChatMessage[]) => {
    navigate("/doctors", { 
      state: { 
        fromChat: true, 
        chatHistory: chatHistory.map(msg => msg.content) 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-subtle flex flex-col">
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
              <div>
                <h1 className="text-xl font-semibold text-foreground">Medical Consultation</h1>
                <p className="text-sm text-muted-foreground">Chat with AI assistant</p>
              </div>
            </div>
            <Button
              variant="outline"
              onClick={() => handleSuggestAppointment([])}
              className="hover:bg-accent"
            >
              <Stethoscope className="mr-2 h-4 w-4" />
              Suggest Appointment
            </Button>
          </div>
        </div>
      </div>

      {/* Chat Interface */}
      <div className="flex-1 container mx-auto px-4 py-6 flex items-center justify-center">
        <div className="w-full max-w-4xl">
          <ChatInterface onSuggestAppointment={handleSuggestAppointment} />
        </div>
      </div>
    </div>
  );
};

export default Chat;