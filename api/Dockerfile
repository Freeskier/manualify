FROM mcr.microsoft.com/dotnet/sdk:7.0-alpine AS build

WORKDIR /app

COPY *.sln .
COPY Manualify.Web/*.csproj ./Manualify.Web/

RUN dotnet restore

COPY Manualify.Web/. Manualify.Web/

WORKDIR /app/Manualify.Web

RUN dotnet publish -c Release -o out

FROM mcr.microsoft.com/dotnet/aspnet:7.0-alpine AS final
WORKDIR /app

EXPOSE 80

COPY --from=build /app/Manualify.Web/out .

ENTRYPOINT ["dotnet", "Manualify.Web.dll"]
