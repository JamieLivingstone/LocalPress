# LocalPress

## Overview
LocalPress is a command line tool to store your JSON APIs and images offline.

**Example use cases**

- You are running an API to feed data to the front-end of your application but the data does not change frequently (Blog, news, featured products, football results etc)

- You using a public API that has a daily request limit

- During development somebody is working on the backend constantly changing data and throwing syntax errors/debug statements

- Better performance by using local data it reduces the server loads load as it does not need to run a database query on each request.

## Installation 
LocalPress requires Node.js vCURRENTLY TESTING to run.

```js
npm install -g localpress
```

## Features
- Save JSON offline
- Save webpages offline organized by routes
- Parse images from JSON and save locally
- Routing to handle multiple paths

## Options
##### Show version number
```js
localpress -v
localpress --version
```

##### Show help
```js
localpress -h 
localpress --help
```

##### Configure
###### Params
- --url, -u (Required) -   (URL of website with JSON data)
- --routes, -r (Optional) - (A comma separated list of routes)
)
```js
localpress configure
localpress c
```
URL Example (If no routes profided will default to the URL provided)
```js
localpress config --url "http://mywebiste.com/api"
```

Routes Example

This example would configure: { home: 'http://mywebsite.com/api/', aboutUs: 'http://mywebsite.com/about-us' }
```js
localpress config --url "http://mywebsite.com/api" --routes "home@/, aboutUs@/about-us"
```

##### Run
###### Params
- --url, -u (Optional) - (URL of website with JSON data - overrides config)
- --images, -i (Optional) - (Save images to local directory)
- --chunk, -c (Optional) - (Separate files by route prefix)

```js
localpress run // will output a file named data.json
```

```js
localpress run --chunk // will output two files home.json, aboutUs.json
```

```js
localpress run --chunk --images // will output two files home.json, aboutUs.json and save images locally
```

## Examples

### Football API
setup config adding routes for the index, premier league teams and fixtures
```js
localpress config --url "http://api.football-data.org/v1/competitions" --routes "root@/, plTeams@/427/teams, plFixtures@/competitions/427/fixtures"
```

Run with --images (to save images) and --chunk (to save each route separate)
```js
localpress run --images --chunk
```