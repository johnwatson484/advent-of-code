namespace AdventOfCode;
public static class Part1
{
    public static void Run()
    {
        var lines = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));

        var breakIndex = lines.ToList().FindIndex(x => x == string.Empty);
        var crateRows = lines.Take(breakIndex - 1).ToList();
        crateRows.Reverse();

        var stackRow = lines[breakIndex - 1];
        var stacks = stackRow.Split("   ").Select(x => new Stack<string>()).ToList();

        var crateSize = stackRow.Length / stacks.Count + 1;
        StackCrates(crateRows, stacks, crateSize);

        var instructions = lines.Skip(breakIndex + 1).ToList();
        MoveCrates(stacks, instructions);
        LogTopCrate(stacks);
    }

    private static void StackCrates(List<string> crateRows, List<Stack<string>> stacks, int crateSize)
    {
        foreach (var crateRow in crateRows)
        {
            crateRow.ToCharArray()
            .Select((crate, index) => new
            {
                crate,
                index
            })
            .GroupBy(x => x.index / crateSize)
            .Aggregate(new List<string>(), (acc, x) =>
            {
                acc.Add(new string(x.Select(y => y.crate).ToArray()));
                return acc;
            })
            .ToList()
            .Select((crate, index) => new
            {
                crate,
                index
            })
            .ToList()
            .Where(x => x.crate.Trim() != string.Empty)
            .ToList()
            .ForEach(x => stacks[x.index].Push(x.crate));
        }
    }

    private static void MoveCrates(List<Stack<string>> stacks, List<string> instructions)
    {
        foreach (var instruction in instructions)
        {
            var instructionParts = instruction.Split(' ');
            var total = int.Parse(instructionParts[1]);
            var from = int.Parse(instructionParts[3]) - 1;
            var to = int.Parse(instructionParts[5]) - 1;

            for (var j = 0; j < total; j++)
            {
                stacks[to].Push(stacks[from].Pop());
            }
        }
    }

    private static void LogTopCrate(List<Stack<string>> stacks)
    {
        stacks.ForEach(x => Console.Write(x.Pop().Trim().Replace("[", string.Empty).Replace("]", string.Empty)));
        Console.WriteLine();
    }
}
