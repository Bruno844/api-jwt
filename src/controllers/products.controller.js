import ProductSchema from '../models/products';


export const createProduct = async (req,res) => {
    try {
        const {name, category, price, image} = req.body

        const newProd = new ProductSchema({name,category,price, image})

        await newProd.save();

        res.status(200).json({data: newProd})   
    } catch (error) {
        res.status(400).json('hubo un error a la hora de crear un prod',error)
    }
}

export const getProducts = async (req,res) => {
    try {

        const products = await ProductSchema.find();

        res.status(200).json(products)

    } catch (error) {
        
    }
}

export const getProductById = async (req,res) => {
    try {
        const findProd = await ProductSchema.findById(req.params.productId)

        res.status(200).json(findProd)
    } catch (error) {
        res.status(500).json('error en', error)
    }
}

export const updateProductById =  async (req,res) => {

    try {
        const updateProd = await ProductSchema.findByIdAndUpdate(req.params.productId, req.body,{
            new:true //devuelve los datos recien actualizados
        })//se le pasa el id, y luego en el body los campos que quiero actualizar

        res.status(200).json(updateProd)
    } catch (error) {
        
    }    
}

export const deleteProductById = async (req,res) => {
    try {
        const deleteProd = await ProductSchema.findByIdAndDelete(req.params.productId)

        res.status(200).json('eliminado con exito!!')
    } catch (error) {
        console.log(error)
    }
}