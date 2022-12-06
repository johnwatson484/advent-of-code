namespace AdventOfCode;
public static class Part2
{
    public static void Run()
    {
        var backpacks = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));
        var groups = backpacks
            .Select((backpack, index) => new {
                backpack,
                index
            })
            .GroupBy(x => x.index / 3)
            .Select(x => x.Select(y => y.backpack).ToArray())
            .ToArray();
        var score = 0;
        foreach (var group in groups)
        {
            var firstBackpack = group[0].ToCharArray();
            var secondBackpack = group[1].ToCharArray();
            var thirdBackpack = group[2].ToCharArray();

            var matchingItem = firstBackpack.FirstOrDefault(x => secondBackpack.Contains(x) && thirdBackpack.Contains(x));
            score += matchingItem < 97 ? matchingItem - 38 : matchingItem - 96;
        }
        Console.WriteLine(score); 
    }
}
