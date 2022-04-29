const {chromium} = require('playwright')
const axios = require('axios')

async function descargar(link) {
    try {
        console.log(link)
        const browser = await chromium.launch({ headless: true});
        const page = await browser.newPage({
            userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
            timeout: 0
        })
        await page.goto('https://yoump3.app/es4')
        await page.locator('input[type="url"]').fill("https://youtube.com" + link)
        await page.waitForTimeout(3000)
        await page.locator('input[type="submit"]').click()
        await page.waitForTimeout(3000)
        await page.locator('[class="button accept"]').click()
        await page.waitForTimeout(3000)

        /*  const re = await page.click('[class="button button-download"]')
         console.log(re)
         console.log('encontrado') */
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click('[class="button button-download"]')
        ]);
        if(download.name==="TimeoutError"){
            page.close()
        }
        console.log(download._url)
        console.log(download._suggestedFilename)
        await download.saveAs(`E:\\MusicaYoutube\\${download._suggestedFilename}`)
        await axios.post('http://localhost:5000/api/post', {
            code: link,
            name: download._suggestedFilename
        })
        page.close()
    } catch (e) {
        console.log(e)
    }
}

module.exports = descargar
