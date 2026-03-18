const { test } = require('@playwright/test');
const { ENV } = require('../utils/setup/env');
const { Components } = require('../utils/modules/component-pageObject');
const { ShopItems } = require('../utils/modules/shop-pageObject');
const { CommonUtils } = require('../utils/commons/common-utils');
const { Carts } = require('../utils/modules/Cart-pageObject');
const Items = require('../test-data/Items.json');

let page, dateToday;

/**
Test case 3:
Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
Go to the cart page
Verify the subtotal for each product is correct
Verify the price for each product
Verify that total = sum(sub totals)
*/

test.describe('User should be able to see the correct computation for added item on his/her Cart @smoke', () => {
  const cartItems = [
    { item: Items.itemStuffedFrog, unit: '2' },
    { item: Items.ItemFluffyBunny, unit: '5' },
    { item: Items.ItemValentineBear, unit: '3' },
  ];

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({});
    await context.clearCookies();
    page = await context.newPage();

    const commonUtils = new CommonUtils(page);
    dateToday = await commonUtils.generateFormattedTimestamp();
  });

  test('User should be able to see the correct computation for added item on his/her Cart', async () => {
    const carts = new Carts(page);
    const commonUtils = new CommonUtils(page);
    const components = new Components(page);
    const shopItems = new ShopItems(page);

    await test.step('the user has accessed the landing page', async () => {
      await page.goto(new ENV().getBaseUrl());
    });

    await test.step('the user clicks the shop button on the headers parts', async () => {
      await page.locator(components.btnShop).click();
    });

    await test.step('the users added item on his/her cart', async () => {
      for (const { item } of cartItems) {
        await page.locator(shopItems.btnAddItemIntoCart(item.Name)).click();
      }
    });

    await test.step('navigates to cart page', async () => {
      await page.locator(components.btnCart).click();
    });

    await test.step('Users edited the number of items', async () => {
      for (const { item, unit } of cartItems) {
        await carts.editItemUnit(item.Name, unit);
      }
    });

    const subtotals = cartItems.map(({ item, unit }) => carts.computeItemSubtotalAmount(item.Price, unit));

    await test.step('Verify the computed Item is correct', async () => {
      await commonUtils.assertElement(cartItems.map(({ item }, i) => carts.txtItemSubtotal(item.Name, subtotals[i])));
    });

    await test.step('Verify that the total amount is correct', async () => {
      const totalAmount = carts.computeItemTotalAmount(...subtotals);

      await commonUtils.assertElement([carts.lblTotalAmount(totalAmount)]);

      await commonUtils.takeScreenshot(
        `addtoCart - ${dateToday}`,
        `User should be able to see the correct computation for added item on his her Cart`,
      );
    });
  });

  test.afterEach(async () => {
    await page.close();
  });
});
