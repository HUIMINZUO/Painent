module.exports = options => {
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const AdminUser = require('../models/AdminUser')
	
	return async (req, res, next) => {
		// 此操作用于校验用户是否登录
		// 第一步，获取用户的信息
		// const token = req.headers.authorization
		const token = String(req.headers.authorization || '').split(' ').pop()
		// const tokenData = jwt.verify(token, app.get('secret'))
		assert(token, 401, '请先登录')
		const { id } = jwt.verify(token, req.app.get('secret'))
		assert(id, 401, '请先登录')
		req.user = await AdminUser.findById(id)
		// console.log(req.user)
		// console.log(token)
		// console.log(tokenData)
		assert(req.user, 401, '请先登录')
		await next()
	}
}