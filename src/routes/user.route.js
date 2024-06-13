const userController = require('../controllers/user.controller')
const upload = require('../middlewares/multer.middleware')
const Router = require('express')

const router = Router()

router.route('/register').get(userController.registerUser)
router.route('/avatar').post(upload.single('file'), userController.uploadAvatar)

module.exports = router