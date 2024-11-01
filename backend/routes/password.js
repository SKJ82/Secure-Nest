const express = require('express')
const {addPassword, getAllPasswords, deletePassword, updatePassword} = require('../controllers/passwordController')
const requireAuth = require('../middleware/auth')

const router = express.Router()

router.use(requireAuth)

router.get('/', getAllPasswords)

router.post('/', addPassword)

router.put('/:id', updatePassword)

router.delete('/:id', deletePassword)

module.exports = router
