var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/IOS";

/* GET home page. */
router.get('/', function (req, res, next) {
    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('placeInfo');
        coll.insertOne({
                id:"3333",
            street:"40640 Sutro St",
            city:"hayward",
            state:"CA",
            zipcode:"94538",
            property:"apartment",
            rooms:"7",
            price:"3333.99",
            phone:"5103313862",
            email:"479331977@gmail.com",
            description:"3333"
            },
            function (err, place) {

                if (place) {
                    console.log("mongodb success");
                } else {
                    console.log(err);
                }
            });
    });
    res.render('index', {title: 'Express'});
});

module.exports = router;
