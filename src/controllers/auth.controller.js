import UserSchema from '../models/user';
import Role from '../models/roles';
import jwt from 'jsonwebtoken'
import config from '../config'
import user from '../models/user';

export const SignUp = async (req,res) => {

    const {username, email,password, roles} = req.body;

    //const userFound = await UserSchema.find({email})

    const newUser = new UserSchema({
        username,
        email,
        password: await UserSchema.encryptPassword(password)
    })

    if(roles){
        const foundRole = await Role.find({name: {$in: roles}})
        newUser.roles = foundRole.map(role => role._id)
    }else {
        const role = await Role.findOne({name: "user"})
        newUser.role = [role._id]
    }
    const savedUser = await newUser.save();
    console.log(savedUser)
    
    const token = jwt.sign({id: savedUser._id}, config.SECRET , {
        expiresIn: 86400 //24 horas en seg
    })

    res.json({token})

}


export const SignIn = async( req,res) => {
    
    const userFound = await UserSchema.findOne({email: req.body.email}).populate('roles')

    if(!userFound) return res.json({message: 'user not found'})

    //prueba si  la contraseña q le pasa el usuario es igual a la que esta guardada en la base de datos
    const matchPassword = await UserSchema.comparePassword(req.body.password, userFound.password)

    //verifica si no es asi,tirar un error 401.
    if(!matchPassword) return res.status(401).json({token: null, message: 'invalid password'})

    //guarda el token en el usuario iniciado
   const token = jwt.sign({id: userFound._id}, config.SECRET, {
    expiresIn: 86400 //24h en segundos
   })

    res.status(200).json({token: token})
}