class ReportFeedback {
  constructor(page) {
    this.page = page
    this.txtForeName = "//input[@id='forename']"
    this.txtSurname = "//input[@id='surname']"
    this.txtEmailAdd = "//input[@id='email']"
    this.txtTelephoneNumber = `//input[@id='telephone']`
    this.txtMessage = `//textarea[@id='message']`
    this.btnSubmit = `//a[normalize-space()='Submit']`

    //validation
    this.errorlbForenameRequired = `//span[@id='forename-err']`
    this.errorlbEmailRequired = `//span[@id='email-err']`
    this.errorlbMessageRequired = `//span[@id='message-err']`

    //animation
    this.lblSendingFeedback = `//h1[normalize-space()='Sending Feedback']`

    //successsFeedback
    this.lblSuccessFeedback = `//div[@class='alert alert-success']`
  }

  async populateContactFields(fName, lName, emailAdd, tPNumber, message) {
    await this.page.locator(this.txtForeName).type(fName)
    await this.page.locator(this.txtSurname).type(lName)
    await this.page.locator(this.txtEmailAdd).type(emailAdd)
    await this.page.locator(this.txtTelephoneNumber).type(tPNumber)
    await this.page.locator(this.txtMessage).type(message)
  }
}

module.exports = { ReportFeedback }
