class ShopItems {
  constructor(page) {
    this.page = page
    this.btnAddItemIntoCart = (itemName) => `//h4[normalize-space()='${itemName}']//parent::div//descendant::a`
  }
}

module.exports = { ShopItems }
