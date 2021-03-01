const { MongoClient, ObjectID } = require('mongodb')

const connecttionURL = process.env.MONGO_URL

const databaseName = process.env.DATABASE_NAME

MongoClient.connect(`${connecttionURL}/${databaseName}`, { useNewUrlParser: true, useUnifiedTopology: true }, (error, client) => {
    if (error) {
        console.log("Error")
        return console.log(error);
    }
    const db = client.db(databaseName);


    // db.collection('evals').deleteMany({
    //     completed: true
    // }).then(res => console.log(res)).catch(err => console.log(err))

})