
import { FormData, AudienceTip } from '../context/CampaignContext';

// Simulated API response for demo purposes
export interface ApiResponse {
  copies: { id: string; title: string; description: string }[];
  images: { id: string; url: string }[];
  audienceTip: AudienceTip;
}

// This function simulates API call that would normally go to a backend
export const generateAdContent = async (data: FormData): Promise<ApiResponse> => {
  // In a real app, this would be: return fetch('/api/generar', { method: 'POST', body: ... })
  
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Generate mock responses based on form data
  const mockCopies = [
    {
      id: 'copy-1',
      title: data.objective === 'Ventas de producto' 
        ? `✨ ${data.product} que cambia tu rutina` 
        : `🔍 Descubrí ${data.product} ahora`,
      description: `${data.benefit}. ¡No esperes más para ${data.objective === 'Ventas de producto' ? 'probarlo' : 'contactarnos'}! Hecho para gente como vos.`
    },
    {
      id: 'copy-2',
      title: data.objective === 'Ventas de producto'
        ? `🎯 El ${data.product} que buscabas`
        : `💡 Soluciones en ${data.product}`,
      description: `${data.tones.includes('Urgente') ? '¡ÚLTIMA OPORTUNIDAD! ' : ''}${data.benefit}. Diseñado para ${data.audience.split(',')[0] || 'ti'}.`
    }
  ];

  const mockImages = [
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1080&h=1080&fit=crop'
    },
    {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?q=80&w=1080&h=1080&fit=crop'
    }
  ];

  // Parse audience info to generate targeting suggestions
  const audienceText = data.audience.toLowerCase();
  let ages = '25-45';
  if (audienceText.includes('joven')) ages = '18-30';
  if (audienceText.includes('mayor')) ages = '40-65+';

  const interests = ['Marketing digital'];
  if (audienceText.includes('fitness')) interests.push('Fitness', 'Vida saludable');
  if (audienceText.includes('tecnología') || audienceText.includes('tecnologia')) interests.push('Tecnología', 'Gadgets');
  if (audienceText.includes('viajes')) interests.push('Viajes', 'Turismo');

  const locations = ['Argentina'];
  if (audienceText.includes('argentina')) locations[0] = 'Argentina';
  if (audienceText.includes('méxico') || audienceText.includes('mexico')) locations[0] = 'México';
  if (audienceText.includes('españa') || audienceText.includes('espana')) locations[0] = 'España';

  return {
    copies: mockCopies,
    images: mockImages,
    audienceTip: {
      ages,
      interests,
      locations
    }
  };
};
