import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Stethoscope, FileSearch, Calendar, Shield, Clock } from "lucide-react";
import { DoctorsApiService, type Doctor } from "@/services/doctorsApi";
import heroImage from "@/assets/medical-hero.jpg";

const Index = () => {
  const navigate = useNavigate();

  const features = [
    {
      icon: Bot,
      title: "AI-Powered Analysis",
      description: "Advanced AI analyzes your symptoms and medical documents for accurate insights."
    },
    {
      icon: FileSearch,
      title: "Document Review",
      description: "Upload lab results, prescriptions, and medical reports for comprehensive analysis."
    },
    {
      icon: Stethoscope,
      title: "Specialist Matching",
      description: "Get matched with the right specialists based on your specific medical needs."
    },
    {
      icon: Calendar,
      title: "Easy Scheduling",
      description: "Book appointments with recommended doctors with real-time availability."
    },
    {
      icon: Shield,
      title: "Privacy Secure",
      description: "Your medical information is encrypted and protected with healthcare-grade security."
    },
    {
      icon: Clock,
      title: "24/7 Available",
      description: "Access medical guidance and support anytime, anywhere you need it."
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-subtle">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="relative container mx-auto px-4 py-16 lg:py-24">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge 
                variant="secondary" 
                className="bg-medical-blue-light text-medical-blue px-4 py-2 text-sm font-medium animate-fade-in"
              >
                🏥 AI-Powered Medical Assistant
              </Badge>
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold bg-gradient-medical bg-clip-text text-transparent animate-slide-up">
                MedicalGPT
              </h1>
              <p className="text-xl lg:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed animate-fade-in">
                Your intelligent medical companion for symptom analysis, document review, and connecting with the right healthcare professionals.
              </p>
            </div>
            <div className="flex justify-center animate-slide-up">
              <Button 
                size="lg" 
                className="bg-primary hover:bg-primary-glow shadow-glow text-lg px-8 py-3 transition-all duration-300 animate-pulse-glow"
                onClick={() => navigate("/chat")}
              >
                <Bot className="mr-2 h-5 w-5" />
                Start Consultation
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-background/50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Why Choose MedicalGPT?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced AI technology meets personalized healthcare guidance
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                className="bg-gradient-card shadow-card hover:shadow-medical transition-all duration-300 border-border/50 animate-fade-in"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader className="text-center pb-3">
                  <div className="mx-auto w-12 h-12 rounded-full bg-gradient-medical flex items-center justify-center text-white shadow-glow mb-3">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground text-center text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Main Interface */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <h3 className="text-2xl font-semibold text-foreground mb-4">
              Ready to get started?
            </h3>
            <p className="text-muted-foreground max-w-2xl mx-auto mb-8">
              Click the button above to start your medical consultation, upload documents, and get connected with the right specialists.
            </p>
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate("/doctors")}
              className="hover:bg-accent hover:shadow-medical transition-all duration-300 text-lg px-8 py-3"
            >
              <Stethoscope className="mr-2 h-5 w-5" />
              Browse All Doctors
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-muted-foreground">
            © 2024 MedicalGPT. Professional medical guidance at your fingertips.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            This AI assistant provides informational guidance only and does not replace professional medical advice.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
