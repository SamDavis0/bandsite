const express = require('express');
const router = express.Router();
const dataFile = require('../data/data.json')

let pageAlbums = dataFile.albums;

router.get('/', (req, res) => {
    
    let pageCover = []

    pageAlbums.forEach(albumObj =>{
        pageCover = pageCover.concat(albumObj.artwork)
    })
    res.render('index', {
        cover: pageCover,
        albums: pageAlbums,
        pageTitle: "Albums"
    })
})

module.exports = router;