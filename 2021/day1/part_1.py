import os
f = open(os.path.join(os.path.dirname(__file__), 'data.txt'))
data = f.read().splitlines()

lastValue = 0
increments = 0
for value in data:
  if(value > lastValue):
    increments+=1
  lastValue = value

print(increments)
