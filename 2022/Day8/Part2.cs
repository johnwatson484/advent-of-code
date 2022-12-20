namespace AdventOfCode;
public static class Part2
{
    public static void Run()
    {
        var rows = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt")).Select(x => x.Select(y => int.Parse(y.ToString())).ToArray()).ToArray();

        List<int> visibleTrees = new();

        for (int r = 0; r < rows.Length; r++)
        {
            for (int c = 0; c < rows[r].Length; c++)
            {
                var scenicScore = TreesVisibleUp(rows, r, c) * TreesVisibleDown(rows, r, c) * TreesVisibleLeft(rows, r, c) * TreesVisibleRight(rows, r, c);
                visibleTrees.Add(scenicScore);
            }
        }

        Console.WriteLine(visibleTrees.Max());
    }

    public static int TreesVisibleUp(int[][] rows, int row, int col)
    {
        int trees = 0;
        int next = 1;
        while (row - next + 1 > 0)
        {
            if (!IsVisible(rows[row][col], rows[row - next][col]))
            {
                return trees + 1;
            }
            trees++;
            next++;
        }
        return trees;
    }

    public static int TreesVisibleDown(int[][] rows, int row, int col)
    {
        int trees = 0;
        int next = 1;
        while (row + next - 1 < rows.Length - 1)
        {
            if (!IsVisible(rows[row][col], rows[row + next][col]))
            {
                return trees + 1;
            }
            trees++;
            next++;
        }
        return trees;
    }

    public static int TreesVisibleLeft(int[][] rows, int row, int col)
    {
        int trees = 0;
        int next = 1;
        while (col - next + 1 > 0)
        {
            if (!IsVisible(rows[row][col], rows[row][col - next]))
            {
                return trees + 1;
            }
            trees++;
            next++;
        }
        return trees;
    }

    public static int TreesVisibleRight(int[][] rows, int row, int col)
    {
        int trees = 0;
        int next = 1;
        while (col + next < rows[row].Length)
        {
            if (!IsVisible(rows[row][col], rows[row][col + next]))
            {
                return trees + 1;
            }
            trees++;
            next++;
        }
        return trees;
    }

    public static bool IsVisible(int current, int compare)
    {
        return compare < current;
    }

}
