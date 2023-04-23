
/**
 * Redirect user to path:/ when time of list of products items in cart expires
 */
function emptyShoppingCartWhenTimeExpires(): void {
    var today = new Date();
    var yesterday = new Date(new Date().setDate(new Date().getDate() - 1));
    const isRemoveProductsInCart = today <= yesterday

    // console.log('today', today)
    // console.log('yesterday', yesterday)
    // console.log('removeProductsInCart', today <= yesterday)

  if (isRemoveProductsInCart) {
      // Empty shopping cart
      localStorage.setItem(
        '@CoffeeDelivery:cartProducts',
        JSON.stringify([]),
      );

      window.location.reload();
  }
}

export { emptyShoppingCartWhenTimeExpires };
