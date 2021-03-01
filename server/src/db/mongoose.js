const mongoose = require('mongoose');

mongoose.connect(`${process.env.MONGO_URL}/${process.env.DATABASE_NAME}`, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})