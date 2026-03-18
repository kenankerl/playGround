const { expect } = require('@playwright/test');
const moment = require('moment-timezone');

class CommonUtils {
  constructor(page) {
    this.page = page;
  }

  async delay(time) {
    return new Promise((resolve) => setTimeout(resolve, time));
  }

  async waitForElementToBeHidden(element, timeout) {
    const locator = this.page.locator(element);
    if (await locator.isHidden()) {
      console.log(`${element} is now hidden`);
      return;
    }
    const waitForParams = { state: 'hidden' };
    if (timeout) waitForParams.timeout = timeout;
    await locator.waitFor(waitForParams);
  }

  async assertElement(elements) {
    for (const selector of elements) {
      const locator = this.page.locator(selector);
      await expect(locator, `Error: The element ${selector} was not visible.`).toBeVisible();
      try {
        await locator.scrollIntoViewIfNeeded();
      } catch (e) {
        console.log(`Unable to scroll into elements view.`);
      }
      await this.highlight(locator, true);
    }
  }

  async assertElementVisibility(elements, visibility) {
    for (const selector of elements) {
      if (visibility === true) {
        await this.assertElement([selector]);
      } else if (visibility === false) {
        await expect(this.page.locator(selector)).not.toBeVisible();
      }
    }
  }

  async highlight(locator, flag) {
    try {
      if (flag) {
        await locator.evaluate((element) => (element.style.border = '3px solid green'));
      } else {
        await locator.evaluate((element) => (element.style.border = '0px'));
      }
    } catch (e) {
      console.log(`Error: The element to highlight "${locator}" was not found.`);
      throw e;
    }
  }

  async takeScreenshot(featureName, testName) {
    await this.page.screenshot({
      path: `screenshots/${featureName}/${testName}.png`,
    });
  }

  async generateFormattedTimestamp() {
    return moment().tz('Asia/Manila').format('MM-DD-YYYY');
  }
}

module.exports = { CommonUtils };
