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
