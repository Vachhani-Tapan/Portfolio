const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\460d5d24-f337-447f-aabf-fa539140eafe\\media__1775993622770.png';
const destDir = path.join(__dirname, 'src', 'assets');
const dest = path.join(destDir, 'logo.png');

if (!fs.existsSync(destDir)){
    fs.mkdirSync(destDir, { recursive: true });
}

fs.copyFileSync(src, dest);
console.log('Copied successfully!');
