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
    var username = req.param("username");
    var response = {};

    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('placeInfo');
        coll.find({
            property: propertyType
        }).toArray(
            function (err, place) {
                if (place) {
                    response.code = "success";
                    for (var i = 0; i < place.length; i++) {
                        var placeInfo = {
                            "id": place[i].id,
                            "brief": place[i].brief,
                            "street": place[i].street,
                            "city": place[i].city,
                            "state": place[i].state,
                            "zipcode": place[i].zipcode,
                            "property": place[i].property,
                            "rooms": place[i].rooms,
                            "price": place[i].price,
                            "phone": place[i].phone,
                            "email": place[i].email,
                            "description": place[i].description
                        };
                        placeList.push(placeInfo);
                    }
                    var coll2 = mongo.collection('favorite');
                    coll2.findOne({username: username}, function (err, favorites) {
                        if (!err) {
                            console.log("1");
                            if (favorites == null) {
                                response.favorite = ["null"];
                            } else {
                                response.favorite = favorites.favoriteList;
                            }
                            response.value = placeList;
                            res.send(response);
                            placeList = []
                        } else {
                            console.log(err);
                        }
                    });
                } else {
                    console.log(err);
                }
            });
    });

})
;

module.exports = router;
