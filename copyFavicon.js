const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, 'src', 'assets', 'Logo.png');
const dest = path.join(__dirname, 'public', 'favicon.png');

fs.copyFileSync(src, dest);
console.log('Favicon copied successfully!');
