namespace AdventOfCode;

public static class Part1
{
    public static void Run()
    {
        var lines = File.ReadAllLines(Path.Combine(Directory.GetCurrentDirectory(), "data.txt"));

        Node root = new("/");
        Node currentDirectory = root;

        foreach (var line in lines)
        {
            if (line.StartsWith("$"))
            {
                if (line.StartsWith("$ cd"))
                {
                    var directory = line.Split(" ")[2];
                    if( directory == "/")
                    {
                        currentDirectory = root;
                    }
                    else if (directory == "..")
                    {
                        currentDirectory = currentDirectory.Parent!;
                    }
                    else
                    {
                        currentDirectory = currentDirectory.Children.First(x => x.Name == directory);
                    }
                }
            }
            else if (line.StartsWith("dir "))
            {
                var directory = line.Split(" ")[1];
                Node newDirectory = new(directory, currentDirectory);
                currentDirectory.AddChild(newDirectory);
            }
            else
            {
                currentDirectory.Size += int.Parse(line.Split(" ")[0]);
            }
        }

        int totalSizeUnderThreshold = CalculateUnderThreshold(root);
        Console.WriteLine(totalSizeUnderThreshold);


    }

    public static int CalculateUnderThreshold(Node node)
    {
        int totalSizeUnderThreshold = 0;
        foreach (var child in node.Children)
        {   
            var size = child.CalculateSize();
            if (size < 100000)
            {
                totalSizeUnderThreshold += size;
            }
            totalSizeUnderThreshold += CalculateUnderThreshold(child);
        }
        return totalSizeUnderThreshold;
    }
}
