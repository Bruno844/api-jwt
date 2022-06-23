import UserSchema from '../models/user';
import {ROLES} from '../models/user';


export const checkDuplicatedUserOrEmail = async (req,res,next) => {

    const {username, email} = req.body
    try {
        const user = await UserSchema.findOne({username: username});
        if(user){
            return res.status(400).json({message: 'El usuario ya fue creado'})
        }

        const email = await UserSchema.findOne({email: email})
        if(email){
            return res.status(400).json({message: 'El email ya fue creado'})
        }
        next();
    } catch (error) {
        res.statuS(500).json({message: error})
    }

}

export const checkRolesExisted = (req,res,next) => {

    //esta funcion compara que si los roles que le pasa el usuario son iguales a los que tenemos asignados en la base de datos, si los roles no son iguales,lanza un error, pero si son iguales,continua con la funcion next
    const {roles} = req.body;
    if(roles){
        for(let i =0; i < roles.lenght; i++){
            if(!ROLES.includes(roles[i])){
                return res.status(400).json({
                    message: `El rol ${roles[i]} no existe`
                })
            }
        }
    }

    //el ROLES, es un arreglo dentro del modelo de user, para hacerlo mas facil

    next();

}