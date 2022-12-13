namespace AdventOfCode;
public static class Part1
{
    public static void Run()
    {
        var lines = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));

        var cratesRows = new List<string>();
        var i = 0;
        while (lines[i] != string.Empty)
        {
            cratesRows.Add(lines[i]);
            i++;
        }
        cratesRows.RemoveAt(cratesRows.Count - 1);
        cratesRows.Reverse();

        var stackRow = lines[i - 1];
        var stacks = stackRow.Split("   ").Select(x => new Stack<string>()).ToList();

        var crateSize = stackRow.Length / stacks.Count + 1;

        foreach (var crateRow in cratesRows)
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

        var instructions = lines.Skip(i + 1).ToList();

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

        stacks.ForEach(x => Console.Write(x.Pop().Trim().Replace("[", string.Empty).Replace("]", string.Empty)));
        Console.WriteLine();
    }
}
