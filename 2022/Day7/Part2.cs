namespace AdventOfCode;

public static class Part2
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
                    if (directory == "/")
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

        int totalDiskSpace = 70000000;
        int usedSpace = root.CalculateSize();
        int freeSpace = totalDiskSpace - usedSpace;
        int targetFreeSpace = 30000000;
        int spaceToFree = targetFreeSpace - freeSpace;

        var directoryToFree = FindSmallestDirectory(root, spaceToFree);
        Console.WriteLine(directoryToFree);
    }

    public static int FindSmallestDirectory(Node node, int spaceToFree, int smallestSize = -1)
    {
        int smallestDirectorySize = smallestSize;
        foreach (var child in node.Children)
        {
            var size = child.CalculateSize();
            if (size >= spaceToFree && (smallestDirectorySize == -1 || size < smallestDirectorySize))
            {
                smallestDirectorySize = size;
            }
            smallestDirectorySize = FindSmallestDirectory(child, spaceToFree, smallestDirectorySize);
        }
        return smallestDirectorySize;
    }
}
