# finhub-task
A small technical assignment from IBM, that includes the use of javascript and its frameworks, as well as Finhub API.

## Usage development

In ```./client``` directory:
```
npm install
npm start
```

In ```./server``` create a ```.env``` file containing:
```
PORT=3030
DB_USERNAME=<mongodb username>
DB_PASSWORD=<mongodb password>
DB_CLUSTER=<mongodb cluster>
DB_DBNAME=<mongodb db name>
DB_COLLECTION_LOGS=<mongodb collection which will store logs>
FINHUB_API_KEY=<Finhub api key>
```
```
npm install
npm run dev
```

## Usage production
To run in production:
In ```./client``` directory:
```
npm install
npm run build
```

In ```./server``` directory create a ```.env``` file containing:
```
PORT=3030
DB_USERNAME=<mongodb username>
DB_PASSWORD=<mongodb password>
DB_CLUSTER=<mongodb cluster>
DB_DBNAME=<mongodb db name>
DB_COLLECTION_LOGS=<mongodb collection which will store logs>
FINHUB_API_KEY=<Finhub api key>
```
```
npm start
```
