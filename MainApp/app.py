from flask import Flask, jsonify
import requests
from flask import render_template

app = Flask(__name__)

#products
def get_product(product_id):
    response = requests.get(f'http://localhost:5000/products/{product_id}')
    return response.json()

#all products
def get_allproduct():
    response = requests.get(f'http://localhost:5000/products')
    return response.json()

#reviews
def get_reviews(product_id):
    response = requests.get(f'http://localhost:5003/reviews/{product_id}')
    return response.json()

#addreview
# def add_review():
#     response = requests.post(f'http://localhost:5003/create-review)')
#     return response

# # @app.route('/')

# @app.route('/create-review')
# def add_review()
    

@app.route('/products/<int:product_id>')
def get_product_info(product_id):
    #get_product
    product_info = get_product(product_id)

    #get_reviews
    product_review = get_reviews(product_id)

    #return product_review
    # return product_info
    # return product_review
    return render_template('index.html', info = product_info, reviews = product_review)

@app.route('/products')
def get_list_product():
    list_product = get_allproduct()
    return render_template('listproduct.html', allproducts = list_product)

if __name__ == '__main__':
    app.run(debug=True, port=5004)