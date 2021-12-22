const PORT = 8000
const express = require('express')
const axios = require('axios')
const cheerio = require('cheerio')

const app = express()

const newsites = [
    {
        name: 'fox',
        address: 'https://www.foxnews.com/'
    },
    {
        name: 'theblaze',
        address: 'https://www.theblaze.com/'
    },
    {
        name: 'theepochtimes',
        address: 'https://www.theepochtimes.com/'
    },
    {
        name: 'breitbart',
        address: 'https://www.breitbart.com/'
    },
]


const articles = []

newsites.forEach(news => {
    axios.get(news.address)
    .then(response => {
        const html = response.data
        const $ = cheerio.load(html)

        $('a:contains("covid")', html).each(function(){
            const title = $(this).text()
            const url = $(this).attr('href')

            articles.push({
                title,
                url,
                source: news.name
            })
        })
    })
})

app.get('/', (req,res) => {
    res.json('Welcome to my backend ')
})

app.get('/news', (req,res) => {
    res.json(articles);
})

app.listen(PORT, () => console.log( `server running on PORT ${PORT}`))