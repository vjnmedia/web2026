import axios from 'axios';

interface ApplicationData {
  jobId: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  education: string;
  experience: string;
  coverLetter: string;
  language: string;
  resume: File;
}

export const submitApplication = async (data: ApplicationData) => {
  const formData = new FormData();
  
  // Append all text fields
  Object.entries(data).forEach(([key, value]) => {
    if (key !== 'resume') {
      formData.append(key, value);
    }
  });
  
  // Append the resume file
  formData.append('resume', data.resume);

  try {
    const response = await axios.post('/api/careers/apply', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error submitting application:', error);
    throw error;
  }
}; 