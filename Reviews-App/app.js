const express = require('express')
const app = express();
const conn = require('./config/database')

app.get('/reviews', (req, res) => {
    var sql = "SELECT * FROM reviewproduct";
    conn.query(sql, (err, result) => {
        if (err) {
            console.log (err);
            res.error(err.sqlMessage, res);
        } else {
            res.status(200).json({
                "message": "Berhasil menampilkan seluruh review",
                "data": result
            });
        }
    });
});

app.get('/reviews/:product_id', (req, res) => {
    const productId = parseInt(req.params.product_id)
    var sql = "SELECT * FROM reviewproduct WHERE product_id="+productId;
    conn.query(sql, (err, result)=>{
        if (err) {
            console.log(err);
            res.error(err.sqlMessage, res);
        } else {
            res.status(200).json(result
                // "message": "Berhasil menampilkan review product",
                // "data": result
            );
        }
    });
});

app.use(express.json());

app.post('/create-review', (req, res) => {
    console.log(req.body);
    const param = req.body;
    const userId = param.user_id;
    const productId = param.product_id;
    const review = param.review;
    
    var sql = "INSERT INTO reviewproduct (user_id, product_id, review) VALUES (?, ?, ?)";
    conn.query(sql, [userId, productId, review], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "message": err.sqlMessage
            });
        } else {
            res.status(200).json({
                "message": "Berhasil menyimpan review",
                "data": result
            });
        }
    });
})

app.post('/edit-review', function(req, res){
    const param = req.body;
    const id = param.id;
    // const userId = param.user_id;
    // const productId = param.product_id;
    const review = param.review;

    var sql = "UPDATE reviewproduct  SET review = ? WHERE id = ?";
    conn.query(sql, [review, id], (err, result) =>{
        if (err) {
            console.log(err);
            res.status(500).json({
                "message": err.sqlMessage
            });
        } else {
            res.status(200).json({
                "message": "Berhasil memperbarui review",
                "data": result
            });
        }
    });
})

app.delete('/delete-review', (req, res) => {
    const param = req.body;
    const id = param.id;

    var sql = "DELETE FROM reviewproduct WHERE id = ?";
    conn.query(sql, [id], (err, result) =>{
        if (err) {
            console.log(err);
            res.status(500).json({
                "message": err.sqlMessage
            });
        } else {
            res.status(200).json({
                "message": "Berhasil menghapus review",
                "data": result
            });
        }
    })
})

app.listen(5003, () => {
    console.log("Server started on 5003")
})