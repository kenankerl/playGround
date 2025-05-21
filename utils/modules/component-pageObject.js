class Components {
  constructor(page) {
    this.page = page
    this.btnHome = `//a[normalize-space()='Home']`
    this.btnShop = `//a[normalize-space()='Shop']`
    this.btnContact = `//a[normalize-space()='Contact']`
    this.btnCart = `a[href='#/cart']`
  }
}

module.exports = { Components }
