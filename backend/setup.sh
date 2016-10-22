brew install mongodb
mongod --fork --dbpath ./mongo/data --logpath ./mongo/logs/mongo.logs
# mongoexport --db images --collection image --out sample.json
mongoimport --db images --collection image --file ./sample.json

npm install express
npm install body-parser
npm install mongodb
npm install node-fetch
