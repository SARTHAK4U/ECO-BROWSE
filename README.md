# EcoBrowse

EcoBrowse - Show Carbon Emissions caused by using multiple websites

## Demo Video

https://user-images.githubusercontent.com/64270972/218290874-681d5239-fa74-47bd-8c9c-af0758616b58.mp4

## Methodology Followed:

Step 1 : Our first task was to extract base values of carbon emission for various urls so we used the kaggle dataset (DMOZ dataset). This will be used to fetch initial values and will help in initial recommendation of websites with lesser carbon emission.

`Selenium is used to make request and fetch the data`

Step 2 : Training of machine learning model, which will be used to make predictions of categories of unknown websites so that we can make recommendations in similar categories of better websites.

`GridSearchCV used on various models to pick best models`

Step 3 : Creation of flask server to serve requests regarding recommendations and predictions

Step 4 : Setting up of firebase to store details of user's activity and updating emission rate of website

`We do not ask users to authenticate, as doing so will breach their privacy. We generate a unique token and store in their localstorage which is used as id to store value on firebase. As it is a one-way function, it is impossible to map IDs with individual users.`

Step 5 : Developing User Interface of analytics and recommendations site which will provide all the information (covering brownie points as well ) to the users

`ReactJS framework is used to develop the UI`

Step 6 : Developing browser extention which is done using HTML/CSS/JS and bootstrap and using various APIs, libraries provided by the browser

`Corner cases like switching of tabs, reloading, browser exit etc has been covered by us`

