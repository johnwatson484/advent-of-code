import os
f = open(os.path.join(os.path.dirname(__file__), 'data.txt'))
commands = f.read().splitlines()

depth = 0
horizontal = 0
aim = 0

for command in commands:
    commandSet = command.split(' ')
    value = int(commandSet[1])
    if commandSet[0] == 'up':
        aim -= value
    elif commandSet[0] == 'down':
        aim += value
    else:
        horizontal += value
        depth += (value * aim)

print(depth * horizontal)
