module.exports = options => {
	return async(req,res,next) => {
		const modelName = require('inflection').classify(req.params.resource)
		// 表示在请求对象中挂载一个model
		req.Model = require(`../models/${modelName}`)
		next()
	}
}