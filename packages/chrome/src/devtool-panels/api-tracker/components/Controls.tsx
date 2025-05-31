import React from 'react';
import { Button } from '@/components/atoms/button/button';

interface ControlsProps {
  onAddTrackedApis: () => void;
  onClearAll: () => void;
}

export const Controls: React.FC<ControlsProps> = ({ onAddTrackedApis, onClearAll }) => {
  return (
    <div className="flex gap-2 mt-4">
      <Button size="sm" onClick={onAddTrackedApis}>
        Add Tracked APIs
      </Button>
      <Button variant="outline" size="sm" onClick={onClearAll}>
        Clear All
      </Button>
    </div>
  );
};
