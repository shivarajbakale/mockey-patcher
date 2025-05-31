import React from 'react';
import { sendToBackground } from '@plasmohq/messaging';

import { Button } from './components/atoms/button/button';
import './style.css';

function IndexPopup() {
  const handleClick = async () => {
    console.log('clicked');
    try {
      const res = await sendToBackground({
        name: 'ping',
        body: {
          message: 'ping',
        },
      });
      console.log('Response:', res);
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <div className="w-[600px] h-[600px]" style={{ overflow: 'hidden', scrollbarWidth: 'none' }}>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}

export default IndexPopup;
