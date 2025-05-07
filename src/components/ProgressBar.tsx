
import React from 'react';

interface ProgressBarProps {
  step: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ step, totalSteps }) => {
  const progress = (step / totalSteps) * 100;

  return (
    <div className="w-full mb-8">
      <div className="flex justify-between mb-2 text-sm">
        <span className="font-medium">Paso {step} de {totalSteps}</span>
        <span className="text-brand-accent font-medium">{Math.round(progress)}%</span>
      </div>
      <div className="h-2 bg-brand-gray rounded-full overflow-hidden">
        <div 
          className="h-full bg-brand-accent transition-all duration-300 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ProgressBar;
