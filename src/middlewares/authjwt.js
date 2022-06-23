import jwt from 'jsonwebtoken';
import config from '../config'
import UserSchema from '../models/user'
import Role from '../models/roles';

export const verifyToken = async(req,res,next) => {

    try {
        const token = req.headers['x-access-token'];

        console.log(token)

        if(!token) return res.status(401).json({message: "no token provided"});

        const decoded = jwt.verify(token, config.SECRET)
        req.userId = decoded.id;

        const user = await UserSchema.findById(req.userId, {password: 0})
        if(!user) return res.status(404).json({message: 'not user found'})

        //verifica que si no existe un token en la request, le lanza un mensaje, pero si le pasa el correcto,sigue con la funcion,que en este caso es la funcion next()
        next()

    } catch (error) {
        return res.status(500).json({message: 'Unauthorized'})
    }
}

//se comprueba si el usuario que se registra,tiene un rol que le permita eliminar o agregar productos
export const isModerator = async (req,res,next) => {

    const user = await UserSchema.findById(req.userId)

    //busca en ese user su id, y devuelve el rol que tiene ese user,para asi usarlo mas adelante
    const roles =  await Role.find({_id: {$in:user.roles} })

    //recorre los roles del usuario, y si su rol es moderador,continua con el next
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "moderator"){
            next();
            return;
        }
    }

    //de lo contrario, no se puede y lanza un mensaje de error
    return res.status(403).json({message: 'Require Moderator Role'}) //requiere de un rol moderador para ejecutar ciertas tareas
}

export const isAdmin = async(req,res,next) => {
    const user = await UserSchema.findById(req.userId)

    
    const roles =  await Role.find({_id: {$in:user.roles} })

    //recorre los roles del usuario, y si su rol es moderador,continua con el next
    for(let i = 0; i < roles.length; i++){
        if(roles[i].name === "admin"){
            next();
            return;
        }
    }

    //de lo contrario, no se puede y lanza un mensaje de error
    return res.status(403).json({message: 'Require Admin Role'}) //requiere de un rol ADMIN para ejecutar ciertas tareas
}