using Serilog;
using Serilog.Sinks.Elasticsearch;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog((context, configuration) => {
  configuration.Enrich.FromLogContext()
  .WriteTo.Console()
  .WriteTo.Elasticsearch(new ElasticsearchSinkOptions(new Uri("http://elasticsearch:9200"))
  {
    IndexFormat = "test",
    AutoRegisterTemplate = true,
    NumberOfShards = 1,
    NumberOfReplicas = 1
  })
  .Enrich.WithProperty("Environment", context.HostingEnvironment.EnvironmentName)
  .Enrich.WithClientIp()
  .Enrich.WithCorrelationId()
  .Enrich.WithRequestHeader(headerName: "User-Agent")
  .ReadFrom.Configuration(context.Configuration);
});

builder.Services.AddHttpContextAccessor();

var app = builder.Build();


app.MapGet("/api/get", (ILogger<Program> logger) => {
  try {
    var rnd = new Random();

    if(rnd.NextDouble() > 0.5)
    {
      throw new Exception("Something bad happened");
    }

    logger.LogInformation("It's fine!");
    return "Hello World!";

  } catch (Exception ex) {
    logger.LogError(ex, "Bad");
    return "";
  }
});

app.Run();
