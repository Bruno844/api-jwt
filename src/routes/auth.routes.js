import {Router} from 'express'
import * as AuthController from '../controllers/auth.controller'
import {checkDuplicatedUserOrEmail, checkRolesExisted} from '../middlewares/verifySignUp'

const router = Router();

router.get('/signin', AuthController.SignIn )

router.post('/signup',[checkDuplicatedUserOrEmail,checkRolesExisted],AuthController.SignUp )



export default router