import os
f = open(os.path.join(os.path.dirname(__file__), 'data.txt'))
report = f.read().splitlines()

gamma = ''
epsilon = ''

for i in range(len(report[0])):
    values = []

    for line in report:
        values.append(list(line)[i])

    count0 = 0
    count1 = 0

    for value in values:
        if value == '0':
            count0 += 1
        elif value == '1':
            count1 += 1

    if count0 > count1:
        gamma += '0'
        epsilon += '1'
    else:
        gamma += '1'
        epsilon += '0'


print(int(gamma, 2) * int(epsilon, 2))
