namespace AdventOfCode;
public static class Part1
{
    public static void Run()
    {
        var lines = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));
        List<int> calories = new();
        int totalCalories = 0;
        foreach (var line in lines)
        {
            if (int.TryParse(line, out int cal))
            {
                totalCalories += cal;
            }
            else
            {
                calories.Add(totalCalories);
                totalCalories = 0;
            }
        }
        var mostCalories = calories.Max();
        Console.WriteLine(mostCalories);
    }
}
