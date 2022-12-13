namespace AdventOfCode;
public static class Part2
{
    private const int Rock = 1;
    private const int Paper = 2;
    private const int Scissors = 3;
    private const int Win = 6;
    private const int Draw = 3;
    private const int Lose = 0;

    public static void Run()
    {
        var lines = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));
        List<int> scores = new();
        foreach (var line in lines)
        {
            var entries = line.Split(' ');
            var opponent = GetOpponentEntry(entries[0]);
            var me = GetMyEntry(opponent, entries[1]);
            var result = GetResult(opponent, me);
            scores.Add(result);
        }
        var total = scores.Sum();
        Console.WriteLine(total);
    }

    public static int GetOpponentEntry(string entry)
    {
        return entry switch
        {
            "A" => Rock,
            "B" => Paper,
            "C" => Scissors,
            _ => throw new Exception("Invalid entry"),
        };
    }

    public static int GetMyEntry(int opponent, string entry)
    {
        return entry switch
        {
            "X" => opponent switch
            {
                Rock => Scissors,
                Paper => Rock,
                Scissors => Paper,
                _ => throw new Exception("Invalid entry")
            },
            "Y" => opponent,
            "Z" => opponent switch
            {
                Rock => Paper,
                Paper => Scissors,
                Scissors => Rock,
                _ => throw new Exception("Invalid entry")

            },
            _ => throw new Exception("Invalid entry"),
        };
    }

    public static int GetResult(int opponent, int me)
    {
        if (opponent == Rock && me == Rock)
        {
            return Rock + Draw;
        }
        if (opponent == Rock && me == Paper)
        {
            return Paper + Win;
        }
        if (opponent == Rock && me == Scissors)
        {
            return Scissors + Lose;
        }
        if (opponent == Paper && me == Rock)
        {
            return Rock + Lose;
        }
        if (opponent == Paper && me == Paper)
        {
            return Paper + Draw;
        }
        if (opponent == Paper && me == Scissors)
        {
            return Scissors + Win;
        }
        if (opponent == Scissors && me == Rock)
        {
            return Rock + Win;
        }
        if (opponent == Scissors && me == Paper)
        {
            return Paper + Lose;
        }
        if (opponent == Scissors && me == Scissors)
        {
            return Scissors + Draw;
        }
        throw new Exception("Invalid result");
    }
}
