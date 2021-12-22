import os
f = open(os.path.join(os.path.dirname(__file__), 'data.txt'))
commands = f.read().splitlines()

depth = 0
horizontal = 0

for command in commands:
    commandSet = command.split(' ')
    if commandSet[0] == 'up':
        depth -= int(commandSet[1])
    elif commandSet[0] == 'down':
        depth += int(commandSet[1])
    else:
        horizontal += int(commandSet[1])

print(depth * horizontal)
