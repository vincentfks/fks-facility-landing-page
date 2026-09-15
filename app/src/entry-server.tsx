import { StrictMode } from 'react';
import { renderToPipeableStream } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom/server';
import { Writable } from 'node:stream';
import App from './App';

export { getSeoForPath, getPrerenderPaths, NOT_FOUND_PATH } from './seo/routes';
export { renderHeadTags } from './seo/head';

const RENDER_TIMEOUT_MS = 20000;

/** Rend une route en HTML complet, après résolution de tous les composants lazy */
export function render(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    let html = '';

    // Déclaré avant le rendu : les erreurs de shell peuvent être signalées de façon synchrone
    const timeout = setTimeout(() => {
      stream.abort();
      fail(new Error(`Pré-rendu trop long pour ${url}`));
    }, RENDER_TIMEOUT_MS);

    const fail = (error: unknown) => {
      clearTimeout(timeout);
      reject(error);
    };

    const sink = new Writable({
      write(chunk, _encoding, callback) {
        html += chunk.toString();
        callback();
      },
      final(callback) {
        clearTimeout(timeout);
        resolve(html);
        callback();
      },
    });

    const stream = renderToPipeableStream(
      <StrictMode>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </StrictMode>,
      {
        onAllReady: () => stream.pipe(sink),
        onShellError: fail,
        onError: fail,
      },
    );
  });
}
