const { chromium } = require('playwright')

async function getDataYoutube(canal) {
    console.log(canal)
    try {
        const browser = await chromium.launch({ headless: false });
        const page = await browser.newPage({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
            timeout: 0
        })
        await page.goto(`${canal}`)
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
        page.waitForSelector('ytd-playlist-panel-video-renderer>[class="yt-simple-endpoint style-scope ytd-playlist-panel-video-renderer"]')
        //const rows = page.locator('ytd-grid-video-renderer')
        const rows = page.locator('ytd-playlist-panel-video-renderer>[class="yt-simple-endpoint style-scope ytd-playlist-panel-video-renderer"]')
        const count = await rows.count()
        console.log(count)
        await page.waitForSelector('ytd-playlist-panel-video-renderer>[class="yt-simple-endpoint style-scope ytd-playlist-panel-video-renderer"]')
        return await rows.evaluateAll(list => list.map(element => element.getAttribute('href')));
    }
    catch (e) {
        console.log(e)
    }
}

module.exports = getDataYoutube;