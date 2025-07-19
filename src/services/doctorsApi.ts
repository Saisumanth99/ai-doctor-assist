export interface Doctor {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  availableSlots: string[];
  experience: string;
  image?: string;
}

export interface DoctorsResponse {
  doctors: Doctor[];
  total: number;
}

// Mock API service - replace with actual API calls
export class DoctorsApiService {
  private static baseUrl = '/api/doctors'; // Replace with actual API URL

  static async getAllDoctors(): Promise<DoctorsResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Mock data - replace with actual API call
    const mockDoctors: Doctor[] = [
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

    return {
      doctors: mockDoctors,
      total: mockDoctors.length
    };

    // TODO: Replace with actual API call
    // const response = await fetch(`${this.baseUrl}`);
    // return response.json();
  }

  static async getRecommendedDoctors(chatHistory: string[]): Promise<DoctorsResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Mock AI analysis of chat history
    // TODO: Replace with actual API call that analyzes chat history
    const allDoctors = await this.getAllDoctors();
    
    // Mock recommendation logic - replace with actual AI analysis
    return {
      doctors: allDoctors.doctors.slice(0, 3), // Return first 3 as recommendations
      total: 3
    };

    // TODO: Replace with actual API call
    // const response = await fetch(`${this.baseUrl}/recommendations`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ chatHistory })
    // });
    // return response.json();
  }

  static async getDoctorById(id: string): Promise<Doctor | null> {
    const response = await this.getAllDoctors();
    return response.doctors.find(doctor => doctor.id === id) || null;
  }
}