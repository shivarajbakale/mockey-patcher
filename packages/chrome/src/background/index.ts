import '@plasmohq/messaging/background';

import { startHub } from '@plasmohq/messaging/pub-sub';

console.log('Background script loaded');

startHub();

console.log('Message hub started');
