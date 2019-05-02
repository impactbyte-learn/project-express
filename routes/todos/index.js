const express = require('express')
const router = express.Router()

const todosMiddleware = require('./middleware')

// router.get('/search', todosMiddleware.searchByKeyword)
router.get('/', todosMiddleware.get)
// router.get('/:id', todosMiddleware.getOneById)
// router.post('/', todosMiddleware.post)
// router.delete('/', todosMiddleware.delete)
// router.delete('/:id', todosMiddleware.deleteOneById)
// router.put('/:id', todosMiddleware.putOneById)

module.exports = router
