# EcoBrowse Flask Server

from flask import Flask, request
from EcoBrowse_Firebase import *
from EcoBrowse_Helper import predict_category, get_classes
from flask_cors import CORS, cross_origin
import json

app = Flask(__name__)
CORS(app)

@app.after_request
def after_request(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization,Access-Control-Allow-Origin,Access-Control-Allow-Headers,Access-Control-Allow-Methods')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

@app.route('/')
def server_info():
    return "Welcome to EcoBrowse Server"

# Create a new user
@app.route('/create_user', methods=['GET', 'POST'])
def create_user():
    user_id = create_User_document()
    return {'userId' : user_id}

# Get user data
@app.route('/get_user', methods=['POST'])
# @cross_origin()
def get_user():
    user_id = request.form['user_id']
    user_data = get_user_document(user_id)
    return user_data

# Add Session Data
@app.route('/add_session_data', methods=['POST'])
def add_session_data():
    user_id = request.form['user_id']
    session_data = json.loads(request.form['session_data'])

    # Check if website document exists
    domain = extract_host(session_data["Path"])
    print(domain)
    if get_Website_document(domain) == None:
        create_Website_document({
            "Domain" : domain,
            "Category" : predict_category(session_data["Path"]),
            "Overall_Emission" : 0
        })
    
    add_Session_data(user_id, session_data)
    return "Success"

# Get Website Categories
@app.route('/get_website_categories', methods=['GET'])
def get_website_categories():
    return {"categories" : get_classes()}

# Get website data by Category
@app.route('/get_eco_websites', methods=['POST'])
def get_eco_websites():
    category = request.form['category']
    category_ref = websites_ref.where("Category", "==", category).order_by("Overall_Emission", direction=firestore.Query.ASCENDING).limit(10)
    websites = [doc.to_dict() for doc in category_ref.get()]
    return {"websites" : websites}

# Get Similar Website Recommendations
@app.route('/get_recommendations', methods=['POST'])
def get_recommendations():
    url = request.form['url']
    category = predict_category(url)
    category_ref = websites_ref.where("Category", "==", category).order_by("Overall_Emission", direction=firestore.Query.ASCENDING).limit(10)
    websites = [doc.to_dict() for doc in category_ref.get()]
    return {"category" : category, "websites" : websites}

# main driver function
if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)
