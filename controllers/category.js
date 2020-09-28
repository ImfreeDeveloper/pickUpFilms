const Category = require('../models/Category')
const Postiton = require('../models/Postiton')
const errorHandler = require('../utils/errorHandler')

module.exports.getAll = async function (req, res) {
  try {
    const categories = await Category.find({ user: req.user.id })
    res.status(200).json(categories)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.getById = async function (req, res) {
  try {
    const category = await Category.findById(req.params.id)
    res.status(200).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.remove = async function (req, res) {
  try {
    await Category.remove({ _id: req.params.id })
    await Postiton.remove({ category: req.params.id })
    res.status(200).json({
      message: 'Категория удалена.'
    })
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.create = async function (req, res) {
  const category = Category({
    name: req.body.name,
    user: req.user.id,
    imageSrc: req.file ? req.file.path : ''
  })

  try {
    await category.save()
    res.status(201).json(category)
  } catch (e) {
    errorHandler(res, e)
  }
}

module.exports.update = function (req, res) {
  const update = {
    name: req.body.name,
  }

  if (req.file) {
    update.imageSrc = req.file.path
  }

  try {
    const category = new Category.findOneAndUpdate(
      { _id: req.params.id },
      { $set: update },
      { new: true } // Обновит запись и ее вернет(если false по вернет старое значение)
    )
    res.status(200).json(position)
  } catch (e) {
    errorHandler(res, e)
  }
}