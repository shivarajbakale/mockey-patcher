import React from 'react';
import { Card } from '@/components/atoms/card/card';
import { Typography } from '@/components/atoms/typography/typography';

interface Request {
  id: string;
  method: string;
  url: string;
  status: number;
  timestamp: number;
  dataSize: number;
}

interface RequestListProps {
  requests: Request[];
}

export const RequestList: React.FC<RequestListProps> = ({ requests }) => {
  return (
    <div className="mt-6">
      <Typography variant="h6">Requests</Typography>
      <div className="mt-2 space-y-2">
        {requests.map(request => (
          <Card key={request.id} className="p-3">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <Typography className="font-medium">
                  {request.method} {request.url}
                </Typography>
                <Typography variant="small" className="text-muted-foreground">
                  Status: {request.status} • {new Date(request.timestamp).toLocaleTimeString()}
                </Typography>
              </div>
              <Typography variant="small" className="text-muted-foreground">
                {(request.dataSize / 1024).toFixed(2)} KB
              </Typography>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};
