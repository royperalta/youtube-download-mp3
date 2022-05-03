const { chromium } = require('playwright')

async function getDataYoutube(canal) {   
    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
        timeout: 0
    })
    await page.goto(`${canal}/videos`)
    page.waitForSelector('ytd-grid-video-renderer')
    //const rows = page.locator('ytd-grid-video-renderer')
    const rows = page.locator('ytd-grid-video-renderer>div>ytd-thumbnail>a')
    const count = await rows.count()
    console.log(typeof rows)
    console.log(count)
    await page.waitForSelector('ytd-grid-video-renderer>div>ytd-thumbnail>a')
    const textos = await rows.evaluateAll(list => list.map(element => element.getAttribute('href')));   
    
    return textos    
}

module.exports = getDataYoutube;