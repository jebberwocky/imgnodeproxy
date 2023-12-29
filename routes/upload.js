var express = require('express'),
    router = express.Router();

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

module.exports = router;