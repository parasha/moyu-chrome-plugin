const fs = require("fs");
const path = require("path");

const copyFile = (src, target) => {
    fs.writeFileSync(target, fs.readFileSync(src));
}

copyFile(path.resolve(__dirname, './manifest.json'), path.resolve(__dirname, '../dist/manifest.json'));
copyFile(path.resolve(__dirname, './theresa.png'), path.resolve(__dirname, '../dist/theresa.png'));
copyFile(path.resolve(__dirname, './popup.html'), path.resolve(__dirname, '../dist/popup.html'));
