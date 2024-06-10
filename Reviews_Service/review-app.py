from flask import Flask, jsonify

app = Flask(__name__)

reviews = [
    {"user_id":1, "product_id":1, "review":"Bagus banget"},
    {"user_id":2, "product_id":1, "review":"Bagus banget"},
    {"user_id":3, "product_id":2, "review":"Bagus banget"},
    {"user_id":3, "product_id":3, "review":"Bagus banget"}
]

@app.route('/reviews')
def get_reviews():
    return jsonify(reviews)

@app.route('/reviews/<int:product_id>')
def get_review_product(product_id):
    product_review = [review for review in reviews if review["product_id"] == product_id]

    if product_review:
        return jsonify(
            {"reviews": product_review}
        )
    else:
        return jsonify(
            {"message": "Review produk tidak ditemukan"},404
        )

if __name__ == '__main__':
    app.run(debug=True, port=5003)