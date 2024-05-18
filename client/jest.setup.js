document.documentElement.innerHTML = '<head></head><body></body>';
import { TextEncoder, TextDecoder } from 'util';
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
if (document.body === null) {
    const html = '<body></body>';
    document.open();
    document.write(html);
    document.close();
  }
  global.MutationObserver = class {
    constructor(callback) {}
    disconnect() {}
    observe(element, initObject) {}
  };
  