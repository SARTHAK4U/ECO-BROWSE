
from urllib.parse import urlparse
import csv
from Firebase_Handler import create_Website_document

# 1 GB data = 11 gm CO2e
def calculate_emission(bytes):
    return bytes * 11 / 1000000000

# Read CSV File
with open('final.csv', 'r') as file:
    reader = csv.reader(file)
    next(reader)
    for row in reader:
        Website_Data = {
            "Domain" : urlparse(row[0]).netloc,
            "Overall_Emission" : calculate_emission(int(row[1]) + int(row[2])),
            "Category" : row[3]
        }
        create_Website_document(Website_Data)