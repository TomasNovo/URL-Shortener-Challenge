const express = require('express')
const router = express.Router()
const Url = require('../models/UrlModel')

// @route       GET /stats
// @description    Retrieves stats of all urls 
router.get('/stats', async (req, res) => {
    try {
        const urls = await Url.find()
        res.json(urls)
    }
    catch (err) {
        console.error(err)
        res.status(500).json('Server Error')
    }
})

module.exports = router