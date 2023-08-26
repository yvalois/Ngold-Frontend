export const convertToCartData = (carts)=> {

  const cartData = carts.filter(cart => cart.productId !== null|| cart.productId !== undefined);
  return carts.map(c => {
    return {
      product: c.productId._id,
      name: c.productId.name,
      imageUrl: c.productId.imageUrl,
      price: c.productId.price,
      countInStock: c.productId.countInStock,
      qty: c.count,
      _id: c._id,
      option: c.option,
      discount: c.productId.discount,
    }
  })
}
