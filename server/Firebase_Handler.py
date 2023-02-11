# EcoBrowse Firebase Admin SDK

import firebase_admin
from firebase_admin import credentials, firestore

cred = credentials.Certificate("ecobrowse_firebase_admin_sdk.json")
firebase_admin.initialize_app(cred)

# Cloud Firestore
firestore_db = firestore.client()
users_ref = firestore_db.collection(u'Users')
websites_ref = firestore_db.collection(u'Websites')


# User Document Operations
def create_User_document(User_Website_Data = {}):
    doc_ref = users_ref.document()
    User_Website_Data = {key.replace(".", "_") : value for key, value in User_Website_Data.items()}
    doc_ref.set({
        "Id" : doc_ref.id,
        "Overall_Emission" : 0,
        "Packets_Lost" : 0,
        "Website_Data" : User_Website_Data
    })
    return doc_ref.id

def update_user_document(doc_id, key, value):
    doc_ref = users_ref.document(doc_id)
    key = key.replace(".", "_")
    doc_ref.update({key: value})

def get_user_document(doc_id):
    doc_ref = users_ref.document(doc_id)
    doc = doc_ref.get().to_dict()
    return doc


# Website Document Operations
def create_Website_document(Website_Data = {}):
    Id = Website_Data["Domain"].replace(".", "_")
    doc_ref = websites_ref.document(Id)
    doc_ref.set(Website_Data)
    return doc_ref.id

def update_Website_document(doc_id, key, value):
    doc_ref = websites_ref.document(doc_id)
    key = key.replace(".", "_")
    doc_ref.update({key: value})

def get_Website_document(doc_id):
    doc_id = doc_id.replace(".", "_")
    doc_ref = websites_ref.document(doc_id)
    doc = doc_ref.get()
    return doc.to_dict()


# Helper Functions
def add_Website_data(user_id, session_data):
    # ----- User Document Update -----
    doc_ref = users_ref.document(user_id)
    doc_dict = doc_ref.get().to_dict()
    Domain = session_data["Path"].split("/")[0]
    Domain = Domain.replace(".", "_")

    # User Data Update
    user_overall_emission = doc_dict["Overall_Emission"] + session_data["Emission"]
    user_packets_lost = doc_dict["Packets_Lost"] + session_data["Packets_Lost"]

    # Website Data Update
    doc_dict = doc_dict["Website_Data"][Domain]
    doc_dict["Overall_Emission"] = doc_dict["Overall_Emission"] + session_data["Emission"]
    session_data_length = len(doc_dict["Session_Data"])
    doc_dict["Average_Emission"] = (doc_dict["Average_Emission"] * session_data_length + session_data["Emission"]) / (session_data_length + 1)
    doc_dict["Session_Data"].append(session_data)

    doc_ref.update({
        "Website_Data." + Domain : doc_dict,
        "Overall_Emission" : user_overall_emission,
        "Packets_Lost" : user_packets_lost,
    })


    # ----- Website Document Update -----
    doc_ref = websites_ref.document(Domain)
    website_overall_emission = doc_ref.get().to_dict()["Overall_Emission"] + session_data["Emission"]
    doc_ref.update({ "Overall_Emission" : website_overall_emission })


# Test Code
User_Website_Data = {
    "google.com" : {
        "Domain" : "google.com",
        "Average_Emission" : 0,
        "Overall_Emission" : 0,
        "Session_Data" : []
    }
}

Website_Data = {
    "Domain" : "google.com",
    "Overall_Emission" : 0,
    "Category" : "News"
}

session_data = {
    "Time" : "2020-10-10 10:10:12",
    "Path" : "google.com/search?q=ip",
    "Emission" : 70,
    "Packets_Lost" : 2
}

# user_id = create_User_document(User_Website_Data)
# create_Website_document(Website_Data)
user_id = "4TcmhkvmsbUnbkJdqdUU"
add_Website_data(user_id, session_data)

# print(create_Website_document(Website_Data))
# print(get_Website_document("google.com"))

# print(create_User_document(User_Website_Data))
# print(get_document("LA0fswpK3xzGD5Lf1Qzb"))
