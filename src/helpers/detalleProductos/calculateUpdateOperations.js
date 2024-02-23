export const updateOperations = (products, soldProducts) => {
  console.log("ww#",products);
  return soldProducts.map(({_id, qty}) => {
    console.log("id", _id);
    const product = products.find(p => p._id.toString() === _id.toString());
    console.log("product", product);
    
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
