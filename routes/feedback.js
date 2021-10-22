const express = require('express');
const router = express();

router.use(express.json());
router.use(express.urlencoded({extended: true}))


const fs = require('fs')

const feedbackData = require('../data/feedback.json')



router.get('/feedback', (req, res) => {
    
    res.render('feedback')
})

router.get('/api', (req, res) => {
    
    res.json(feedbackData)
})

router.post('/api', (req, res) => {
    
    let {name, message} = req.body;

    console.log(req.body);

    feedbackData.unshift(req.body)

    fs.writeFile('data/feedback.json', JSON.stringify(feedbackData), 'utf8', (err) => {
        
        if(err){
            console.log(err);
        }
        console.log('feedback.json file has been updated');
    })
    res.json(feedbackData)
})

module.exports = router;