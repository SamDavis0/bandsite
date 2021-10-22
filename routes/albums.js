const express = require('express');
const router = express.Router();
const dataFile = require('../data/data.json')

let pageAlbums = dataFile.albums;

router.get('/albums', (req, res) => {
    
    let pageCover = []

    pageAlbums.forEach(albumObj =>{
        pageCover = pageCover.concat(albumObj.artwork)
    })
    res.render('albums', {
        showDetails: false,
        cover: pageCover,
        albums: pageAlbums,
        pageTitle: "Albums"
    })
})


router.get('/albums/:albumid', (req, res) => {
    
    let albumid = req.params.albumid
    let covers = [];
    let songs = [];

    pageAlbums.forEach(albumObj => {
        if(albumObj.id == albumid){
            covers = [...albumObj.artwork]
            songs.push(albumObj)
        }
    })
    console.log(songs);
    res.render('albums', {
        showDetails: true,
        cover: covers,
        albums: songs,
        title: songs[0].name
    })
})

module.exports = router;