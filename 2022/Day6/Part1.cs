namespace AdventOfCode;
public static class Part1
{
    public static void Run()
    {
        var input = File.ReadAllText(Path.Combine(Directory.GetCurrentDirectory(), "data.txt")).ToCharArray();

        int sequenceLength = 4;
        var sequence = new List<char>();

        for (int i = 0; i < input.Length; i++)
        {
            sequence.Add(input[i]);

            if (sequence.Count > sequenceLength)
            {
                sequence.RemoveAt(0);
            }
            if (sequence.Distinct().Count() == sequenceLength)
            {
                Console.WriteLine(i + 1);
                break;
            }
        }
    }
}
