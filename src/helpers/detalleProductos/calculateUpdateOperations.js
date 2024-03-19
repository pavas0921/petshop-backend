export const updateOperations = (products, soldProducts) => {
  return soldProducts.map(({_id, qty}) => {
    const product = products.find(p => p._id.toString() === _id.toString());
    
    if (product) {
      const nuevoStock = product.stock - qty;
      return {
        updateOne: {
          filter: { _id: product._id },
          update: { $set: { stock: nuevoStock } },
        },
      };
    } else {
      return null;
    }
  }).filter(operation => operation !== null);
};
