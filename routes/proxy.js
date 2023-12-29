var express = require('express'),
    router = express.Router();
const fetch = require('node-fetch')
const {createWriteStream} = require("fs");

router.get('/', (req, res) => {
    var url = req.query.url,
        mh = req.query.mh;
    if(url){
        console.log("undecoded: "+url)
        //url = decodeURIComponent(url)
        //console.log(url)
        try {
            var imgfile = './img/img_'+mh+'_'+Date.now()+'.png'
        fetch(url).then((actual) => {
            actual.headers.forEach((v, n) => res.setHeader(n, v));
            actual.body.pipe(createWriteStream(imgfile));
            actual.body.pipe(res);
        });}catch (error){
            console.error(error);
            res.error(error)
        }
    }else{
        res.send('nothing')
    }
})

module.exports = router;
