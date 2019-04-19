import csv

resultdict = {}

with open('SuburbData2018.csv') as csv_file:
    csv_reader = csv.reader(csv_file, delimiter=',')
    line_count = 0
    for row in csv_reader:
        if line_count != 0:

            suburb = row[0].split("(")[0].rstrip()

            if suburb in resultdict:
                resultdict[suburb] += sum([int(i) for i in row[3:]])
            else:
                resultdict[suburb] = sum([int(i) for i in row[3:]])
        line_count += 1

for k, v in resultdict.iteritems(): 
    print('{0}, {1}'.format(k, v))