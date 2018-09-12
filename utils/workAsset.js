const path = require('path');
const fs = require('fs');
const request = require('request');
const packjson = require(path.resolve('package.json'));
// console.log(process.env.NODE_ENV)
class PackFiles {
  constructor() {
    this.dir = path.resolve('dist');
    this.url = 'http://localhost:3003/release/addReleaseItem';
  }
  /**
   * 获取文件状态
   * */
  async fileStat() {
    return new Promise((resolve, reject) => {
      fs.stat(this.dir, function (err, stats) {
        if (err) {
          console.log(err);
          reject(err);
        }
        resolve(stats);
      });
    })
  }
  /**
   * 获取文件列表
   * */
  async readdir() {
    const isFileStatus = await this.fileStat();
    return new Promise((resolve, reject) => {
      if (isFileStatus) {
        fs.readdir(this.dir, function (err, files) {
          if (err) {
            console.log(err)
            reject(err);
            return;
          }
          files = files.filter(item => {
            return /\.(js|css)$/.test(item)
          });
          resolve(files);
        })
      }
    })
  }
  /**
   * 存储文件
   * */
  async sendFiles() {
    const files = await this.readdir();
    request(this.url, {
      method: 'POST',
      // json: true,
      headers: {
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          'projectName': packjson.name,
          'assetsName': files
        }
      })
    }, function(err, response, body) {
      if (err) {
        const buffer = new Buffer.from(err);
        console.log(buffer.toString());
        return;
      }
      if (response.statusCode === 200) {
        const buffer = new Buffer.from(JSON.parse(body).message);
        console.log(buffer.toString('utf-8'))
      }
    });
  }
}

const pack = new PackFiles();
pack.sendFiles();
