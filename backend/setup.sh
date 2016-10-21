brew install mongodb
mongod --fork --dbpath ./mongo/data --logpath ./mongo/logs/mongo.logs
mongoimport --db images --collection image --file ./sample.json

npm install express
npm install body-parser
npm install mongodb
