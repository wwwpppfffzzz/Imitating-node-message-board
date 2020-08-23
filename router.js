// const express = require('express')
// const router = express.Router()
// const User = require('./models/user')
// const Topic = require('./models/topic')

// const md5 = require('blueimp-md5')
// const user = require('./models/user')
// router.get('/', (req, res) => {
//     Topic.find((err, data) => {
//         if (err) {
//             return res.end('Server Error');
//         }
//         let PageCode = [];
//         let length = Math.ceil(data.length / 6);
//         for (var i = 1; i <= length; i++) {
//             PageCode.push(i);
//         }
//         data = data.slice(0, 6);
//         res.render('index.html', {
//             user: req.session.user,
//             topic: data, //  topci 内容数据
//             pageCode: PageCode // 页数
//         });
//     })

// })
// router.get('/login', (req, res) => {
//     res.render('login.html')
// })
// router.post('/login', (req, res, next) => {
//     // 1. 获取表单提交数据
//     // console.log(req.body);
//     // 2. 查询数据库用户名密码是否正确
//     // 3.发送响应数据
//     let body = req.body
//     User.findOne({
//         email: body.email,
//         // password: md5(md5(body.password))
//         password: body.password
//     }, (err, user) => {
//         if (err) {
//             // return res.status(500).json({
//             //     err_code: 500,
//             //     message: err.message
//             // })
//             // 在app.js中 做了全局错误统一处理了 
//             return next(err)
//         }
//         if (!user) {
//             return res.status(200).json({
//                 err_code: 1,
//                 message: 'Email or password is invalid.'
//             })
//         }
//         // 用户存在，  通过 Session 来记录登录状态
//         req.session.user = user
//         res.status(200).json({
//             err_code: 0,
//             message: 'ok'
//         })
//     })
// })
// router.get('/register', (req, res) => {
//     res.render('register.html')
// })
// router.post('/register', (req, res, next) => {
//     // 1. 获取表单提交数据
//     // console.log(req.body);
//     // 2. 操作数据库
//     // 判断用户是否存在  如果存在 不允许注册    不存在  注册新建用户
//     let body = req.body
//     User.findOne({
//         //   mongoose  或方法   判断 邮箱 或 昵称 是否已存在
//         $or: [{
//             email: body.email
//         }, {
//             nickname: body.nickname
//         }]
//     }, (err, data) => {
//         if (err) {
//             // Express 提供了一个响应方法 ：json
//             // 该方法接受一个对象作为参数，他会自动帮你把对象转为字符串再发送到浏览器
//             // return res.status(500).json({
//             //     success: false,
//             //     message: 'Server error..'
//             // })

//             // 在app.js中 做了全局错误统一处理了 
//             return next(err)
//         }
//         // 如果 邮箱 或 昵称 已存在 
//         if (data) {
//             return res.status(200).json({
//                 err_code: 1,
//                 message: 'email or nickname already exists.'
//             })
//         }
//         //用 md5 第三方包 加密密码
//         // body.password = md5(md5(body.password))

//         //  不存在 就 新建用户
//         new User(body).save((err, user) => {
//             if (err) {
//                 // return res.status(500).json({
//                 //     err_code: 500,
//                 //     message: 'Server error..'

//                 // })

//                 // 在app.js中 做了全局错误统一处理了 
//                 return next(err)
//             }
//             // 注册成功之后 使用 session 来记录用户的登录状态
//             req.session.user = user
//             //  3. 发送响应      
//             // 服务端重定向 只针对同步请求才有效， 异步请求无效
//             // res.redirect('/')       // 所以此处 没反应  应该在客户端 设置 跳转首页
//             res.status(200).json({
//                 err_code: 0,
//                 message: 'Ok'
//             })
//         })
//     })
// })



// router.get('/logout', (req, res) => {
//     // 清除登录状态
//     req.session.user = null
//     // 重定向到登陆页面    因为 此处没有异步操作 可以使用重定向
//     res.redirect('/')
// })

// router.get('/settings/profile', (req, res) => {
//     res.render('./settings/profile.html', {
//         user: req.session.user
//     })
// })

// router.post('/settings/profile', (req, res, next) => {
//     // 1. 获取提交表单数据
//     // 2. 寻找到他的email 然后通过它的id 来修改
//     // 3.  修改完后 再把修改后的数据再提交到页面上显示
//     let body = req.body
//     User.findOne({
//         id: body.id
//     }, (err, data) => {
//         if (err) {
//             // return res.status(500).json({
//             //     err_code: 500,
//             //     message: 'Server error'
//             // })
//             return next(err)
//         }
//         user.findByIdAndUpdate(data.id, body, (err) => {
//             if (err) {
//                 // return res.status(500).json({
//                 //     err_code: 500,
//                 //     message: 'Server error'
//                 // })
//                 return next(err)

//             }
//             User.findOne({
//                 id: body.id
//             }, (err, user) => {
//                 if (err) {
//                     // return res.status(500).json({
//                     //     err_code: 500,
//                     //     message: 'Server error'
//                     // })
//                     return next(err)

//                 }
//                 req.session.user = user
//                 res.status(200).json({
//                     err_code: 0,
//                     message: 'Ok'

//                 })
//             })
//         })
//     })

// })
// router.get('/settings/admin', (req, res) => {
//     res.render('./settings/admin.html', {
//         user: req.session.user
//     })
// })
// router.post('/settings/admin', (req, res, next) => {
//     // 1. 获取提交表单数据
//     // 2. 寻找到他的email 然后通过它的id 来修改
//     // 3.  修改完后 再把修改后的数据再提交到页面上显示
//     let body = req.body
//     // console.log(body);
//     User.findOne({
//         id: body.id
//     }, (err, data) => {
//         if (err) {
//             // return res.status(500).json({
//             //     err_code: 500,
//             //     message: 'Server error'
//             // })
//             return next(err)

//         }
//         user.findByIdAndUpdate(data.id, body, (err) => {
//             if (err) {
//                 // return res.status(500).json({
//                 //     err_code: 500,
//                 //     message: 'Server error'
//                 // })
//                 return next(err)

//             }
//             User.findOne({
//                 id: body.id
//             }, (err, user) => {
//                 // console.log(user);
//                 if (err) {
//                     // return res.status(500).json({
//                     //     err_code: 500,
//                     //     message: 'Server error'
//                     // })
//                     return next(err)

//                 }
//                 req.session.user = user
//                 res.status(200).json({
//                     err_code: 0,
//                     message: 'Ok'

//                 })
//             })
//         })

//     })

// })
// // 注销用户
// router.get('/logoff', function (req, res) {
//     var user = req.session.user
//     User.deleteOne({
//         email: user.email
//     }, function (err) {
//         if (err) {
//             return next(err)
//         }
//         req.session.destroy()
//         return res.redirect('/')
//     })
// })
// router.get('/page/choose', (req, res) => {
//     const num = parseInt(req.query.num, 10);
//     console.log(num);
//     const startNum = (num - 1) * 6;
//     const endNum = startNum + 6;
//     Topic.find((err, data) => {
//         if (err) {
//             return res.end('Server Error');
//         }
//         data = data.slice(startNum, endNum);
//         res.json({
//             topic: data
//         });
//     })

// })

// router.get('/topics/new', (req, res) => {
//     res.render('topic/new.html', {
//         user: req.session.user
//     });
// })

// router.post('/topics/new', (req, res) => {
//     var body = req.body;
//     new Topic(body).save((err, data) => {
//         if (err) {
//             return res.end('Server Error');
//         }
//         res.redirect('/');
//     })
// })

// router.get('/topics/delete', (req, res) => {
//     // 1. 在客户端的列表页中处理链接问题 （需要有 id 的参数）
//     // 2. 获取要编辑的 id
//     // 3. 渲染编辑页面   
//     //   根据id 把学生信息查出来
//     //   使用模板引擎来渲染页面
//     Topic.findByIdAndRemove(req.query.id, (err, student) => {
//         // req.query.id 是字符串 而我们要的 id 是个 数字型 所以要转换
//         if (err) {
//             return res.status(500).send('Server err..')
//         }
//         res.redirect('/')
//     })
// })
// router.get('/topics/show', (req, res) => {
//     Topic.findOne({
//         _id: req.query.id
//     }, (err, data) => {
//         if (err) {
//             throw (err);
//         }
//         res.render('topic/show.html', {
//             topic: data
//         })
//     })
// })
// module.exports = router