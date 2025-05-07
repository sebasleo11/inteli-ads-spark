
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { useCampaign } from '@/context/CampaignContext';

const CampaignKit: React.FC = () => {
  const { selectedAd, audienceTip, formData } = useCampaign();
  const [copyText, setCopyText] = useState<string>('');
  const [isCopied, setIsCopied] = useState(false);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Redirect if no ad has been selected
  useEffect(() => {
    if (!selectedAd.copy || !selectedAd.image) {
      navigate('/select');
    }
  }, [selectedAd, navigate]);

  useEffect(() => {
    if (selectedAd.copy) {
      setCopyText(`${selectedAd.copy.title}

${selectedAd.copy.description}`);
    }
  }, [selectedAd]);

  const handleCopyText = () => {
    if (!copyText) return;

    navigator.clipboard.writeText(copyText).then(
      () => {
        setIsCopied(true);
        toast({
          title: "Texto copiado",
          description: "El texto fue copiado al portapapeles",
        });
        setTimeout(() => setIsCopied(false), 2000);
      },
      (err) => {
        console.error('Error al copiar texto:', err);
        toast({
          title: "Error al copiar texto",
          description: "Intenta nuevamente",
          variant: "destructive",
        });
      }
    );
  };

  const handleCreateNew = () => {
    navigate('/');
  };

  if (!selectedAd.copy || !selectedAd.image || !audienceTip) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-4 border-brand-accent border-t-transparent mb-4"></div>
            <h2 className="text-xl font-medium mb-2">Cargando tu kit de campaña</h2>
            <p className="text-gray-600">Por favor espera un momento...</p>
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
          <h1 className="text-3xl font-bold mb-4 text-center">¡Tu kit de campaña está listo!</h1>
          <p className="text-gray-600 mb-8 text-center">Todo lo que necesitás para lanzar tu campaña en Facebook e Instagram.</p>
          
          <ProgressBar step={4} totalSteps={4} />
          
          <div className="grid md:grid-cols-2 gap-8 mb-10">
            {/* Ad Preview */}
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Así se verá tu anuncio</h2>
                
                <div className="bg-white rounded-lg border shadow-sm">
                  <div className="p-3 border-b">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white font-bold">
                        {formData.product.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <p className="font-semibold">{formData.product}</p>
                        <p className="text-xs text-gray-500">Publicado • Patrocinado</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <img 
                      src={selectedAd.image} 
                      alt="Ad preview" 
                      className="w-full aspect-square object-cover"
                    />
                  </div>
                  
                  <div className="p-4">
                    <p className="font-semibold mb-2">{selectedAd.copy.title}</p>
                    <p className="text-sm text-gray-700 mb-4">{selectedAd.copy.description}</p>
                    <button className="bg-brand-primary text-white text-sm font-medium py-1.5 px-3 rounded-md">
                      {formData.objective === 'Ventas de producto' ? 'Comprar ahora' : 'Más información'}
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <Button 
                  className="w-full bg-brand-primary hover:bg-brand-primary/90"
                  onClick={handleCopyText}
                >
                  {isCopied ? '✓ Texto copiado' : 'Copiar texto'}
                </Button>
                
                <a 
                  href={selectedAd.image} 
                  download="facebook-ad-image.jpg"
                  className="block w-full"
                >
                  <Button className="w-full bg-brand-accent hover:bg-brand-accent/90">
                    Descargar imagen
                  </Button>
                </a>
                
                <Button 
                  variant="outline" 
                  className="w-full border-brand-primary text-brand-primary hover:bg-brand-gray"
                  onClick={handleCreateNew}
                >
                  Crear nueva campaña
                </Button>
              </div>
            </div>
            
            {/* Audience & Instructions */}
            <div className="space-y-6">
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Segmentación sugerida</h2>
                <div className="space-y-4">
                  <div>
                    <p className="font-medium text-gray-700">Edades:</p>
                    <p>{audienceTip.ages} años</p>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700">Intereses:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {audienceTip.interests.map((interest, index) => (
                        <span key={index} className="bg-brand-gray text-sm px-3 py-1 rounded-full">
                          {interest}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700">Ubicación:</p>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {audienceTip.locations.map((location, index) => (
                        <span key={index} className="bg-brand-gray text-sm px-3 py-1 rounded-full">
                          {location}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <p className="font-medium text-gray-700">Presupuesto diario:</p>
                    <p>${formData.budget} USD</p>
                  </div>
                </div>
              </div>
              
              <div className="border rounded-lg p-4">
                <h2 className="text-xl font-semibold mb-4">Cómo publicar tu anuncio</h2>
                <ol className="list-decimal pl-5 space-y-2">
                  <li>Ingresa al Administrador de Anuncios de Meta (Business Suite).</li>
                  <li>Crea una nueva campaña con el objetivo "{formData.objective === 'Ventas de producto' ? 'Conversiones' : 'Generación de clientes potenciales'}".</li>
                  <li>Configura la audiencia según las recomendaciones anteriores.</li>
                  <li>En la sección de creatividades, sube la imagen descargada.</li>
                  <li>Copia y pega el texto del anuncio en los campos correspondientes.</li>
                </ol>
                
                <div className="mt-6 bg-yellow-50 border border-yellow-200 p-3 rounded-md">
                  <p className="text-sm text-yellow-800">
                    <span className="font-medium">Importante:</span> Los resultados dependen de la calidad de tu negocio y tu presupuesto. Te recomendamos comenzar con pruebas y optimizar según los resultados.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default CampaignKit;
