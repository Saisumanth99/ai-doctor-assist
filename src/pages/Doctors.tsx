import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DoctorCard } from "@/components/DoctorCard";
import { ArrowLeft, Bot, Sparkles, Loader2 } from "lucide-react";
import { DoctorsApiService, type Doctor } from "@/services/doctorsApi";

const Doctors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromChat, chatHistory } = location.state || {};
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDoctors = async () => {
      setLoading(true);
      try {
        const response = fromChat && chatHistory 
          ? await DoctorsApiService.getRecommendedDoctors(chatHistory)
          : await DoctorsApiService.getAllDoctors();
        setDoctors(response.doctors);
      } catch (error) {
        console.error('Failed to load doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDoctors();
  }, [fromChat, chatHistory]);

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Header */}
      <div className="bg-card border-b shadow-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(fromChat ? "/chat" : "/")}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-xl font-semibold text-foreground">Recommended Specialists</h1>
              <p className="text-sm text-muted-foreground">
                {fromChat ? "Based on your consultation history" : "Available doctors for appointments"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        {fromChat && (
          <div className="mb-8 p-4 bg-gradient-card rounded-lg border shadow-card">
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-gradient-medical rounded-full">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <Badge variant="secondary" className="bg-medical-blue-light text-medical-blue">
                <Sparkles className="h-3 w-3 mr-1" />
                AI Analysis
              </Badge>
            </div>
            <p className="text-foreground font-medium mb-2">
              Based on your consultation, I recommend these specialists:
            </p>
            <p className="text-muted-foreground text-sm">
              The AI has analyzed your symptoms and conversation history to suggest the most suitable doctors for your condition. 
              All recommended specialists have immediate availability.
            </p>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center items-center py-16">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <span className="ml-2 text-muted-foreground">Loading doctors...</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {doctors.map((doctor, index) => (
              <div 
                key={doctor.id}
                className="animate-fade-in"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <DoctorCard doctor={doctor} />
              </div>
            ))}
          </div>
        )}

        {fromChat && (
          <div className="mt-8 text-center">
            <Button
              variant="outline"
              onClick={() => navigate("/chat")}
              className="hover:bg-accent"
            >
              Continue Consultation
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctors;