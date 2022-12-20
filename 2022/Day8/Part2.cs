namespace AdventOfCode;
public static class Part2
{
    public static void Run()
    {
        var rows = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt")).Select(x => x.Select(y => int.Parse(y.ToString())).ToArray()).ToArray();

        int visibleTrees = 0;

        for (int r = 0; r < rows.Length; r++)
        {
            for (int c = 0; c < rows[r].Length; c++)
            {
                bool visibleUp = true;
                bool visibleDown = true;
                bool visibleLeft = true;
                bool visibleRight = true;

                if (r > 0) visibleUp = IsVisible(rows[r][c], rows[r - 1][c]);
                if (r < rows.Length - 1) visibleDown = IsVisible(rows[r][c], rows[r + 1][c]);
                if (c > 0) visibleLeft = IsVisible(rows[r][c], rows[r][c - 1]);
                if (c < rows[r].Length - 1) visibleRight = IsVisible(rows[r][c], rows[r][c + 1]);
                if (visibleUp || visibleDown || visibleLeft || visibleRight)
                {
                    visibleTrees++;
                }
            }
        }

        Console.WriteLine(visibleTrees);
    }

    public static bool IsVisible(int current, int compare)
    {
        return compare < current;
    }

}
