const express = require('express')
const app = express()

const reviews = [
    {user_id:1, product_id:1, review:"Bagus banget"},
    {user_id:2, product_id:1, review:"Bagus banget"},
    {user_id:3, product_id:2, review:"Bagus banget"},
    {user_id:3, product_id:3, review:"Bagus banget"}
]

app.get('/reviews',(req, res) => {
    res.json(reviews)
})

app.get('/reviews/:product_id', (req, res) => {
    const productId = parseInt(req.params.product_id)
    const review = reviews.filter(review => review.product_id === productId)

    if(review.length > 0){
        res.json(review)
    } else {
        res.status(404).json({ error: "Review Produk Tidak Ditemukan"})
    }
})

app.listen(5003, () => {
    console.log("server berjalan")
})