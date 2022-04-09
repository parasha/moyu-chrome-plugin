const {readFileSync} = require('fs');
const fs = require('fs/promises');
const path = require('path');
const child_process = require('child_process');

const cssReg = /\.css$/;

class InitMainFastPlugin {
    
    constructor() {
        // 获取外部参数
        const json = readFileSync(path.resolve(__dirname, './manifest.json'));
        this.mainfest = JSON.parse(json);
      }
    
    apply(compiler) {
        /**
         * tap ：以同步方式触发钩子；
         * tapAsync ：以异步方式触发钩子；
         * tapPromise ：以异步方式触发钩子，返回 Promise；
         */
        compiler.hooks.emit.tap('InitMainFastPlugin', async (compilation, callback) => {
            compilation.chunks.forEach(chunk => {
                const {name, files} = chunk;
                if(name === 'background' || name === 'content') {
                    let path = {js: [], css: []};
                    files.map(file => {
                        if(cssReg.test(file)){
                            path.css.push(file);
                        } else {
                            path.js.push(file);
                        }
                    });
                    if (name === 'background') {
                        // this.mainfest.background.service_worker = path.js[0];
                        this.mainfest.background.scripts = path.js;
                    }
                    if(name === 'content') {
                        this.mainfest.content_scripts[0] = {
                            ...this.mainfest.content_scripts[0],
                            ...path,
                        }
                    }
                }
            });
        });

        compiler.hooks.done.tap('InitMainFastPlugin', () => {
            const output = compiler.options.output.path
            fs.writeFile(`${output}/manifest.json`, JSON.stringify(this.mainfest));
            child_process.spawn('cp', ['-r', path.resolve(__dirname, './assets'), `${output}/assets`]);	
        });
    }
}

module.exports = InitMainFastPlugin;
