#LocalPress

## Overview
LocalPress is a command tool to store your JSON objects and images offline from a given URL and routes.

**Example use cases**

- You are running an API to feed data to the front-end of your application but the data does not change frequently (Blog, news, featured products, football results etc)? Run this route through LocalPress and you then have a static JSON object which results in faster performance and less server resources due to the database not needing to run the query on each request.

- You using a public API that forces request limits but does not require fresh data during each request

- During development somebody is working on the backend constantly changing data and throwing syntax errors/debug statements

## Installation 
```js
npm install -g LocalPress
```

