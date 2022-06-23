import {Schema, model} from 'mongoose';
import bcrypt from 'bcryptjs';

export const ROLES = ['user', 'admin', 'moderator']


const userSchema = new Schema({
    username: {
        type:String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    password: {
        type :String,
        unique: true
    },
    roles: [{
        ref: 'Role',
        type: Schema.Types.ObjectId
        //hacemos referencia a otro modelo relacionadolo
        //y el Type hace referencia a guardar un user pero por su id, como un objectId
    }]
},{
    timestamps: true,
    versionKey: false
});


userSchema.statics.encryptPassword = async (password) => {
    //el gensalt es un metodo para aplicar un algoritmo, y el 10 son las veces que se va a aplicar e intentar el algoritmo(se usa el 10 para no consumir recursos)
    const salt = await bcrypt.genSalt(10)
    return await bcrypt.hash(password, salt) //aca ya lo encripta,pasando el password que este tipeando el user y el salt

}

//el password es la q esta guardada, y el received es la contraseña nueva que esta probando le user
userSchema.statics.comparePassword = async (password, receivedPassword) => {

  return await bcrypt.compare(password, receivedPassword)
  //compara la contraseña guardada con la que esta tipeando el user otra vez


}


export default model('User', userSchema)