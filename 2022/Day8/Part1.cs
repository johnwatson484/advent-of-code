namespace AdventOfCode;
public static class Part1
{
    public static void Run()
    {
        var rows = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt")).Select(x => x.Select(y => int.Parse(y.ToString())).ToArray()).ToArray();

        List<string> visibleTrees = new();

        for (int r = 0; r < rows.Length; r++)
        {
            for (int c = 0; c < rows[r].Length; c++)
            {
                if (IsVisibleUp(rows, r, c)
                    || IsVisibleDown(rows, r, c)
                    || IsVisibleLeft(rows, r, c)
                    || IsVisibleRight(rows, r, c))
                {
                    visibleTrees.Add($"{r},{c}");
                }
            }
        }

        Console.WriteLine(visibleTrees.Count);
    }

    public static bool IsVisibleUp(int[][] rows, int row, int col)
    {
        int next = 1;
        while (row - next + 1 > 0)
        {
            if (!IsVisible(rows[row][col], rows[row - next][col]))
            {
                return false;
            }
            next++;
        }
        return true;
    }

    public static bool IsVisibleDown(int[][] rows, int row, int col)
    {
        int next = 1;
        while (row + next - 1 < rows.Length - 1)
        {
            if (!IsVisible(rows[row][col], rows[row + next][col]))
            {
                return false;
            }
            next++;
        }
        return true;
    }

    public static bool IsVisibleLeft(int[][] rows, int row, int col)
    {
        int next = 1;
        while (col - next + 1 > 0)
        {
            if (!IsVisible(rows[row][col], rows[row][col - next]))
            {
                return false;
            }
            next++;
        }
        return true;
    }

    public static bool IsVisibleRight(int[][] rows, int row, int col)
    {
        int next = 1;
        while (col + next < rows[row].Length)
        {
            if (!IsVisible(rows[row][col], rows[row][col + next]))
            {
                return false;
            }
            next++;
        }
        return true;
    }

    public static bool IsVisible(int current, int compare)
    {
        return compare < current;
    }

}
