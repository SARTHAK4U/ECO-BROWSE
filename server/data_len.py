
import requests
import pandas as pd
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
url = "https://www.amazon.com"

df = pd.read_csv('website_classification.csv')
# print(df.head()['website_url'])

results = {}

for url in df['website_url']:
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
        driver.quit()
    except:
        print(url)

print(results)
df = pd.DataFrame(list(results.items()), columns=['URL', 'Data'])
df.to_csv('file1.csv', index=False)
