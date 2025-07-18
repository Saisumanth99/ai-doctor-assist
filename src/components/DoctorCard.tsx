import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Calendar, MapPin, Clock } from "lucide-react";

interface DoctorCardProps {
  doctor: {
    id: string;
    name: string;
    specialty: string;
    rating: number;
    reviews: number;
    location: string;
    availableSlots: string[];
    experience: string;
    image?: string;
  };
}

export const DoctorCard = ({ doctor }: DoctorCardProps) => {
  return (
    <Card className="w-full bg-gradient-card shadow-card hover:shadow-medical transition-all duration-300 border-border/50 animate-slide-up">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="w-16 h-16 rounded-full bg-gradient-medical flex items-center justify-center text-white font-semibold text-lg shadow-glow">
            {doctor.image ? (
              <img 
                src={doctor.image} 
                alt={doctor.name}
                className="w-full h-full rounded-full object-cover"
              />
            ) : (
              doctor.name.split(' ').map(n => n[0]).join('')
            )}
          </div>
          <div className="flex-1">
            <h3 className="font-semibold text-lg text-foreground">{doctor.name}</h3>
            <Badge variant="secondary" className="mb-2 bg-medical-blue-light text-medical-blue">
              {doctor.specialty}
            </Badge>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <div className="flex items-center gap-1">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{doctor.rating}</span>
                <span>({doctor.reviews} reviews)</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{doctor.experience}</span>
              </div>
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0 space-y-4">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MapPin className="h-4 w-4 text-medical-green" />
          <span>{doctor.location}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium text-foreground">
            <Calendar className="h-4 w-4 text-medical-blue" />
            <span>Available Slots</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {doctor.availableSlots.slice(0, 4).map((slot, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-xs justify-start bg-medical-blue-light/30 border-medical-blue/20 hover:bg-medical-blue-light hover:border-medical-blue transition-all duration-300"
              >
                {slot}
              </Button>
            ))}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="flex-1 hover:bg-accent hover:shadow-medical transition-all duration-300"
          >
            View Profile
          </Button>
          <Button 
            size="sm" 
            className="flex-1 bg-medical-green hover:bg-medical-green/90 shadow-glow transition-all duration-300"
          >
            Book Appointment
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};