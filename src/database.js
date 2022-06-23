import mongoose from 'mongoose'

mongoose.connect("mongodb+srv://user-node:bocateamo@cluster-me-node.rsjc3.mongodb.net/?retryWrites=true&w=majority", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(db => console.log('base de datos conectada'))
.catch(err => console.log('no se conecto por:', err))