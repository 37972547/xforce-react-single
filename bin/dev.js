#!/usr/bin/env node
const command = require('../utils/exec.js');
command({
	cmdStr: `webpack-dev-server --inline --config ../config/webpack.config.dev.js --open`,
	beforeMsg: ``,
	errMsg: ``,
	successMsg: ``
});

