const userController = require('../controllers/user.controller')
const upload = require('../middlewares/multer.middleware')
const Router = require('express')

const router = Router()

router.route('/register').post(userController.registerUser)
router.route('/address').post(userController.addressUser)
router.route('/avatar').post(upload.single('file'), userController.uploadAvatar)

module.exports = router