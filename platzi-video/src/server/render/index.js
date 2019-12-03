import dotenv from 'dotenv';
import getManifest from '../getManifest';

dotenv.config();

const assets = {
  css: '',
  js: '',
  vendor: '',
};

if (process.env.NODE_ENV === 'production') {
  const files = getManifest();
  assets.css = files['app.css'];
  assets.js = files['app.js'];
  assets.vendor = files['vendors.js'];
} else {
  assets.css = '/css/styles.css';
  assets.js = '/js/app.js';
  assets.vendor = '/js/vendor.js';
}

const render = (html, preloadedState) => {
  return (`
    <!DOCTYPE html>
    <html lang="es">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Platzi Video</title>
        <link href="https://fonts.googleapis.com/css?family=Muli&display=swap" rel="stylesheet">
        <link rel="stylesheet" href="${assets.css}">
      </head>
      <body>
        <div id="app">${html}</div>
        <script>
          // WARNING: See the following for security issues around embedding JSON in HTML:
          // http://redux.js.org/recipes/ServerRendering.html#security-considerations
          window.__PRELOADED_STATE__ = ${JSON.stringify(preloadedState).replace(
      /</g,
      '\\u003c',
    )}
        </script>
        <script src="${assets.js}"></script>
        <script src="${assets.vendor}"></script>
      </body>
    </html>
  `);
};

export default render;
