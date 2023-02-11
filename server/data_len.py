
import csv
import requests
import numpy as np
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options


arr = np.load('classes.npy', allow_pickle=True)
df = pd.read_csv('website_classification.csv')
# print(df.head()['website_url'])

urls = []

for category in arr[1:]:
    cat_urls = df[df.Category == category]['website_url'][:10]
    # print(cat_urls)
    for url in cat_urls:
        urls.append(url)
# print(urls)

results = {}
fields = ['url', 'recieved data', 'sent data']

f = open('data.csv', 'w', newline='', encoding='UTF8')
writer = csv.writer(f)
writer.writerow(fields)
f.flush()

for url in urls:
    print('URL : ', url)
    try:
        response = requests.get(url=url)
# the payload data in a GET request is sent in the query string of the URL.
# As a result, the sent data can be accessed from the request.url attribute of the response object,
#  which holds the complete URL that was requested,
#  including the query string with the payload data.
        sent_data = response.request.url
        sent_data_length = len(sent_data)

        driver = webdriver.Chrome('chromedriver')
        driver.get(url)

        size = driver.execute_script("""
return window.performance.getEntriesByType("resource")
  .reduce((size, entry) => size + entry.decodedBodySize, 0);
""")

        # print(f"Size of network data downloaded: {size} bytes")
        # print("Size of data sent : ", sent_data_length, ' bytes')
        results[url] = [size, sent_data_length]
        # temp = {'url': url, 'recieved data': size,
        #     'sent data': sent_data}

        writer.writerow([url, size, sent_data_length])
        f.flush()

        driver.quit()
    except:
        print(url)

# print(results)
df = pd.DataFrame(list(results.items()), columns=['URL', 'Data'])
df.to_csv('file1.csv', index=False)
f.close()
