const userController = require('../controllers/user.controller')
const upload = require('../middlewares/multer.middleware')
const Router = require('express')

const router = Router()

router.route('/register').post(userController.registerUser) // register route
router.route('/login').post(userController.loginUser)   // login route
router.route('/address').post(userController.addressUser)
router.route('/avatar').post(upload.single('file'), userController.updateAvatar)

module.exports = router
