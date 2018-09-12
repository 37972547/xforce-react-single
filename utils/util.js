/**
 * 获取package.json scripts 打包命令
 * @param {[String]} name 名称
 * @return {[String]} 返回打包命令
 * */
const getCmdStr = function (name) {
    const packageJson = require(path.join(__dirname, '../template/package.json'));

    // 替换路径
    const webpackPath = path.join(rootDirectory(), 'template/');
    const workAssetPath = path.join(rootDirectory(), '/');
    const packageScripts = packageJson.scripts
    for (key in packageScripts) {
        packageScripts[key] = packageScripts[key].replace(/\.\/webpack/gi, webpackPath + 'webpack');
        packageScripts[key] = packageScripts[key].replace(/\.\/bin\//gi, path.join(workAssetPath,'bin/'));
    }

    return packageScripts[name]
};

module.exports  = {
    getCmdStr: getCmdStr
};