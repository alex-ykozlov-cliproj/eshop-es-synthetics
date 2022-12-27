const { journey, step, expect } = require('@elastic/synthetics');

journey('Wisdm Journey', async ({ page, context }) => {
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
    step('Search cars', async () => {
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