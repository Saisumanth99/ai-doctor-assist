import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DoctorCard } from "@/components/DoctorCard";
import { ArrowLeft, Bot, Sparkles } from "lucide-react";

const Doctors = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { fromChat, chatHistory } = location.state || {};

  const sampleDoctors = [
    {
      id: "1",
      name: "Dr. Sarah Johnson",
      specialty: "Cardiologist",
      rating: 4.9,
      reviews: 127,
      location: "Manhattan Medical Center",
      availableSlots: ["Today 2:00 PM", "Today 4:30 PM", "Tomorrow 10:00 AM", "Tomorrow 2:00 PM"],
      experience: "15+ years",
    },
    {
      id: "2", 
      name: "Dr. Michael Chen",
      specialty: "Dermatologist",
      rating: 4.8,
      reviews: 89,
      location: "Downtown Skin Clinic",
      availableSlots: ["Today 3:00 PM", "Tomorrow 9:00 AM", "Tomorrow 1:00 PM", "Wed 11:00 AM"],
      experience: "12+ years",
    },
    {
      id: "3",
      name: "Dr. Emily Rodriguez",
      specialty: "General Practitioner", 
      rating: 4.9,
      reviews: 156,
      location: "Central Health Clinic",
      availableSlots: ["Today 1:00 PM", "Today 5:00 PM", "Tomorrow 8:00 AM", "Tomorrow 3:00 PM"],
      experience: "18+ years",
    },
  ];

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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {sampleDoctors.map((doctor, index) => (
            <div 
              key={doctor.id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <DoctorCard doctor={doctor} />
            </div>
          ))}
        </div>

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