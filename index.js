const links = require('./modules/getData')
const consulta = require('./modules/client')
const descargarPlaywright = require('./modules/descargar')


async function procesarAudio(canalYoutube) {
    console.log(canalYoutube)
    try {
        const getLinks = await links(canalYoutube);
        console.log(getLinks)       
        const arr = []
        await Promise.all(
            getLinks.map(async link => {
                const query = { "code": `${link}` }
                const dato = await consulta(query)
                if (dato == null) {
                    arr.push(link)
                }
            })
        )
        console.log(arr.length)
        arr.map((link, index) => {
            setTimeout(async () => {
                await descargarPlaywright(link)
            }, 60000 * index)
        })

    } catch (e) {
        console.log(e)
    }
}
  
//procesarAudio('https://www.youtube.com/c/StudioJeanCarlosHD4K')

module.exports = procesarAudio
    /* getLinks.map(async (link, index) => {
        setTimeout(async () => {
            await client.connect()
            const database = client.db("youtube")
            const datos = database.collection("datos")
            const query = { "code": `${link}` }
            const dato = await datos.findOne(query)
            console.log(dato)
            if (dato == null) {                
                    descargar(link)              
            } else {
                console.log("Ya esta descargado")
            }
        }, 60000 * index)

    }) */


    /*  getLinks.map((data, index) => {
         setTimeout(() => {
             //descargar(data)
         }, 60000 * index)
     }) */



/* async function descargar(link) {
    try {
        console.log(link)
        const browser = await chromium.launch({ headless: false });
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

        // const re = await page.click('[class="button button-download"]')
         // console.log(re)
        // console.log('encontrado')
        const [download] = await Promise.all([
            page.waitForEvent('download'),
            page.click('[class="button button-download"]')
        ]);
        console.log(download._url)
        console.log(download._suggestedFilename)
        await download.saveAs(`E:\\${download._suggestedFilename}`)
        await axios.post('http://localhost:5000/api/post', {
            code: link,
            name: download._suggestedFilename
        })
        page.close()
    } catch (e) {
        console.log(e)
    }
} */

//descargar()



/* async function abrirPagina() {

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

     //const re = await page.click('[class="button button-download"]')
    // console.log(re)
     //console.log('encontrado')
    const [download] = await Promise.all([
        page.waitForEvent('download'),
        page.click('[class="button button-download"]')
    ]);
    console.log(download._url)
    console.log(download._suggestedFilename)
    await download.saveAs(`E:\\${download._suggestedFilename}`)


    await page.close()
    
    //await page.locator('[class="button button-download"]').click()
} */
