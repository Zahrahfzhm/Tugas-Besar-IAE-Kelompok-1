from flask import Flask, jsonify
import requests
from flask import render_template

app = Flask(__name__)

#products
def get_product(product_id):
    response = requests.get(f'http://localhost:5000/products/{product_id}')
    return response.json()

#reviews
def get_reviews(product_id):
    response = requests.get(f'http://localhost:5003/reviews/{product_id}')
    return response.json()

@app.route('/products/<int:product_id>')
def get_product_info(product_id):
    #get_product
    product_info = get_product(product_id)

    #get_reviews
    product_review = get_reviews(product_id)

    #return product_review
    return render_template('index.html', info = product_info, reviews = product_review)

if __name__ == '__main__':
    app.run(debug=True, port=5004)