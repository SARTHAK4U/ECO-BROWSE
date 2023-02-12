# EcoBrowse
EcoBrowse - Show Carbon Emissions caused by using multiple websites

# Demo Video
https://user-images.githubusercontent.com/64270972/218290874-681d5239-fa74-47bd-8c9c-af0758616b58.mp4

# Methodology Followed:

#### step 1: Our first task was to extract base values of carbon emission for various urls so we used the kaggle dataset (DMOZ dataset). This will be used to fetch initial values and will help in initial recommendation of websites with lesser carbon emission.

#####       Selenium is used to make request and fetch the data

#### step 2 : Training of machine learning model, which will be used to make predictions of categories of unknown websites so that we can make recommendations in similar categories of better websites.

#####         GridSearchCV used on various models to pick best models

#### step 3 : Creation of flask server to serve requests regarding recommendations and predictions

#### step 4 : Setting up of firebase to store details of user's activity and updating emission rate of website

#####         we do not ask users to authenticate as doing so will breach their privacy. We generate a unique token and store in their storage which is used as id to store value on firebase. Thus making impossible to map IDs with individual users.

#### step 5: Developing User Interface of analytics and recommendations site which will provide all the information (covering brownie points as well ) to the users

#####         ReactJS framework is used

#### step 6 : Developing browser extention which is done using HTML/CSS/JS and bootstrap and using various APIs, libraries provided by the browser

#### ALL THE RESULTS CAN BE SEEN IN UPLOADED VIDEOs SEVERAL CORNER CASES LIKE SWITCHING OF TABS, RELOADING, BROWSER EXIT ETC HAS BEEN COVERED BY US

