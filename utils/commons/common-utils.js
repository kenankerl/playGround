const { expect } = require('@playwright/test')
const moment = require('moment-timezone')

class CommonUtils {
  constructor(page) {
    this.page = page
  }

  async delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time))
  }

  async waitForElementToBeHidden(element, timeout) {
    const isHidden = await this.page.locator(element).isHidden()
    if (isHidden) {
      // If the element is already hidden, skip waiting
      console.log(`${element} is now hidden`)
      return
    }

    const waitForParams = { state: 'hidden' }
    if (timeout) waitForParams.timeout = timeout
    await this.assertElement([element])
    await this.page.locator(element).waitFor(waitForParams)
    expect(await this.page.locator(element)).toBeHidden()
  }

  async assertElement(elements) {
    //allows you to check if the element is visible
    for (let i = 0; i < elements.length; i++) {
      await expect(this.page.locator(elements[i]), `Error: The element ${elements[i]} was not visible.`).toBeVisible()
      try {
        await this.page.locator(elements[i]).scrollIntoViewIfNeeded()
      } catch (e) {
        console.log(`Unable to scroll into elements view.`)
      }

      if (await this.page.locator(elements[i]).isVisible()) {
        await this.highlight(await this.page.locator(elements[i]), true)
      }
    }
  }

  async assertElementVisibility(elements, visibility) {
    //assert locator visibility can be set as true or false
    for (let i = 0; i < elements.length; i++) {
      if (visibility == true) {
        await this.assertElement([elements[i]])
      } else if (visibility == false) {
        await expect(this.page.locator(elements[i])).not.toBeVisible()
      }
    }
  }

  async highlight(locator, flag) {
    //highlight the target element
    try {
      if (flag == true) {
        await locator.evaluate((element) => (element.style.border = '3px solid green'))
      } else {
        await locator.evaluate((element) => (element.style.border = '0px'))
      }
    } catch (e) {
      console.log(`Error: The element to highlight "${locator}" was not found.`)
      throw e
    }
  }

  async takeScreenshot(featureName, testName) {
    await this.page.screenshot({
      path: `screenshots/${featureName}/${testName}.png`,
    })
    //  this screenshot function will automatically inherit fileName and ScenarioName to be used for screenshot directory
  }

  async generateFormattedTimestamp() {
    return moment().tz('Asia/Manila').format('DD-MM-YYYY')
  }
}

module.exports = { CommonUtils }
