module.exports = function Cart(oldCart) {
  this.items = oldCart.items;
  this.totalProd = oldCart.totalProd;
  this.totalPrice = oldCart.totalPrice;

  this.addToBasket = (prod, id) => {
    if (prod.quantity === 0) return false;
    let stroedItem = this.items[id];
    if (!stroedItem) {
      stroedItem = this.items[id] = { item: prod, qty: 0, price: 0 };
    }

 
    stroedItem.qty++;
    stroedItem.price = stroedItem.item.price * stroedItem.qty;
    prod.quantity--;
    this.totalProd++;
    this.totalPrice += prod.price;
    return true;
  };

  this.deleteFromBasket = (id) => {
    if (this.items[id]) {
      let price = this.items[id].item.price;
      if (this.items[id].qty > 1) {
        this.items[id].qty--;
        this.items[id].price -= this.items[id].item.price;
      } else {
        delete this.items[id];
      }

      this.totalProd--;
      this.totalPrice -= price;
      return true;
    }

    return false;
  };
};
