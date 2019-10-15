module.exports = app => {
	const express = require('express')
	const jwt = require('jsonwebtoken')
	const assert = require('http-assert')
	const AdminUser = require('../../models/AdminUser')
	// 合并参数
	// const bcrypt = require('bcryptjs')
	const router = express.Router({
		mergeParams: true
	})
	// 创建资源接口
	router.post('/',async (req,res) => {
		const model = await req.Model.create(req.body)
		res.send(model)
	})
	// 修改详情（更新资源接口）
	router.put('/:id',async (req,res) => {
		const model = await req.Model.findByIdAndUpdate(req.params.id,req.body)
		res.send(model)
	})
	// 删除接口(后端接口)删除资源接口
	router.delete('/:id',async (req,res) => {
		await req.Model.findByIdAndDelete(req.params.id,req.body)
		res.send({
			success: true
		})
	})
	// （资源列表）创建分类
	router.get('/',async (req,res) => {
		const queryOptions = {}
		if (req.Model.modelName === 'Category') {
			queryOptions.populate = 'parent'
		}
		const items = await req.Model.find().setOptions(queryOptions).limit(100)
		res.send(items)
	})

	// （资源详情接口）获取详情接口（后端的）
	router.get('/:id',async (req,res) => {
		const model = await req.Model.findById(req.params.id)
		res.send(model)
	})
	// 登录校验中间件
	const authMiddleware = require('../../middleware/auth')
	const resourceMiddleware = require('../../middleware/resource')
	app.use('/admin/api/rest/:resource', authMiddleware(), resourceMiddleware(), router)

	const multer = require('multer')
	const upload = multer({ dest: __dirname + '/../../uploads' })
	app.post('/admin/api/upload', authMiddleware(), upload.single('file'),async (req,res) => {
		const file = req.file
		file.url = `http://localhost:3000/uploads/${file.filename}`
		res.send(file)
	})

	app.post('/admin/api/login', async (req, res) => {
		// res.send('欧克')
		const { username, password } = req.body

		// 1.根据用户名找用户
		// const AdminUser = require('../../models/AdminUser')
		const user = await AdminUser.findOne({ username }).select('+ password')
		assert(user,422,'用户不存在')
		// if (!user) {
		// 	return res.status(422).send({
		// 		message: '用户不存在'
		// 	})
		// }
		// 比较铭文和密文是否匹配(密码的校验)
		const isValid = require('bcrypt').compareSync(password, user.password)
		assert(isValid, 422, '密码错误')
		// if (!isValid) {
		// 	return res.status(422).send({
		// 		message: '密码错误'
		// 	})
		// }
		// 账号和密码都正确的话就返回
		// const jwt = require('jsonwebtoken')
		const token = jwt.sign({ id: user._id},app.get('secret'))
		res.send({token})
	})

	// 错误处理函数
	app.use(async (err, req, res, next) => {
		// console.log(err)
		res.status(err.statusCode || 500).send({
		// res.status(500).send({
			message: err.message
		})
	})
}

// compareSync