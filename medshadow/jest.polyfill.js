/* eslint-disable @typescript-eslint/no-var-requires */
// jest.polyfill.js

// Polyfill MessagePort and MessageChannel for undici
try {
  const { MessagePort, MessageChannel } = require('worker_threads');
  global.MessagePort = MessagePort;
  global.MessageChannel = MessageChannel;
} catch (e) {
  // worker_threads may not be available in all environments, but is in Node 12+
}

// Polyfill TextEncoder/TextDecoder
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill ReadableStream/WritableStream
const { ReadableStream, WritableStream } = require('web-streams-polyfill/dist/ponyfill.js');
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;

// Now require undici and assign fetch, Request, Response, Headers
const { fetch, Request, Response, Headers } = require('undici');
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

// Polyfill fetch for Node.js (used by Upstash Redis)
if (typeof global.fetch === 'undefined') {
  global.fetch = require('node-fetch');
}

// Polyfill Request/Response/Headers for Next.js API route tests
if (typeof global.Request === 'undefined') {
  global.Request = class {};
}
if (typeof global.Response === 'undefined') {
  global.Response = class {};
}
if (typeof global.Headers === 'undefined') {
  global.Headers = class {};
} 