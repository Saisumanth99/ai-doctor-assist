export interface ChatMessage {
  id: string;
  content: string;
  sender: "user" | "bot";
  timestamp: Date;
  attachments?: string[];
}

export interface ChatResponse {
  message: string;
  suggestions?: string[];
  requiresSpecialist?: boolean;
  urgencyLevel?: 'low' | 'medium' | 'high';
}

export interface FileUploadResponse {
  fileId: string;
  fileName: string;
  analysisResult?: string;
}

// Mock API service - replace with actual API calls
export class ChatApiService {
  private static baseUrl = '/api/chat'; // Replace with actual API URL

  static async sendMessage(
    message: string, 
    chatHistory: ChatMessage[],
    attachments?: File[]
  ): Promise<ChatResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 1000));
    
    // Mock AI response - replace with actual API call
    const responses = [
      "I understand your concern. Based on what you've described, it could be related to several factors. Can you tell me more about when these symptoms started?",
      "Thank you for sharing those details. The symptoms you're experiencing could indicate a few different conditions. I'd recommend consulting with a specialist for a proper diagnosis.",
      "Based on your description, this seems like something that should be evaluated by a healthcare professional. I can help you find the right specialist.",
      "I've analyzed the information you've provided. While I can offer some general guidance, it's important to get a professional medical opinion for accurate diagnosis and treatment.",
      "Your symptoms warrant medical attention. I'd suggest scheduling an appointment with a relevant specialist to discuss your concerns in detail."
    ];

    const mockResponse: ChatResponse = {
      message: responses[Math.floor(Math.random() * responses.length)],
      suggestions: [
        "Can you describe the duration of symptoms?",
        "Have you experienced this before?",
        "Are you taking any medications?",
        "Would you like me to suggest some specialists?"
      ],
      requiresSpecialist: Math.random() > 0.5,
      urgencyLevel: ['low', 'medium', 'high'][Math.floor(Math.random() * 3)] as 'low' | 'medium' | 'high'
    };

    return mockResponse;

    // TODO: Replace with actual API call
    // const formData = new FormData();
    // formData.append('message', message);
    // formData.append('chatHistory', JSON.stringify(chatHistory));
    // if (attachments) {
    //   attachments.forEach(file => formData.append('attachments', file));
    // }
    // 
    // const response = await fetch(`${this.baseUrl}/send`, {
    //   method: 'POST',
    //   body: formData
    // });
    // return response.json();
  }

  static async uploadFile(file: File): Promise<FileUploadResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock file upload response
    const mockResponse: FileUploadResponse = {
      fileId: `file_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      fileName: file.name,
      analysisResult: `I've successfully processed your ${file.type.includes('image') ? 'image' : 'document'}. The file appears to be ${file.type.includes('image') ? 'a medical scan or photo' : 'a medical document'}. I can see the content and will include this in my analysis.`
    };

    return mockResponse;

    // TODO: Replace with actual API call
    // const formData = new FormData();
    // formData.append('file', file);
    // 
    // const response = await fetch(`${this.baseUrl}/upload`, {
    //   method: 'POST',
    //   body: formData
    // });
    // return response.json();
  }

  static async analyzeSymptoms(symptoms: string[], attachments?: string[]): Promise<ChatResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock symptom analysis
    return {
      message: "Based on the symptoms and information you've provided, I recommend consulting with a specialist. Here are some relevant specialists who might be able to help:",
      requiresSpecialist: true,
      urgencyLevel: 'medium'
    };

    // TODO: Replace with actual API call
    // const response = await fetch(`${this.baseUrl}/analyze`, {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ symptoms, attachments })
    // });
    // return response.json();
  }
}