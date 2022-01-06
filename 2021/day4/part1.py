import os
f = open(os.path.join(os.path.dirname(__file__), 'data.txt'))
data = f.read().split('\n\n')

balls = data[0].replace('\n', '').split(',')

tickets = []

for i in range(len(data)):
    if i > 0:
        ticket = data[i].splitlines()
        for i, row in enumerate(ticket):
            ticket[i] = filter(lambda x: x != '', row.split(' '))
        tickets.append(ticket)


def draw_balls():
    for ball in balls:
        for ticket in tickets:
            win = False
            for row in ticket:
                if ball in row:
                    index = row.index(ball)
                    row[index] = 'X'

                if len(row) == len(filter(lambda x: (x == 'X'), row)):
                    win = True

            for y in range(len(ticket[0])):
                column_checked = 0

                for z in range(len(ticket)):
                    if ticket[z][y] == 'X':
                        column_checked += 1

                if column_checked == len(ticket):
                    win = True

            if win:
                ticket_total = 0
                for row in ticket:
                    for number in row:
                        if number != 'X':
                            ticket_total += int(number)

                return ticket_total * int(ball)


result = draw_balls()
print(result)
