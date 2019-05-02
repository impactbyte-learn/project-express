const express = require('express')
const router = express.Router()

const usersMiddleware = require('./middleware')

router.get('/search', usersMiddleware.searchByKeyword)
router.get('/', usersMiddleware.get)
router.get('/:id', usersMiddleware.getOneById)
router.post('/', usersMiddleware.post)
router.delete('/', usersMiddleware.delete)
router.delete('/:id', usersMiddleware.deleteOneById)
router.put('/:id', usersMiddleware.putOneById)

module.exports = router
