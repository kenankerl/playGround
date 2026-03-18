class ReportFeedback {
  constructor(page) {
    this.page = page;

    // form fields
    this.txtForeName = '#forename';
    this.txtSurname = '#surname';
    this.txtEmailAdd = '#email';
    this.txtTelephoneNumber = '#telephone';
    this.txtMessage = '#message';
    this.btnSubmit = `//a[normalize-space()='Submit']`;

    // validation errors
    this.lblForenameError = `//span[@id='forename-err']`;
    this.lblEmailError = `//span[@id='email-err']`;
    this.lblMessageError = `//span[@id='message-err']`;

    // animation
    this.lblSendingFeedback = `//h1[normalize-space()='Sending Feedback']`;

    // success
    this.lblSuccessFeedback = `//div[@class='alert alert-success']`;
  }

  async populateContactFields(fName, lName, emailAdd, tPNumber, message) {
    await this.page.locator(this.txtForeName).fill(fName);
    await this.page.locator(this.txtSurname).fill(lName);
    await this.page.locator(this.txtEmailAdd).fill(emailAdd);
    await this.page.locator(this.txtTelephoneNumber).fill(tPNumber);
    await this.page.locator(this.txtMessage).fill(message);
  }
}

module.exports = { ReportFeedback };
