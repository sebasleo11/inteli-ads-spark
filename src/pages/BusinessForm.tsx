import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProgressBar from '@/components/ProgressBar';
import { useCampaign, ToneType } from '@/context/CampaignContext';
import { generateAdContent } from '@/services/api';

type ObjectiveType = 'Ventas de producto' | 'Generar leads';
type LanguageType = 'Español-AR' | 'Inglés' | 'Portugués';

const BusinessForm: React.FC = () => {
  const { formData, setFormData, setAdOptions, setAudienceTip, setIsLoading } = useCampaign();
  const [selectedTones, setSelectedTones] = useState<ToneType[]>(formData.tones || []);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    // Initialize form data if needed
    if (!formData) {
      setFormData({
        objective: '' as ObjectiveType,
        product: '',
        benefit: '',
        audience: '',
        tones: [],
        language: 'Español-AR' as LanguageType,
        budget: 5,
        image: null
      });
    }
  }, [formData, setFormData]);

  const handleToneToggle = (tone: ToneType) => {
    setSelectedTones(prev => {
      if (prev.includes(tone)) {
        return prev.filter(t => t !== tone);
      } else {
        // Limit to max 3 tones
        if (prev.length >= 3) {
          toast({
            title: "Máximo 3 tonalidades",
            description: "Elimina una tonalidad para seleccionar otra",
            variant: "destructive",
          });
          return prev;
        }
        return [...prev, tone];
      }
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Check file type
      if (!['image/jpeg', 'image/png'].includes(file.type)) {
        toast({
          title: "Formato no válido",
          description: "Por favor sube una imagen JPG o PNG",
          variant: "destructive",
        });
        return;
      }
      
      // Check file size (8MB max)
      if (file.size > 8 * 1024 * 1024) {
        toast({
          title: "Imagen demasiado grande",
          description: "El tamaño máximo permitido es 8MB",
          variant: "destructive",
        });
        return;
      }
      
      setFormData({ ...formData, image: file });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Update tones from local state
    const updatedFormData = { ...formData, tones: selectedTones };
    setFormData(updatedFormData);
    
    // Validate form
    if (!updatedFormData.objective || !updatedFormData.product || !updatedFormData.benefit || !updatedFormData.audience) {
      toast({
        title: "Campos incompletos",
        description: "Por favor completa todos los campos obligatorios",
        variant: "destructive",
      });
      return;
    }

    try {
      setIsLoading(true);
      
      // Call API to generate content
      const response = await generateAdContent(updatedFormData);
      
      // Update global state with API response
      setAdOptions({
        copies: response.copies,
        images: response.images
      });
      
      setAudienceTip(response.audienceTip);
      
      // Navigate to selection page
      navigate('/select');
    } catch (error) {
      console.error('Error al generar contenido:', error);
      toast({
        title: "Error al generar tu campaña",
        description: "Por favor inténtalo de nuevo",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (error) {
    return (
      <div className="flex flex-col min-h-screen">
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-xl font-medium mb-2 text-red-600">Error</h2>
            <p className="text-gray-600">{error}</p>
            <Button 
              onClick={() => window.location.reload()} 
              className="mt-4"
            >
              Recargar página
            </Button>
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
        <div className="container mx-auto max-w-2xl">
          <h1 className="text-3xl font-bold mb-4 text-center">Información de tu negocio</h1>
          <p className="text-gray-600 mb-8 text-center">Cuéntanos detalles sobre tu producto o servicio para crear la mejor campaña.</p>
          
          <ProgressBar step={1} totalSteps={4} />
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="objective">Objetivo de la campaña</Label>
              <select
                id="objective"
                value={formData.objective}
                onChange={(e) => setFormData({...formData, objective: e.target.value as ObjectiveType})}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un objetivo</option>
                <option value="Ventas de producto">Ventas de producto</option>
                <option value="Generar leads">Generar leads</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="product">¿Qué vendés?</Label>
              <Textarea 
                id="product"
                placeholder="Describe tu producto o servicio"
                value={formData.product}
                onChange={(e) => setFormData({...formData, product: e.target.value})}
                required
                className="min-h-[80px] resize-none"
                maxLength={200}
              />
              <div className="text-right text-xs text-gray-500">
                {formData.product.length}/200 caracteres
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="benefit">Beneficio principal</Label>
              <Input 
                id="benefit"
                placeholder="Entrega en 24 h / Aprendé sin esfuerzo / etc."
                value={formData.benefit}
                onChange={(e) => setFormData({...formData, benefit: e.target.value})}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="audience">Público objetivo</Label>
              <Textarea 
                id="audience"
                placeholder="Ej.: Mujeres 25-45, fitness, Argentina…"
                value={formData.audience}
                onChange={(e) => setFormData({...formData, audience: e.target.value})}
                required
                className="min-h-[80px] resize-none"
              />
            </div>
            
            <div className="space-y-3">
              <Label htmlFor="tones">Tonalidad deseada (máx. 3)</Label>
              <select
                id="tones"
                multiple
                value={selectedTones}
                onChange={(e) => {
                  const values = Array.from(e.target.selectedOptions).map(o => o.value as ToneType);
                  if (values.length <= 3) {
                    setSelectedTones(values);
                  } else {
                    toast({
                      title: "Máximo 3 tonalidades",
                      description: "Elimina una tonalidad para seleccionar otra",
                      variant: "destructive",
                    });
                  }
                }}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
              >
                <option value="Amigable">Amigable</option>
                <option value="Profesional">Profesional</option>
                <option value="Humorística">Humorística</option>
                <option value="Urgente">Urgente</option>
                <option value="Inspiradora">Inspiradora</option>
              </select>
              <p className="text-xs text-gray-500">Mantén presionado Ctrl (Cmd en Mac) para seleccionar múltiples opciones</p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="language">Idioma</Label>
              <select
                id="language"
                value={formData.language}
                onChange={(e) => setFormData({...formData, language: e.target.value as LanguageType})}
                required
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Selecciona un idioma</option>
                <option value="Español-AR">Español (Argentina)</option>
                <option value="Inglés">Inglés</option>
                <option value="Portugués">Portugués</option>
              </select>
            </div>
            
            <div className="space-y-4">
              <div className="flex justify-between">
                <Label htmlFor="budget">Presupuesto diario</Label>
                <span className="font-semibold">${formData.budget} USD</span>
              </div>
              <Slider
                id="budget"
                value={[formData.budget]}
                min={2}
                max={60}
                step={1}
                onValueChange={(values) => setFormData({...formData, budget: values[0]})}
              />
              <p className="text-xs text-gray-500 italic">
                Meta recomienda ≥ 5 USD/día para pruebas iniciales
              </p>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="image">Imagen del producto (opcional)</Label>
              <Input 
                id="image"
                type="file"
                accept="image/jpeg,image/png"
                onChange={handleFileChange}
                className="cursor-pointer"
              />
              <p className="text-xs text-gray-500">
                Formatos: JPG, PNG. Tamaño máximo: 8 MB
              </p>
            </div>
            
            <Button 
              type="submit" 
              className="w-full py-6 bg-brand-primary hover:bg-brand-primary/90 text-white"
            >
              Generar propuestas
            </Button>
          </form>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default BusinessForm;
