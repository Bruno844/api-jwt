import express from 'express'
import morgan from 'morgan';
import productsRoute from './routes/products.routes'
import AuthRoute from './routes/auth.routes'
import { createRole } from './helpers/initialSetup';
import UserRoute from './routes/user.routes'
const app = express()
//apenas inicie la app, ejecute esa funcion
createRole();

//middlewares
app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/products', productsRoute )
app.use('/api/auth', AuthRoute)
app.use('/api/users', UserRoute)
export default app

