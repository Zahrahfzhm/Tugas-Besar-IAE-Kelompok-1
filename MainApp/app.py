from flask import Flask, jsonify
import requests
from flask import render_template

app = Flask(__name__)

#products
#def get_product(product_id):
 #   response = requests.get(f'http://localhost:5000/products/{product_id}')
  #  return response.json()

#users
def get_users(user_id):
    response = requests.get(f'http://localhost:5001/users/{user_id}')
    return response.json()


#reviews
def get_reviews(product_id):
    response = requests.get(f'http://localhost:5003/reviews/{product_id}')
    return response.json()

@app.route('/products/<int:product_id>')
def get_product_info(product_id, user_id):
    #product_review = get_reviews(product_id)
    user_data = get_users(user_id)  # Assuming you have a user_id
    #return render_template('index.html', reviews=product_review, user=user_data)

    #get_product
    #product_info = get_product(product_id)

    #get_reviews
    product_review = get_reviews(product_id)

    #return product_review
    return render_template('index.html', reviews = product_review, user = user_data)

if __name__ == '__main__':
    app.run(debug=True, port=5004)