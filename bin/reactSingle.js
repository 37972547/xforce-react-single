#!/usr/bin/env node
const program  = require('commander');
const path = require('path');
const command = require('../utils/exec.js').command;
const configPath = path.join(__dirname,'../config/reactsingle/');

const scripts = {
    "dev": `webpack-dev-server --inline --config ${configPath}webpack.config.dev.js --open`,
    "prodIE": `webpack --config ${configPath}webpack.config.proIE7.js  --mode production && set NODE_ENV=production`,
    "mock": `webpack-dev-server --config ${configPath}webpack.config.mock.js --open`,
    "prod": `webpack --config ${configPath}webpack.config.pro.js && set NODE_ENV=production`,
    "devIE": `webpack-dev-server --config ${configPath}webpack.config.devIE.js`,
};

program
    .command('run <name>')
    .description('打包')
    .action(async function(name,ops){
        let str = '';
        switch (name) {
            case 'dev':
                str = scripts.dev;
                break;
            case 'prodIE':
                str = scripts.prodIE;
                break;
            case 'mock':
                str = scripts.mock;
                break;
            case 'prod':
                str = scripts.prod;
                break;
            case 'devIE':
                str = scripts.devIE;
                break;
            default:
                // console.log('not found %d', name)
        }
        await command({
            cmdStr: str,
            beforeMsg: ``,
            errMsg: ``,
            successMsg: ``
        });
    });
program.parse(process.argv);

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
