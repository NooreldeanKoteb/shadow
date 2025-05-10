/* eslint-disable @typescript-eslint/no-var-requires */
// jest.polyfill.mjs

import { MessagePort, MessageChannel } from 'worker_threads';
import { TextEncoder, TextDecoder } from 'util';
import { ReadableStream, WritableStream } from 'web-streams-polyfill/dist/ponyfill.js';
import { fetch, Request, Response, Headers } from 'undici';
import nodeFetch from 'node-fetch';

// Polyfill MessagePort and MessageChannel for undici
global.MessagePort = MessagePort;
global.MessageChannel = MessageChannel;

// Polyfill TextEncoder/TextDecoder
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Polyfill ReadableStream/WritableStream
global.ReadableStream = ReadableStream;
global.WritableStream = WritableStream;

// Now require undici and assign fetch, Request, Response, Headers
global.fetch = fetch;
global.Request = Request;
global.Response = Response;
global.Headers = Headers;

// Polyfill fetch for Node.js (used by Upstash Redis)
if (typeof global.fetch === 'undefined') {
  global.fetch = nodeFetch;
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