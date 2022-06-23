import {Router} from 'express'
import * as ProdController from '../controllers/products.controller'
import { verifyToken, isModerator,isAdmin } from '../middlewares/authjwt';

const router = Router();

router.get('/', ProdController.getProducts)

router.get('/:productId', ProdController.getProductById)

//middlewares que primero pasa por esos, y despues por la funcion siguiente
router.post('/', [verifyToken, isModerator], ProdController.createProduct)

router.put('/:productId', [verifyToken, isAdmin], ProdController.updateProductById)

router.delete('/:productId', [verifyToken, isAdmin], ProdController.deleteProductById)



export default router