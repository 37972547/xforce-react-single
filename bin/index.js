const program  = require('commander');
// 加载所有命令行
fse.readdir(path.resolve(__dirname, '../', './command')).then((files) => {
    files.filter(item => /.+\.js$/.test(item))
        .forEach((file) => {
            require(`../command/${file.trim()}`);
        });

    if(process.argv.length <= 2 ) {
        program.help();
        return;
    }
    program.parse(process.argv);
}).catch((err) => {
    console.log(err)
});