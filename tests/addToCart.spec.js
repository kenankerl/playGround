const { test } = require('@playwright/test')
const { ENV } = require('../utils/setup/env')
const { Components } = require('../utils/modules/component-pageObject')
const { ShopItems } = require('../utils/modules/shop-pageObject')
const { CommonUtils } = require('../utils/commons/common-utils')
const { Carts } = require('../utils/modules/cart-pageObject')
const Items = require('../test-data/Items.json')

let page, envUtil, dateToday

/**
Test case 3:
Buy 2 Stuffed Frog, 5 Fluffy Bunny, 3 Valentine Bear
Go to the cart page
Verify the subtotal for each product is correct
Verify the price for each product
Verify that total = sum(sub totals)
*/

test.describe('User should be able to see the correct computation for added item on his/her Cart @smoke', () => {
  let stuffFrogSubtotal
  let fullBunnySubtotal
  let valentineBearSubtotal

  let StuffedFrogUnit = '2'
  let FluffyBunnyUnit = '5'
  let ValentineBearUnit = '3'

  test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext({})
    await context.clearCookies()
    page = await context.newPage()

    const commonUtils = new CommonUtils(page)
    dateToday = await commonUtils.generateFormattedTimestamp()
  })

  test('User should be able to see the correct computation for added item on his/her Cart', async () => {
    await test.step('the user has accessed the landing page', async () => {
      envUtil = new ENV()
      await page.goto(envUtil.getBaseUrl())
    })

    await test.step('the user clicks the shop button on the headers parts', async () => {
      const components = new Components(page)
      await page.locator(components.btnShop).click()
    })

    await test.step('the users added item on his/her cart', async () => {
      const shopItems = new ShopItems(page)
      await page.locator(shopItems.btnAddItemIntoCart(Items.itemStuffedFrog.Name)).click()
      await page.locator(shopItems.btnAddItemIntoCart(Items.ItemFluffyBunny.Name)).click()
      await page.locator(shopItems.btnAddItemIntoCart(Items.ItemValentineBear.Name)).click()
    })

    await test.step('navigates to cart page', async () => {
      const components = new Components(page)
      await page.locator(components.btnCart).click()
    })

    await test.step('Users edited the number of items', async () => {
      const carts = new Carts(page)
      await carts.editItemUnit(Items.itemStuffedFrog.Name, StuffedFrogUnit)
      await carts.editItemUnit(Items.ItemFluffyBunny.Name, FluffyBunnyUnit)
      await carts.editItemUnit(Items.ItemValentineBear.Name, ValentineBearUnit)
    })

    await test.step('Verify the computed Item is correct', async () => {
      const carts = new Carts(page)
      const commonUtils = new CommonUtils(page)
      stuffFrogSubtotal = await carts.computeItemSubtotalAmount(Items.itemStuffedFrog.Price, StuffedFrogUnit)
      fullBunnySubtotal = await carts.computeItemSubtotalAmount(Items.ItemFluffyBunny.Price, FluffyBunnyUnit)
      valentineBearSubtotal = await carts.computeItemSubtotalAmount(Items.ItemValentineBear.Price, ValentineBearUnit)

      await commonUtils.assertElement([
        carts.txtItemSubtotal(Items.itemStuffedFrog.Name, stuffFrogSubtotal),
        carts.txtItemSubtotal(Items.ItemFluffyBunny.Name, fullBunnySubtotal),
        carts.txtItemSubtotal(Items.ItemValentineBear.Name, valentineBearSubtotal),
      ])
    })

    await test.step('Verify that the total amount is correct', async () => {
      const carts = new Carts(page)
      const commonUtils = new CommonUtils(page)
      let totalAmount = await carts.computeItemTotalAmount(stuffFrogSubtotal, fullBunnySubtotal, valentineBearSubtotal)

      await commonUtils.assertElement([carts.lblTotalAmount(totalAmount)])
      await commonUtils.takeScreenshot(`addtoCart - ${dateToday}`, `User should be able to see the correct computation for added item on his her Cart`)
    })
  })

  test.afterEach(async ({ browser }) => {
    await page.close()
  })
})
