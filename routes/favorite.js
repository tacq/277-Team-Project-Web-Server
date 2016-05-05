var express = require('express');
var router = express.Router();
var mongo = require("./mongo");
var mongoURL = "mongodb://localhost:27017/IOS";

router.post('/', function (req, res, next) {
    var id = req.param("id");
    var favorited = req.param("favorited");
    var username = req.param("username");
    console.log(id + " " + username + " " + favorited);
    var response = {};

    mongo.connect(mongoURL, function () {
        var coll = mongo.collection('favorite');
        if (favorited == 0) {
            coll.findOne({username: username}, function (err, favorite) {
                console.log(favorite);
                if (favorite == null) {
                    console.log("new user created");
                    coll.insertOne({
                        username: username,
                        favoriteList: [id]
                    }, function (err, favorite) {
                        if (err) {
                            console.log("favorite Failed");
                            response.code = "Fail";
                            response.value = "Failed favorite";
                            response.favorite = "0";
                        } else {
                            console.log("favorite Success");
                            response.code = "Success";
                            response.value = "Succes favorite";
                            response.favorite = "1";
                        }
                        res.send(response)
                    });

                } else if (favorite != null) {
                    console.log("update user's favorite");
                    coll.update({username: username}, {$push: {favoriteList: id}}, function (err, favoriteList) {
                        if (err) {
                            console.log("push Failed");
                            response.code = "Fail";
                            response.value = "push favorite";
                            response.favorite = "0";
                        } else {
                            console.log("push Success");
                            response.code = "Success";
                            response.value = "Success push";
                            response.favorite = "1";
                        }
                        res.send(response);
                    });
                }
            });
        } else if (favorited == 1) {
            console.log("remove user's favorite");
            coll.update({username: username}, {$pop: {favoriteList: id}}, function (err, favoriteList) {
                if (err) {
                    console.log("pop Failed");
                    response.code = "Fail";
                    response.value = "pop favorite";
                    response.favorite = "1";
                } else {
                    console.log("pop Success");
                    response.code = "Success";
                    response.value = "pop favorite";
                    response.favorite = "0";
                }
                res.send(response);
            });
        }

    });

});

module.exports = router;
/**
 * Created by Lee on 5/2/16.
 */
