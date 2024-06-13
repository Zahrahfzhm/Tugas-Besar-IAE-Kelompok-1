const express = require('express')
const app = express()
const conn = require('./config/db')

app.get('/products', (req, res) =>{
    var sql = "SELECT * FROM products";
    conn.query(sql, (err, result) => {
        if (err) {
            console.log (err);
            res.error(err.sqlMessage, res);
        } else {
            res.status(200).json({
                "message": "Berhasil menampilkan seluruh produk",
                "data": result
            });
        }
    });
})

app.get('/products/:id', (req, res) => { 
    const productId = parseInt(req.params.id)
    var sql = "SELECT * FROM products WHERE id=?";
    conn.query(sql, [productId], (err, result)=>{
        if (err) {
            console.log(err);
            res.status(500).json({
                "message": err.sqlMessage
            });
        } else {
            if(result.length > 0) {
                res.status(200).json({
                    "message": "Berhasil menampilkan product",
                    "data": result[0]
                });
            } else {
                res.status(404).json({
                    "message": "Product tidak ditemukan"
                });
            }
        }
    });
    
})

app.use(express.json());

app.post('/add-product', (req, res) => {
    console.log(req.body);
    const param = req.body;
    const titleBook = param.title_book;
    const description = param.description;
    const price = param.price;
    
    var sql = "INSERT INTO products (title_book, description, price) VALUES (?, ?, ?)";
    conn.query(sql, [titleBook, description, price], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({
                "message": err.sqlMessage
            });
        } else {
            res.status(200).json({
                "message": "Berhasil menambahkan produk",
                "data": result
            });
        }
    });
})

app.post('/edit-product', function(req, res){
    const param = req.body;
    const id = param.id;
    const titleBook = param.title_book;
    const description = param.description;
    const price = param.price;

    var sql = "UPDATE products  SET title_book = ?, description = ?, price =?  WHERE id = ?";
    conn.query(sql, [titleBook, description, price, id], (err, result) =>{
        if (err) {
            console.log(err);
            res.status(500).json({
                "message": err.sqlMessage
            });
        } else {
            res.status(200).json({
                "message": "Berhasil memperbarui data produk",
                "data": result
            });
        }
    });
})

app.delete('/delete-product', (req, res) => {
    const param = req.body;
    const id = param.id;

    var sql = "DELETE FROM products WHERE id = ?";
    conn.query(sql, [id], (err, result) =>{
        if (err) {
            console.log(err);
            res.status(500).json({
                "message": err.sqlMessage
            });
        } else {
            res.status(200).json({
                "message": "Berhasil menghapus produk",
                "data": result
            });
        }
    })
})

app.listen(5000, () => {
    console.log("server berjalan")
})