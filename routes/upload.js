var express = require('express'),
    router = express.Router();

const Jimp= require("jimp"); 


router.post('/upload', (req, res) => {
    // Get the file that was set to our field named "image"
    //console.log(req.files)
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    var filename = image.name
    // Move the uploaded image to our upload folder
    image.mv('./upload/user/' + filename);
    var result  = {
        "status":"s",
        "message":"",
        "path":"/uploads/user/"+filename,
        "filename":filename
    }
    res.send(result)
});

router.post('/upload/png/forced', (req, res) => {
    // Get the file that was set to our field named "image"
    //console.log(req.files)
    const { image } = req.files;
    // If no image submitted, exit
    if (!image) return res.sendStatus(400);
    var filename = image.name
    // Move the uploaded image to our upload folder
    var destfile = './upload/user/' + filename
    image.mv(destfile,function(err) {
        if (err) {
            var result  = {
                "status":"f",
                "message":err.message
            }
            res.send(result)
        } else {
            Jimp.read(destfile, function (err, image) { 
 
                if (err) { 
                    var result  = {
                        "status":"f",
                        "message":err.message
                    }
                    res.send(result)
                }  else { 
                  image.write(destfile+".png") 
                  var result  = {
                    "status":"s",
                    "message":"",
                    "path":destfile+".png",
                    "filename":filename+".png"
                }
                res.send(result)
                } 
              })     
        }
      });
});

module.exports = router;