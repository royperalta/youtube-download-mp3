const links = require('./modules/getPlayList')
const consulta = require('./modules/client')
const descargarPlaywright = require('./modules/descargar')

async function procesarPlayList(canalYoutube) {
   
    try {
        console.log(canalYoutube)
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
  

module.exports = procesarPlayList