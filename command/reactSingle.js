const program  = require('commander');
const path = require('path');
const command = require('../utils/exec.js').command;
const configPath = path.join(__dirname,'../config/reactsingle/');
const utilPath = path.join(__dirname,'../utils/');

program
    .command('react-single <name>')
    .description('react 单页项目')
    .action(async function(name,ops){
        const scripts = {
            "dev": `webpack-dev-server --inline --config ${configPath}webpack.config.dev.js --open`,
            "prodIE": `webpack --config ${configPath}webpack.config.proIE7.js  --mode production && set NODE_ENV=production&& set NODE_ENV=dev && node ${utilPath}workAsset.js`,
            "mock": `webpack-dev-server --config ${configPath}webpack.config.mock.js --open`,
            "prod": `webpack --config ${configPath}webpack.config.pro.js && set NODE_ENV=production && set NODE_ENV=dev && node ${utilPath}workAsset.js`,
            "devIE": `webpack-dev-server --config ${configPath}webpack.config.devIE.js`,
        };

        const cmdStr = scripts[name];
        if(cmdStr) {
            const set = new Set([...cmdStr.split('&&')]);
            for( let [key, value]of set.entries()) {
                await system.command({
                    cmdStr: value,
                    beforeMsg: value,
                    errMsg: '',
                    successMsg: ''
                });
            }
        }else {
            console.log(name + ' not found');
        }
    });

/*
const build = {
	dev: path.join(configPath,'../config','webpack.config.dev.js'),
    "prodIE": "webpack --config ./webpack.config.proIE7.js  --mode production && set NODE_ENV=production && node ./bin/workAsset.js",
    "mock": "webpack-dev-server --config ./webpack.config.mock.js --open",
    "prod": "webpack --config ./webpack.config.pro.js && set NODE_ENV=production && node ./bin/workAsset.js",
    "devIE": "webpack-dev-server --config ./webpack.config.devIE.js && set NODE_ENV=dev && node ./bin/workAsset.js",
}
command({
    cmdStr: `webpack-dev-server --inline --config ${webapckConfig} --open`,
    beforeMsg: ``,
    errMsg: ``,
    successMsg: ``
});
command({
    cmdStr: `webpack --config ./webpack.config.proIE7.js  --mode production && set NODE_ENV=production && node ./bin/workAsset.js`,
    beforeMsg: ``,
    errMsg: ``,
    successMsg: ``
});
command({
    cmdStr: `webpack-dev-server --config ./webpack.config.mock.js --open`,
    beforeMsg: ``,
    errMsg: ``,
    successMsg: ``
});
command({
    cmdStr: `webpack --config ./webpack.config.pro.js && set NODE_ENV=production && node ./bin/workAsset.js`,
    beforeMsg: ``,
    errMsg: ``,
    successMsg: ``
});

command({
    cmdStr: `webpack-dev-server --config ./webpack.config.devIE.js && set NODE_ENV=dev && node ./bin/workAsset.js`,
    beforeMsg: ``,
    errMsg: ``,
    successMsg: ``
});*/
