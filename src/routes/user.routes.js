import {Router} from 'express'
const router = Router();
import * as userController from '../controllers/user.controller'
import {verifyToken, isAdmin, isModerator} from '../middlewares/authjwt'
import {checkDuplicatedUserOrEmail} from '../middlewares/verifySignUp' 

router.post('/', [verifyToken, isAdmin, checkDuplicatedUserOrEmail], userController.createUser);


export default router