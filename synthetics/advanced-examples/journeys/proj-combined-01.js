const { journey, step, expect } = require('@elastic/synthetics');

// Journey Wisdm Journey

journey('Wisdm Journey (Combined)', async ({ page, context }) => {
    step('Go to', async () => {
        await page.goto('http://frontend.wisdm-prod.20.62.178.20.nip.io/');
        await page.goto('http://frontend.wisdm-prod.20.62.178.20.nip.io/home');
    });
    step('Go to docs', async () => {
        await page.locator('text=Документи').click();
        expect(page.url()).toBe('http://frontend.wisdm-prod.20.62.178.20.nip.io/sltd');
    });
    step('Go to cars', async () => {    
        await page.locator('text=Авто').click();
        expect(page.url()).toBe('http://frontend.wisdm-prod.20.62.178.20.nip.io/smv');
    });
    step('Search docarscs', async () => {
        await page.locator('button:has-text("Пошук")').click();
    });
    step('Create cars/Cancel', async () => {
        await page.locator('button:has-text("Створити")').click();
        await page.locator('button:has-text("Cancel")').click();
    });
    step('Docs', async () => {
        await page.locator('a[role="tab"]:has-text("Документи")').click();
        expect(page.url()).toBe('http://frontend.wisdm-prod.20.62.178.20.nip.io/sltd');
    });
    step('Create doc/OK', async () => {
        await page.locator('button:has-text("Створити")').click();
        await page.locator('input[name="nr"]').click();
        await page.locator('input[name="nr"]').fill('123');
        await page.locator('button:has-text("Ok")').click();
    });
    step('Search', async () => {
        await page.locator('button:has-text("Пошук")').click();
    });
    step('Exit', async () => {
        await page.locator('button:has-text("Вихід")').click();
    });
});

// Journey eShop-webmvc Shopping Journey

journey('eShop-webmvc Shopping Journey (Combined)', async ({ page, context }) => {
  step('Go to http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc', async () => {
    await page.goto('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc');
    
  });
  step('Filter search results', async () => {
    // Filter search results
    await page.locator('select[name="BrandFilterApplied"]').selectOption('All');
    await page.locator('select[name="TypesFilterApplied"]').selectOption('2');
    await page.locator('input[type="image"]').click();
    expect(page.url()).toBe('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc');

  });
  step('Navigate to Login', async () => {
    // Navigate to Login
    await page.locator('text=Login').click();
    expect(page.url()).toMatch(/.*eshop\.04e7ca8494a9414e88e2\.centralus\.aksapp\.io\/identity\/Account\/Login.*/);

  });
  step('Login form - use OOTB login user', async () => {
    // Login form - use OOTB login user
    await page.locator('input[name="Email"]').click();
    await page.locator('input[name="Email"]').fill('ykozlov2@gmail.com');
    await page.locator('input[name="Password"]').click();
    await page.locator('input[name="Password"]').fill('Pass@word1');
    await page.locator('text=LOG IN').click();
    expect(page.url()).toBe('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc');
  });
  step('Add t-shirt to cart', async () => {
    // Add t-shirt to cart
    await page.locator('text=[ ADD TO CART ] .NET Bot Black Hoodie 19.50 >> input[type="submit"]').click();
    expect(page.url()).toBe('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc');
  });
  step('Navigate to shopping cart', async () => {
    // Navigate to shopping cart
    await page.locator('text=.NET Foundation T-shirt').click();
    await page.locator('header >> text=1').click();
    expect(page.url()).toBe('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc/Cart');
  });
  step('Do checkout', async () => {
    // Do checkout
    await page.locator('text=[ Checkout ]').click();
    expect(page.url()).toBe('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc/Order/Create');
    // Do place order
    await page.locator('text=[ PLACE ORDER ]').click();
    expect(page.url()).toBe('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc/Order');
  });
  step('Log out', async () => {
    // Click ... to continue shopping
    await page.locator('text=ykozlov2@gmail.com').click();
    await page.locator('text=Log Out').click();
    expect(page.url()).toBe('http://eshop.04e7ca8494a9414e88e2.centralus.aksapp.io/webmvc');
  });
});