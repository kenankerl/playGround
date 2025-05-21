const { test } = require('@playwright/test')
const { ENV } = require('../utils/setup/env')
const { Components } = require('../utils/modules/component-pageObject')
const { ReportFeedback } = require('../utils/modules/reportFeedback-pageObject')
const { CommonUtils } = require('../utils/commons/common-utils')
const UserInfo = require('../test-data/UserInfo.json')
let page, envUtil, dateToday

/** 
Test case 1:
From the home page go to contact page
Click submit button
Verify error messages
Populate mandatory fields
Validate errors are gone
*/

test.describe('User to validate that the message error will be gone after populating the mandatory fields @smoke @report', () => {
  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({})
    await context.clearCookies()
    page = await context.newPage()

    const commonUtils = new CommonUtils(page)
    dateToday = await commonUtils.generateFormattedTimestamp()
  })

  test('User to validate that the message error will be gone after populating the mandatory fields', async () => {
    await test.step('the user has accessed the landing page', async () => {
      envUtil = new ENV()
      await page.goto(envUtil.getBaseUrl())
    })

    await test.step('the user clicks the contact button on the headers parts', async () => {
      const components = new Components(page)
      await page.locator(components.btnContact).click()
    })

    await test.step('the user clicks the submit button', async () => {
      const reportFeedback = new ReportFeedback(page)
      await page.locator(reportFeedback.btnSubmit).click()
    })

    await test.step('User should be able to see the validation errors', async () => {
      const reportFeedback = new ReportFeedback(page)
      const commonUtils = new CommonUtils(page)
      await commonUtils.assertElement([reportFeedback.errorlbForenameRequired, reportFeedback.errorlbEmailRequired, reportFeedback.errorlbMessageRequired])
      await commonUtils.takeScreenshot(`reportFeeback - ${dateToday}`, `User should be able to see the validation errors`)
    })

    await test.step('User have populated all fields', async () => {
      const reportFeedback = new ReportFeedback(page)
      await reportFeedback.populateContactFields(UserInfo.userOne.fName, UserInfo.userOne.lName, UserInfo.userOne.emailAdd, UserInfo.userOne.tPNumber, UserInfo.userOne.message)
    })

    await test.step('Validate that all of the message errors are gone', async () => {
      const reportFeedback = new ReportFeedback(page)
      const commonUtils = new CommonUtils(page)
      await commonUtils.assertElementVisibility([reportFeedback.errorlbForenameRequired, reportFeedback.errorlbEmailRequired, reportFeedback.errorlbMessageRequired], false)
      await commonUtils.takeScreenshot(`reportFeeback - ${dateToday}`, `Validate that all of the message errors are gone`)
    })
  })

  /** 
  Test case 2:
  1. From the home page go to contact page
  2. Populate mandatory fields
  3. Click submit button
  4. Validate successful submission message
*/

  test('User should be able to succesfully submit a message', async () => {
    await test.step('the user has accessed the landing page', async () => {
      envUtil = new ENV()
      await page.goto(envUtil.getBaseUrl())
    })

    await test.step('the user clicks the contact button on the headers parts', async () => {
      const components = new Components(page)
      await page.locator(components.btnContact).click()
    })

    await test.step('User have populated all fields', async () => {
      const reportFeedback = new ReportFeedback(page)
      await reportFeedback.populateContactFields(UserInfo.userOne.fName, UserInfo.userOne.lName, UserInfo.userOne.emailAdd, UserInfo.userOne.tPNumber, UserInfo.userOne.message)
      await page.locator(reportFeedback.btnSubmit).click()
    })

    await test.step('User seen the animation for sending feedback', async () => {
      const reportFeedback = new ReportFeedback(page)
      const commonUtils = new CommonUtils(page)
      await commonUtils.assertElement([reportFeedback.lblSendingFeedback])
    })

    await test.step('User should be able to successfully submit a feedback', async () => {
      const reportFeedback = new ReportFeedback(page)
      const commonUtils = new CommonUtils(page)
      await commonUtils.waitForElementToBeHidden(reportFeedback.lblSendingFeedback, 300000)
      await commonUtils.assertElement([reportFeedback.lblSuccessFeedback])
      await commonUtils.takeScreenshot(`reportFeeback - ${dateToday}`, `User should be able to successfully submit a feedback`)
    })
  })

  test.afterEach(async ({ browser }) => {
    await page.close()
  })
})
