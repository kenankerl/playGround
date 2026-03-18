const { test: base } = require('@playwright/test');
const { CommonUtils } = require('../commons/common-utils');
const { Components } = require('../modules/component-pageObject');
const { ShopItems } = require('../modules/Shop-pageObject');
const { Carts } = require('../modules/Cart-pageObject');
const { ReportFeedback } = require('../modules/reportFeedback-pageObject');

const test = base.extend({
  page: async ({ browser }, use) => {
    const context = await browser.newContext({});
    await context.clearCookies();
    const page = await context.newPage();
    await use(page);
    await page.close();
  },

  dateToday: async ({ page }, use) => {
    const commonUtils = new CommonUtils(page);
    const dateToday = await commonUtils.generateFormattedTimestamp();
    await use(dateToday);
  },

  commonUtils: async ({ page }, use) => {
    await use(new CommonUtils(page));
  },

  components: async ({ page }, use) => {
    await use(new Components(page));
  },

  shopItems: async ({ page }, use) => {
    await use(new ShopItems(page));
  },

  carts: async ({ page }, use) => {
    await use(new Carts(page));
  },

  reportFeedback: async ({ page }, use) => {
    await use(new ReportFeedback(page));
  },
});

const { expect } = base;

module.exports = { test, expect };
