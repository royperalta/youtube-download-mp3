const { chromium } = require('playwright')
const links = require('./modules/getData')


async function validar() {
    const getLinks = await links('https://www.youtube.com/channel/UCD7KsdWNWiI5GEp9TFhqGPw/');
    console.log(getLinks)
    console.log(getLinks.length)
}

validar()


async function abrirPagina() {

    const browser = await chromium.launch({ headless: false });
    const page = await browser.newPage({
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.82 Safari/537.36',
        timeout: 0
    })
    await page.goto('https://www.youtube.com/c/MARYMUSICPRODUCCIONES/videos')
    page.waitForSelector('ytd-grid-video-renderer')
    //const rows = page.locator('ytd-grid-video-renderer')
    const rows = page.locator('ytd-grid-video-renderer>div>ytd-thumbnail>a')
    const count = await rows.count()
    console.log(typeof rows)
    console.log(count)
    await page.waitForSelector('ytd-grid-video-renderer>div>ytd-thumbnail>a')
    const textos = await rows.evaluateAll(list => list.map(element => element.getAttribute('href')));
    console.log(textos)
    await page.goto('https://yoump3.app/es4')
    await page.locator('input[type="url"]').fill("https://youtube.com" + textos[6])
    await page.locator('input[type="submit"]').click()
    await page.locator('[class="button accept"]').click()

    /*  const re = await page.click('[class="button button-download"]')
     console.log(re)
     console.log('encontrado') */
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('[class="button button-download"]')
    ]);
    console.log(download._url)
    console.log(download._suggestedFilename)
    await download.saveAs(`E:\\${download._suggestedFilename}`)


    await page.close()
    /*
    await page.locator('[class="button button-download"]').click() */
}

//abrirPagina()