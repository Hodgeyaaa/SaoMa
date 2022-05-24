const multer = require('@koa/multer')
var COS = require('cos-nodejs-sdk-v5');

var cos = new COS({
    SecretId: 'AKIDPedLo0wbz6xZuymJZYFgqjLgkX3IGxNW',
    SecretKey: 'tVquidLn11lFTSCfrnSrzrSmpb70h8LJ',
	Protocol: 'https:'
});

let Bucket = 'notion-cos-1309679443'
let Region = 'ap-guangzhou'

// 上传文件到腾讯云的方法
let cosfun = function(fileName, path) {
	return new Promise((resolve, reject) => {
		cos.uploadFile({
		    Bucket, /* 填入您自己的存储桶，必须字段 */
		    Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
		    Key: 'notion-upload/' + fileName,  /* 存储在桶里的对象键，放到存储桶的哪个文件夹（例如1.jpg，a/b/test.txt），必须字段 */
		    FilePath: path,                /* 必须， 从后端的哪个路径拿文件  */
		    SliceSize: 1024 * 1024 * 5,     /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
		})
		.then((res) => {
			// console.log("res:", res)
			resolve(res.Location)
		})
		.catch((err) => {
			reject(err)
		})
	})
}
// 二进制文件上传
let cosBuffer = function(fileName, path) {
	return new Promise((resolve, reject) => {
		cos.putObject({
		    Bucket, /* 填入您自己的存储桶，必须字段 */
		    Region,  /* 存储桶所在地域，例如ap-beijing，必须字段 */
		    Key: 'notion-upload/' + fileName,  /* 存储在桶里的对象键，放到存储桶的哪个文件夹（例如1.jpg，a/b/test.txt），必须字段 */
		    // FilePath: path,                /* 必须， 从后端的哪个路径拿文件  */
		    // SliceSize: 1024 * 1024 * 5,     /* 触发分块上传的阈值，超过5MB使用分块上传，非必须 */
			Body: Buffer.from(path), /* 必须 */
		})
		.then((res) => {
			// console.log("res:", res)
			resolve(res.Location)
		})
		.catch((err) => {
			reject(err)
		})
	})
}


// 参考官网配置1. 上传文件所在目录 2. 更改文件名
const storage = multer.diskStorage({//磁盘存储引擎方法
  destination: (req, file, cb) => {//储存前端传来的文件
    cb(null, 'upload/images')
  },
  filename: (req, file, cb) => {
	//更改文件名
	let fileFormat = (file.originalname).split('.')
	let imgName = `${Date.now()}-${Math.floor(Math.random(0, 1) * 10000)}${'.'}${fileFormat[fileFormat.length - 1]}`
	cb(null, imgName)
  }
})

const upload = multer({ storage: storage })

module.exports = {upload, cosfun, cosBuffer}