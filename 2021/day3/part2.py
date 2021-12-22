import os
import copy
f = open(os.path.join(os.path.dirname(__file__), 'data.txt'))
report = f.read().splitlines()
o2_report = copy.deepcopy(report)
co2_report = copy.deepcopy(report)


def filter_report_by_position(remaining_report, position, lower=False):
    if len(remaining_report) == 1:
        return remaining_report

    values = []

    for line in remaining_report:
        values.append(list(line)[position])

    count0 = 0
    count1 = 0

    for value in values:
        if value == '0':
            count0 += 1
        elif value == '1':
            count1 += 1

    if lower:
        if count0 <= count1:
            match = '0'
        else:
            match = '1'
    else:
        if count0 > count1:
            match = '0'
        else:
            match = '1'

    return filter(lambda x: (x[position] == match), remaining_report)


for i in range(len(report[0])):
    o2_report = filter_report_by_position(o2_report, i)
    co2_report = filter_report_by_position(co2_report, i, True)

print(int(o2_report[0], 2) * int(co2_report[0], 2))
