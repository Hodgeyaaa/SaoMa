const jwt = require('jsonwebtoken')
const {security} = require('./tokenInfo.js')

// token 加密生成
function createToken(uid, scop = 2) {
	const secretkey = security.secretkey;
	const expiresIn = security.expiresIn;
	const token = jwt.sign({uid, scop}, secretkey, {expiresIn});
	return token;
}

module.exports = {createToken};