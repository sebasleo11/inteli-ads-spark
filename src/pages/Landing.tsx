
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCampaign } from '@/context/CampaignContext';

const Landing: React.FC = () => {
  const { resetCampaign } = useCampaign();

  React.useEffect(() => {
    // Reset campaign data when landing on the home page
    resetCampaign();
  }, [resetCampaign]);

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-16 md:py-24 px-4 bg-gradient-to-br from-white to-brand-gray">
        <div className="container mx-auto text-center max-w-3xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            ¡Crea tu primera campaña en <span className="gradient-text">2 minutos</span>!
          </h1>
          <p className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Deja que nuestra IA cree anuncios optimizados para Facebook e Instagram 
            sin necesidad de un diseñador o redactor profesional.
          </p>
          <Link to="/create">
            <Button className="text-lg py-6 px-8 bg-brand-accent hover:bg-brand-accent/90 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all">
              Crear mi campaña
            </Button>
          </Link>
        </div>
      </section>

      {/* Why Different Section */}
      <section className="py-16 px-4 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">¿Por qué es distinto?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-brand-gray rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Sencillez</h3>
              <p className="text-gray-700">
                Sin complejidades técnicas. Un formulario, dos minutos y ya tenés tu campaña lista para implementar.
              </p>
            </div>

            <div className="bg-brand-gray rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">🧠</div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">IA avanzada</h3>
              <p className="text-gray-700">
                Nuestra inteligencia artificial crea copys y creatividades optimizadas para tu audiencia específica.
              </p>
            </div>

            <div className="bg-brand-gray rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-3 text-brand-primary">Resultados reales</h3>
              <p className="text-gray-700">
                Te entregamos un kit con todos los elementos para una campaña efectiva y sugerencias de segmentación.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 px-4 bg-brand-gray">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-12">Preguntas frecuentes</h2>
          
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger className="text-left font-medium">
                ¿Tengo que crear una cuenta para usar InteliGENTE Ads?
              </AccordionTrigger>
              <AccordionContent>
                No, la versión demo te permite crear una campaña de forma anónima. En el futuro, el registro te dará acceso a más herramientas y funcionalidades.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger className="text-left font-medium">
                ¿Cómo subo mi campaña a Facebook e Instagram?
              </AccordionTrigger>
              <AccordionContent>
                Te proporcionamos instrucciones paso a paso para subir tu campaña al Administrador de Anuncios de Meta. Solo necesitas copiar el texto, descargar las imágenes y seguir nuestra guía.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger className="text-left font-medium">
                ¿Cuánto presupuesto necesito para empezar?
              </AccordionTrigger>
              <AccordionContent>
                Meta recomienda un mínimo de 5 USD diarios para pruebas iniciales, pero puedes empezar con tan solo 2 USD. A mayor presupuesto, mayor alcance potencial.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger className="text-left font-medium">
                ¿InteliGENTE Ads está afiliado con Meta o Facebook?
              </AccordionTrigger>
              <AccordionContent>
                No, InteliGENTE Ads es un servicio independiente que te ayuda a crear contenido para tus campañas. No estamos afiliados con Meta Platforms, Inc. ni ninguna de sus marcas.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Landing;
