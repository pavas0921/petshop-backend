export const updateOperations = (products, soldProducts) => {
        console.log(soldProducts[0].detalleProducto.toString());
        return soldProducts.map(({detalleProducto, cantidad})=>{
          const {stock} = products.find(p => p._id.toString() === detalleProducto.toString());
          
          const nuevoStock = stock - cantidad
          return {
            updateOne:{
              filter: {_id: detalleProducto},
              update: {$set: {stock: nuevoStock}},
            }
          }
          
        })
}