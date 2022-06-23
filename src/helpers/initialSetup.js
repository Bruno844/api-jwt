import Role from '../models/roles'

export const createRole = async () => {

    try {
        //conteo de los documentos que haya en la base de datos
        const count =  await Role.estimatedDocumentCount()

        //cuenta que si ya hay un documento, que no devuelva nada
        if(count > 0) return;
        //pero si no hay nada, que cree roles por primera vez cuando un usuario se registre por primera vez

        //devuelve todas esas funciones al mismo tiempo
        const values = await Promise.all([
        new Role({name: 'user'}).save(),
        new Role({name: 'moderator'}).save(),
        new Role({name: 'admin'}).save()
        ])
        console.log(values)   

    } catch (error) {
        console.log(error)
    }
}