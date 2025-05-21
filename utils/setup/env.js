exports.ENV = class ENV {
  baseUrl = ''

  constructor() {
    this.baseUrl = process.env.BASE_URL || ''
  }

  getBaseUrl() {
    return this.baseUrl
  }
}
