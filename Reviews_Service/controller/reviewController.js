var response = require('../response.js');
var con = require('../config/database.js');

exports.index = function(req, res){
    response.ok('Aplikasi berjalan', res)
}

//get all review data
exports.showAllReview = function(req, res){
    con.query("SELECT * FROM reviewproduct", function(err, rows, fields){
        if(err){
            console.log(err);
        } else {
            response.ok(rows, res)
        }
    });
};

//get review by id
exports.showReviewProduct = function(req, res){
    let id = req.params.id;
    con.query("SELECT * FROM reviewproduct WHERE product_id =?", [id],
        function(err, rows, fields){
            if(err){
                console.log(err);
            } else {
                response.ok(rows, res)
            }
        });
};