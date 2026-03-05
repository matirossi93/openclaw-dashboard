const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const cssDir = path.join(publicDir, 'css');
const jsDir = path.join(publicDir, 'js');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir);
if (!fs.existsSync(cssDir)) fs.mkdirSync(cssDir);
if (!fs.existsSync(jsDir)) fs.mkdirSync(jsDir);

const indexPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(indexPath, 'utf-8');

// 1. Extract CSS
const styleMatch = htmlContent.match(/<style>([\s\S]*?)<\/style>/i);
if (styleMatch) {
    fs.writeFileSync(path.join(cssDir, 'styles.css'), styleMatch[1].trim());
    console.log('Extracted styles.css');
    htmlContent = htmlContent.replace(/<style>[\s\S]*?<\/style>/i, '<link rel="stylesheet" href="/public/css/styles.css">');
}

// 2. Extract JS
// We need to be careful as there might be multiple script tags, but we're looking for the giant inline one
const scriptMatch = htmlContent.match(/<script>([\s\S]*?)<\/script>/i);
if (scriptMatch) {
    fs.writeFileSync(path.join(jsDir, 'app.js'), scriptMatch[1].trim());
    console.log('Extracted app.js');
    htmlContent = htmlContent.replace(/<script>[\s\S]*?<\/script>/i, '<script src="/public/js/app.js"></script>');
}

fs.writeFileSync(indexPath, htmlContent);
console.log('Updated index.html successfully!');
