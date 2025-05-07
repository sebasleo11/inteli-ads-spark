
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { useCampaign } from '@/context/CampaignContext';

const AdSelection: React.FC = () => {
  const { 
    adOptions, 
    selectedAd, 
    selectCopy, 
    selectImage, 
    isLoading 
  } = useCampaign();
  
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect to form if no ad options are available
  useEffect(() => {
    if (!isLoading && (!adOptions.copies.length || !adOptions.images.length)) {
      navigate('/create');
    }
  }, [adOptions, isLoading, navigate]);

  const handleContinue = () => {
    if (!selectedAd.copy || !selectedAd.image) {
      toast({
        title: "Selección incompleta",
        description: "Por favor selecciona un copy y una imagen para continuar",
        variant: "destructive",
      });
      return;
    }
    
    navigate('/kit');
  };

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-brand-accent border-t-transparent mb-4"></div>
            <h2 className="text-xl font-medium mb-2">¡Estamos creando tu campaña!</h2>
            <p className="text-gray-600">Esto tomará solo unos momentos...</p>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      <main className="flex-grow py-8 px-4">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl font-bold mb-4 text-center">Elegí tu anuncio</h1>
          <p className="text-gray-600 mb-8 text-center">Selecciona un copy y una imagen para crear tu campaña perfecta.</p>
          
          <ProgressBar step={3} totalSteps={4} />
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Selecciona un copy</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {adOptions.copies.map((copy) => (
                <div 
                  key={copy.id}
                  className={`border rounded-lg p-6 cursor-pointer transition-all hover:shadow-md ${
                    selectedAd.copy?.title === copy.title ? 'border-brand-accent ring-2 ring-brand-accent/50' : 'border-gray-200'
                  }`}
                  onClick={() => selectCopy(copy.id)}
                >
                  <h3 className="font-bold mb-2 text-lg">{copy.title}</h3>
                  <p className="text-gray-700">{copy.description}</p>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4">Selecciona una imagen</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {adOptions.images.map((image) => (
                <div 
                  key={image.id}
                  className={`border rounded-lg p-2 cursor-pointer transition-all hover:shadow-md ${
                    selectedAd.image === image.url ? 'border-brand-accent ring-2 ring-brand-accent/50' : 'border-gray-200'
                  }`}
                  onClick={() => selectImage(image.id)}
                >
                  <img 
                    src={image.url} 
                    alt="Ad creative" 
                    className="w-full h-64 object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center">
            <Button 
              onClick={handleContinue} 
              className="py-6 px-10 bg-brand-primary hover:bg-brand-primary/90 text-white"
            >
              Ver kit de campaña
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdSelection;
