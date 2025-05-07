
import React, { createContext, useState, useContext, ReactNode } from 'react';

export type ToneType = 'Amigable' | 'Profesional' | 'Humorística' | 'Urgente' | 'Inspiradora';

export interface FormData {
  objective: 'Ventas de producto' | 'Generar leads' | '';
  product: string;
  benefit: string;
  audience: string;
  tones: ToneType[];
  language: 'Español-AR' | 'Inglés' | 'Portugués';
  budget: number;
  image: File | null;
}

export interface AdOption {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

export interface SelectedAd {
  copy: {
    title: string;
    description: string;
  } | null;
  image: string | null;
}

export interface AudienceTip {
  ages: string;
  interests: string[];
  locations: string[];
}

interface CampaignContextType {
  formData: FormData;
  adOptions: {
    copies: { id: string; title: string; description: string }[];
    images: { id: string; url: string }[];
  };
  selectedAd: SelectedAd;
  audienceTip: AudienceTip | null;
  isLoading: boolean;
  setFormData: (data: FormData) => void;
  setAdOptions: (options: { copies: { id: string; title: string; description: string }[]; images: { id: string; url: string }[] }) => void;
  selectCopy: (id: string) => void;
  selectImage: (id: string) => void;
  setAudienceTip: (tip: AudienceTip) => void;
  setIsLoading: (loading: boolean) => void;
  resetCampaign: () => void;
}

const initialFormData: FormData = {
  objective: '',
  product: '',
  benefit: '',
  audience: '',
  tones: [],
  language: 'Español-AR',
  budget: 5, // Default value
  image: null,
};

const initialAdOptions = {
  copies: [],
  images: [],
};

const initialSelectedAd: SelectedAd = {
  copy: null,
  image: null,
};

const CampaignContext = createContext<CampaignContextType | undefined>(undefined);

export const CampaignProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [adOptions, setAdOptions] = useState(initialAdOptions);
  const [selectedAd, setSelectedAd] = useState<SelectedAd>(initialSelectedAd);
  const [audienceTip, setAudienceTip] = useState<AudienceTip | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const selectCopy = (id: string) => {
    const selectedCopy = adOptions.copies.find(copy => copy.id === id);
    if (selectedCopy) {
      setSelectedAd({
        ...selectedAd,
        copy: { title: selectedCopy.title, description: selectedCopy.description }
      });
    }
  };

  const selectImage = (id: string) => {
    const selectedImage = adOptions.images.find(image => image.id === id);
    if (selectedImage) {
      setSelectedAd({
        ...selectedAd,
        image: selectedImage.url
      });
    }
  };

  const resetCampaign = () => {
    setFormData(initialFormData);
    setAdOptions(initialAdOptions);
    setSelectedAd(initialSelectedAd);
    setAudienceTip(null);
  };

  return (
    <CampaignContext.Provider
      value={{
        formData,
        adOptions,
        selectedAd,
        audienceTip,
        isLoading,
        setFormData,
        setAdOptions,
        selectCopy,
        selectImage,
        setAudienceTip,
        setIsLoading,
        resetCampaign
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = (): CampaignContextType => {
  const context = useContext(CampaignContext);
  if (context === undefined) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};
