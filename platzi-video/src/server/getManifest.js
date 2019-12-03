const fs = require('fs');

const getManifest = () => {
  try {
    return JSON.parse(fs.readFileSync(`${__dirname}/public/manifest.json`, 'utf8'));
  } catch (error) {
    console.log(error);
    return false;
  }
};

export default getManifest;
