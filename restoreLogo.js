const fs = require('fs');
const path = require('path');

const src = 'C:\\Users\\ADMIN\\.gemini\\antigravity\\brain\\460d5d24-f337-447f-aabf-fa539140eafe\\media__1775993622770.png';
const dest = path.join(__dirname, 'src', 'assets', 'Logo.png');

if (fs.existsSync(src)) {
    fs.copyFileSync(src, dest);
    console.log('Logo.png restored successfully!');
} else {
    console.log('Source logo file not found in brain folder!');
}
