const { copy } = require('fs-extra');
const { join } = require('path');

// Copy the generated service worker into the export folder.
function exportSw(nextConfig) {
  return async function exportPathMap(...args) {
    const [defaultPathMap, params] = args;
    const swDest = (nextConfig.workboxOpts && nextConfig.workboxOpts.swDest) || 'service-worker.js';

    if (!params) {
      return defaultPathMap;
    }
    
    const { dev, distDir, outDir } = params;

    if (!dev) {
      // Copy service worker from Next.js build dir into the export dir.
      await copy(join(distDir, swDest), join(outDir, swDest));
    }

    // Run user's exportPathMap function if available.
    return nextConfig.exportPathMap ? nextConfig.exportPathMap(...args) : defaultPathMap;
  };
}

module.exports = exportSw;
