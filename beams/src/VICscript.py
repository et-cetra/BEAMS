import csv

resultdict = {}

with open('VICCrimeRaw.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count != 0:

            suburb = row[0].lower()

            if suburb in resultdict:
                resultdict[suburb] += int(row[1])
            else:
                resultdict[suburb] = int(row[1])
        line_count += 1

for k, v in resultdict.iteritems(): 
    print('{0}, {1}'.format(k, v))