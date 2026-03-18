class ShopItems {
  constructor(page) {
    this.page = page;
  }

  btnAddItemIntoCart(itemName) {
    return `//h4[normalize-space()='${itemName}']//parent::div//descendant::a`;
  }
}

module.exports = { ShopItems };
