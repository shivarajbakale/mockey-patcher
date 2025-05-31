import React from 'react';
import { Button } from './components/atoms/button/button';
import './style.css';

function IndexPopup() {
  const handleClick = () => {
    chrome.tabs.create({
      url: 'chrome-extension://jipbdbmgmgjlkaafnigpeefhglfmdgnd/tabs/tab-index.html',
    });
  };
  return (
    <div className="w-[600px] h-[600px]" style={{ overflow: 'hidden', scrollbarWidth: 'none' }}>
      <Button onClick={handleClick}>Click me</Button>
    </div>
  );
}

export default IndexPopup;
