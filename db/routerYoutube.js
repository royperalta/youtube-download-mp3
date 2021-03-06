const express = require('express');
const Model = require('./youtubeModel')
const procesarAudio = require('../index')
const masvisto = require('../masvisto')
const playlist = require('../playList')
const mix= require('../mix')
const router = express.Router();

router.get('/descargar', async (req, res) => {
    try {
        const canal = JSON.stringify(req.query.canal)
        res.json(canal)
        await procesarAudio(req.query.canal.toString())
    }
    catch (e) {
        console.log(e)
    }
})
router.post('/descargar', async (req, res) => {
    try {
        const canal= req.body.canal.toString()
        res.send("descargando")      
        await procesarAudio(canal)
       
    } catch (e) {
        console.log(e)
    }
})
router.post('/descargarmix', async (req, res) => {
    try {
        const canal= req.body.canal.toString()
        res.send("descargando")      
        await mix(canal)
       
    } catch (e) {
        console.log(e)
    }
})
router.post('/masvisto', async (req, res) => {
    try {
        const canal= req.body.canal.toString()
        console.log(canal)
        res.send("descargando")      
        await masvisto(canal)
       
    } catch (e) {
        console.log(e)
    }
})

router.post('/playlist', async (req, res) => {
    try {
        const canal= req.body.canal.toString()
        console.log(canal)
        res.send("descargando")      
        await playlist(canal)
       
    } catch (e) {
        console.log(e)
    }
})

router.post('/post', async (req, res) => {

    console.log(req.body)
    const data = new Model({
        code: req.body.code,
        name: req.body.name,
    })

    try {
        console.log(data)
        const dataSaved = await data.save();
        res.status(200).json(dataSaved);

    } catch (error) {
        res.status(400).json({ message: error.message })
    }

})

router.get('/getAll', async (req, res) => {
    const data = await Model.find();
    res.status(200).json(data)
})

router.get('/getOne/:id', async (req, res) => {
    try {
        const data = await Model.findById(req.params.id)
        res.status(200).json(data)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.patch('/patch/:id', async (req, res) => {
    try {
        const id = req.params.id
        const body = req.body
        const config = { new: true }

        const dataUpdated = await Model.findByIdAndUpdate(id, body, config)
        res.status(200).json(dataUpdated)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

router.delete('/delete/:id', async (req, res) => {
    try {
        const data = await Model.findByIdAndDelete(req.params.id)
        res.send(`La informaci??n de ${data.name} fu?? borrado`)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = router;