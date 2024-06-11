const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const con = require('./config/database.js');

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json)
//app.use(express.json());

var routes = require('./router/reviewRoutes.js');
routes(app);

// app.get('/reviews', (req, res) => {
//     var sql = "SELECT * FROM reviewproduct";
//     con.query(sql, (err, result) => {
//         if (err) {
//             console.log (err);
//             res.error(err.sqlMessage, res);
//         } else {
//             res.status(200).json({
//                 "message": "Berhasil menampilkan data",
//                 "data": result
//             });
//         }
//     });
// });

// app.get('/reviews/:product_id', (req, res) => {
//     const productId = parseInt(req.params.product_id)
//     var sql = "SELECT * FROM reviewproduct WHERE product_id="+productId;
//     con.query(sql, (err, result)=>{
//         if (err) {
//             console.log(err);
//             res.error(err.sqlMessage, res);
//         } else {
//             res.status(200).json({
//                 "message": "Berhasil menampilkan data",
//                 "data": result
//             });
//         }
//     });
// });

// app.post('/addReview', function (req, res) {
//     console.log(req.body);
//     const param = req.body;
//     const userId = param.user_id;
//     const productId = param.product_id;
//     const review = param.review;
    
//     var sql = "INSERT INTO reviewproduct (user_id, product_id, review) VALUES (?, ?, ?)";
//     con.query(sql, [userId, productId, review], (err, result) => {
//         if (err) {
//             console.log(err);
//             res.status(500).json({
//                 "message": sqlMessage
//             });
//         } else {
//             res.status(200).json({
//                 "message": "Berhasil menyimpan data",
//                 "data": result
//             });
//         }
//     });
// })

// app.post('/updateReview', function(req, res){
//     const param = req.body;
//     const id= param.id;
//     const userId = param.user_id;
//     const productId = param.product_id;
//     const review = param.review;

//     var sql = "UPDATE reviewproduct  SET user_id = ?, product_id = ?, review = ? WHERE id = ? AND deleted_at IS NULL";
//     con.query(sql, [userId, productId, review, id], (err, result) =>{
        
//     });
// })

app.listen(5003, () => {
    console.log("Server started on 5003")
})