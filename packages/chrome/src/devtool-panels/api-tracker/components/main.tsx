import React, { useState } from 'react';
import { Card } from '@/components/atoms/card/card';
import { Typography } from '@/components/atoms/typography/typography';
import { Controls } from './Controls';
import { Filters, type FilterCriteria } from './Filters';
import { Stats } from './Stats';
import { RequestList } from './RequestList';

const Main = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>('all');

  const filteredRequests = [].filter(request => {
    const matchesSearch = request.url.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      filterCriteria === 'all'
        ? true
        : filterCriteria === 'success'
          ? request.status >= 200 && request.status < 300
          : filterCriteria === 'error'
            ? request.status >= 400
            : request.status >= 100 && request.status < 200;

    return matchesSearch && matchesFilter;
  });

  const totalDataTransferred = filteredRequests.reduce((acc, curr) => acc + curr.dataSize, 0);

  const handleAddTrackedApis = () => {
    // Implementation for adding tracked APIs
  };

  const handleClearAll = () => {
    // Implementation for clearing all tracked APIs
  };

  return (
    <Card className="p-4">
      <Typography variant="h4">API Tracker</Typography>

      <Controls onAddTrackedApis={handleAddTrackedApis} onClearAll={handleClearAll} />

      <Filters
        searchQuery={searchQuery}
        filterCriteria={filterCriteria}
        onSearchChange={setSearchQuery}
        onFilterChange={setFilterCriteria}
      />
      <Stats totalRequests={filteredRequests.length} totalDataTransferred={totalDataTransferred} />

      <RequestList requests={filteredRequests} />
    </Card>
  );
};

export { Main };
