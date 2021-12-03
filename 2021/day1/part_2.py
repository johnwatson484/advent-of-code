import os
f = open(os.path.join(os.path.dirname(__file__), 'data.txt'))
data = f.read().splitlines()

totalValues = len(data)
values = []

for i, value in enumerate(data):
  total = int(value)
  valuesInWindow = 1
  for x in range(1, 3):
    dataIndex = i + x
    if(dataIndex < totalValues):
      total += int(data[dataIndex])
      valuesInWindow += 1
  if(valuesInWindow == 3):
    values.append(total)
 
lastValue = 0
increments = 0

for value in values:
  if(value > lastValue):
    increments += 1
  lastValue = value

print(increments-1)
