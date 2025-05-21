class Carts {
  constructor(page) {
    this.page = page
    this.txtQualityInput = (itemName) => `//td[normalize-space()='${itemName}']//parent::tr//descendant::input`
    this.txtItemSubtotal = (itemName, subtotalPrice) => `//td[normalize-space()='${itemName}']//ancestor::tr//child::td[normalize-space()='$${subtotalPrice}']`
    this.lblTotalAmount = (amount) => `//strong[@class='total ng-binding' and normalize-space()='Total: ${amount}']`
  }

  async editItemUnit(itemName, unit) {
    // this function will allow you to edit the quantity of the desire item
    await this.page.locator(this.txtQualityInput(itemName)).clear()
    await this.page.locator(this.txtQualityInput(itemName)).type(unit)
  }

  async computeItemSubtotalAmount(itemprice, unit) {
    const price = +itemprice
    const quantity = +unit

    const subtotal = price * quantity
    return subtotal.toString()
  }

  async computeItemTotalAmount(...items) {
    // allows you to sum the items on the parameters
    return items.reduce((total, item) => total + +item, 0)
  }
}

module.exports = { Carts }
