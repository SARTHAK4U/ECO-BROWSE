
import nltk
import numpy as np
import pandas as pd
import pickle as pickle
from flask import Flask
import urllib.request
from urllib.parse import urlparse
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem.wordnet import WordNetLemmatizer


nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')


app = Flask(__name__)

arr = np.load('classes.npy', allow_pickle=True)
tf_idf_vectorizer = pickle.load(open("vectorizer.pk", "rb"))
model_clf = pickle.load(open("predictor.pk", "rb"))


def fetch_meta_desc(url):
    response = urllib.request.urlopen(url)
    soup = BeautifulSoup(response, 'html.parser',
                         from_encoding=response.info().get_param('charset'))
    results = ''
    try:
        if soup.findAll("meta", attrs={"name": "description"}):
            results += soup.find("meta",
                                 attrs={"name": "description"}).get("content")
    except:
        print("error in description")

    try:
        if soup.findAll("title"):
            results += ' '
            results += soup.find("title").string
    except:
        print("error in title")
    return results


@app.route('/')
def predict_value(str='https://makaan.com/'):
    test = fetch_meta_desc(str).lower()
    print(test)
    test = word_tokenize(test)
    test = [i for i in test if i not in stopwords.words('english')]
    # print(test)
    wordnetlemmatizer = WordNetLemmatizer()
    test = [wordnetlemmatizer.lemmatize(i) for i in test]
    test = ' '.join(test)
    test = tf_idf_vectorizer.transform([test])
    test = pd.DataFrame(
        test.toarray(), columns=tf_idf_vectorizer.get_feature_names())
    res = model_clf.predict(test)
    return arr[res[0]]
    # return (test)


# main driver function
if __name__ == '__main__':
    app.run()
