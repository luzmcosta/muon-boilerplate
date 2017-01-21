/**
 * Renderer
 */

// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

import greet from './greet';

// Logs greeting to console.
greet.do('English', 'World');
