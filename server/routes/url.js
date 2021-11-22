const express = require('express')
const validUrl = require('valid-url')
const shortid = require('shortid')
const router = express.Router()

const Url = require('../models/UrlModel')

// @route    POST /api/url/shorten
// @description     Create short URL

const baseUrl = 'http://localhost:5000'

router.post('/shorten', async (req, res) => {
    const {
        longUrl
    } = req.body 

    if (!validUrl.isUri(baseUrl)) {
        return res.status(401).json('Invalid base URL')
    }

    const urlCode = shortid.generate()

    if (validUrl.isUri(longUrl)) {
        try {
            let url = await Url.findOne({
                longUrl
            })

            if (url) {
                url.count_short = url.count_short + 1
                await url.save()
                res.json(url)
            } else {
                const shortUrl = baseUrl + '/' + urlCode
                count_short = 1
                count_access = 0
                
                url = new Url({
                    longUrl,
                    shortUrl,
                    urlCode,
                    count_short,
                    count_access,
                    date: new Date()
                })
                await url.save()
                res.json(url)
            }
        }
        catch (err) {
            console.log(err)
            res.status(500).json('Server Error')
        }
    } else {
        res.status(401).json('Invalid longUrl')
    }
})

module.exports = router