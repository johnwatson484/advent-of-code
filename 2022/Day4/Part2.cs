namespace AdventOfCode;
public static class Part2
{
    public static void Run()
    {
        var lines = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));
        var totalDuplicatePairs = 0;
        foreach (var pair in lines)
        {   
            var elves = pair.Split(',');
            var elf1Jobs = GetJobs(elves[0]);
            var elf2Jobs = GetJobs(elves[1]);
            var overlapJobs = elf1Jobs.Intersect(elf2Jobs).ToList();
            if(overlapJobs.Count > 0)
            {
                totalDuplicatePairs++;
            }
        }
        Console.WriteLine(totalDuplicatePairs);
    }

    public static IList<int> GetJobs(string elf)
    {
        var jobs = elf.Split('-');
        return Enumerable.Range(int.Parse(jobs[0]), int.Parse(jobs[1]) - int.Parse(jobs[0]) + 1).ToList();
    }
}
