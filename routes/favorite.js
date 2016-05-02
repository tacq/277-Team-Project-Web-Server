var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/IOS";

router.post('/', function (req, res, next) {
    var id = req.param("id");
    var username = req.param("username");
    console.log(id+" "+username);
    var response = {};

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('favorite');
        coll.insertOne({
            username : username,
            id : id
        }, function(err, favorite) {
            if (err) {
                console.log("favorite Failed");
                response.code = "Fail";
                response.value = "Failed favorite";
            } else {
                console.log("favorite Success");
                response.code = "Success";
                response.value = "Succes favorite";
            }
            res.send(response)
        });
    });

})
;

module.exports = router;/**
 * Created by Lee on 5/2/16.
 */
