
import React from 'react';

const Logo: React.FC = () => {
  return (
    <div className="flex items-center">
      <span className="font-bold text-xl text-brand-primary">Inteli<span className="text-brand-accent">GENTE</span> </span>
      <span className="ml-1 bg-brand-accent text-white text-xs px-2 py-0.5 rounded-md font-medium">Ads Lite</span>
    </div>
  );
};

export default Logo;
