namespace Manualify.Web;

public class Test
{
    public event EventHandler<string> EventHandlerer 
    {
        add => Console.WriteLine("asd");
        remove => Console.WriteLine("asd");
    }

}
