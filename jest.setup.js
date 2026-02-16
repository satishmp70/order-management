import 'whatwg-fetch'
import '@testing-library/jest-dom'

// Next.js patches globa ls. In JSDOM, we need TextEncoder/Decoder for Next.js streams
import { TextEncoder, TextDecoder } from 'util';

Object.assign(global, { TextDecoder, TextEncoder });
