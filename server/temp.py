import csv
fields = ['url', 'recieved data', 'sent data']

f = open('data.csv', 'w', encoding='UTF8')
writer = csv.writer(f)
writer.writerow(fields)
f.close()
