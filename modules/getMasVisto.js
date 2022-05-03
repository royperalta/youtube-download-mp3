const { chromium } = require('playwright')

async function getDataMasVisto(canal) {
    try {
        const browser = await chromium.launch({ headless: true });
        const page = await browser.newPage({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
            timeout: 0
        })
        console.log(canal)
        await page.goto(`${canal}/videos?view=0&sort=p&flow=grid`)
        await page.evaluate(() => {
            window.scrollTo(0, 2000)
        })
        await page.waitForTimeout(2000)
        await page.evaluate(() => {
            window.scrollTo(0, 4000)
        })
        await page.waitForTimeout(2000)
        await page.evaluate(() => {
            window.scrollTo(0, 5000)
        })
        await page.waitForTimeout(2000)
        page.waitForSelector('ytd-grid-video-renderer')
        //const rows = page.locator('ytd-grid-video-renderer')
        const rows = page.locator('ytd-grid-video-renderer>div>ytd-thumbnail>a')
        const count = await rows.count()

        console.log(count)
        await page.waitForSelector('ytd-grid-video-renderer>div>ytd-thumbnail>a')
        return await rows.evaluateAll(list => list.map(element => element.getAttribute('href')));
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = getDataMasVisto;