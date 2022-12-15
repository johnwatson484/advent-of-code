namespace AdventOfCode;

public class Node
{
    public string Name { get; set; }
    public Node? Parent { get; set; }
    public List<Node> Children { get; set; } = new();
    public int Size { get; set; } = 0;

    public Node(string name, Node? parent = null)
    {
        Name = name;
        Parent = parent;
    }

    public void AddChild(Node child)
    {
        Children.Add(child);
    }

    public int CalculateSize()
    {
        return Size + Children.Sum(x => x.CalculateSize());
    }
}

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
