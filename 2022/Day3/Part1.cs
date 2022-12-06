namespace AdventOfCode;
public static class Part1
{
    public static void Run()
    {
        var backpacks = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));
        var score = 0;
        foreach (var backpack in backpacks)
        {
            var compartmentSize = backpack.Length / 2;
            var firstCompartment = backpack[..compartmentSize].ToArray();
            var secondCompartment = backpack[compartmentSize..].ToArray();

            var matchingItem = firstCompartment.FirstOrDefault(x => secondCompartment.Contains(x));
            score += matchingItem < 97 ? matchingItem - 38 : matchingItem - 96;
        }
        Console.WriteLine(score);
    }
}
