const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const keys = require('../config/keys')
const User = require('../models/User')
const errorHandler = require('../utils/errorHandler.js')

module.exports.login = async function (req, res) {
  const candidate = await User.findOne({ email: req.body.email })

  if (candidate) {
    // Проверка пароля, пользователь существует
    const passwordResult = bcrypt.compareSync(req.body.password, candidate.password)

    if (passwordResult) {
      // Генерим токен, пароли совпали
      const token = jwt.sign({
        email: candidate.email,
        userId: candidate._id
      }, keys.jwt, {expiresIn: 60 * 60})

      res.status(200).json({
        token: `Bearer ${token}`
      })
    } else {
      res.status(401).json({
        message: 'Пароли не совпадают. Попробуйте снова'
      })
    }
  } else {
    // Пользователя нет, ошибка
    res.status(404).json({
      message: 'Пользователь с таким email не найден.'
    })
  }
}

module.exports.register = async function (req, res) {
  // Проверка есть ли такой email
  const candidate = await User.findOne({email: req.body.email})

  if (candidate) {
    // Пользователь существует, нужно отправить ошибку
    res.status(409).json({
      message: 'Такой email уже занят. Попробуйте другой.'
    })
  } else {
    // Создаем пользователя
    const salt = bcrypt.genSaltSync(10) // Генерим хэш
    const password = req.body.password

    const user = new User({
      email: req.body.email,
      password: bcrypt.hashSync(password, salt)
    })

    try {
      await user.save()
      res.status(201).json(user)
    } catch (error) {
      errorHandler(res, error)
    }
  }
}