import React from 'react';
import { Typography } from '@/components/atoms/typography/typography';

interface StatsProps {
  totalRequests: number;
  totalDataTransferred: number;
}

export const Stats: React.FC<StatsProps> = ({ totalRequests, totalDataTransferred }) => {
  return (
    <div className="mt-6">
      <Typography variant="h6">Statistics</Typography>
      <div className="flex flex-col gap-2 mt-2">
        <div className="flex gap-2 items-center justify-between">
          <Typography>Total Filtered Requests</Typography>
          <span>{totalRequests}</span>
        </div>
        <div className="flex gap-2 items-center justify-between">
          <Typography>Data Transferred</Typography>
          <span>{(totalDataTransferred / 1024).toFixed(2)} KB</span>
        </div>
      </div>
    </div>
  );
};
