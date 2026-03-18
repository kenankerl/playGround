class Carts {
  constructor(page) {
    this.page = page;
  }

  txtQuantityInput(itemName) {
    return `//td[normalize-space()='${itemName}']//parent::tr//descendant::input`;
  }

  txtItemSubtotal(itemName, subtotalPrice) {
    return `//td[normalize-space()='${itemName}']//ancestor::tr//child::td[normalize-space()='$${subtotalPrice}']`;
  }

  lblTotalAmount(amount) {
    return `//strong[@class='total ng-binding' and normalize-space()='Total: ${amount}']`;
  }

  async editItemUnit(itemName, unit) {
    await this.page.locator(this.txtQuantityInput(itemName)).fill(unit);
  }

  computeItemSubtotalAmount(itemPrice, unit) {
    return (+itemPrice * +unit).toString();
  }

  computeItemTotalAmount(...items) {
    return items.reduce((total, item) => total + +item, 0);
  }
}

module.exports = { Carts };
