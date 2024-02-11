var express = require('express'),
    router = express.Router();
const fetch = require('node-fetch')
const {createWriteStream} = require("fs");
const { error } = require('console');

router.get('/', (req, res) => {
    var url = req.query.url,
        mhbs58 = req.query.mhbs58;
    if(url){
        console.log('mhbs58: '+mhbs58)
        console.log("undecoded: "+url)
        var imgfile = './img/img_'+mhbs58+'_'+Date.now()+'.png'
        fetch(url).then((actual) => {
            actual.headers.forEach((v, n) => res.setHeader(n, v));
            actual.body.pipe(createWriteStream(imgfile).on('error', (e) => {
                console.error(error);
                res.json(error)}));
            actual.body.pipe(res);
        }).catch(error=>{
            console.error(error);
            res.json(error)
        })
    }else{
        res.send('nothing')
    }
})

module.exports = router;