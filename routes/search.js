var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/IOS";
var placeList = [];

function generateUuid() {
    return Math.random().toString() + Math.random().toString()
        + Math.random().toString();
}
/* GET home page. */
router.post('/', function (req, res, next) {
    var searchTxt = req.param("searchTxt");
    var locationTxt = req.param("locationTxt");
    var propertyType = req.param("propertyType");
    console.log(req.getParameter);
    var response = {};

    mongo.connect(mongoURL, function () {
        console.log('Connected to mongo at: ' + mongoURL);
        var coll = mongo.collection('placeInfo');
        console.log(1);
        coll.find({
            property: propertyType
        }).toArray(
            function (err, place) {

                if (place) {
                    console.log("mongodb success");
                    response.code = "success";
                    for (var i = 0; i < place.length; i++) {
                        var placeInfo = {
                            "id": place[i].id,
                            "brief":place[i].brief,
                            "street": place[i].street,
                            "city": place[i].city,
                            "state": place[i].state,
                            "zipcode": place[i].zipcode,
                            "property": place[i].property,
                            "rooms": place[i].rooms,
                            "price": place[i].price,
                            "phone":place[i].phone,
                            "email":place[i].email,
                            "description":place[i].description
                        };
                        placeList.push(placeInfo);
                    }
                    console.log(placeList);
                    response.value = placeList;
                    res.send(response);
                    placeList=[]
                } else {
                    console.log(err);
                }
            });
        console.log("2");
    });

})
;

module.exports = router;
