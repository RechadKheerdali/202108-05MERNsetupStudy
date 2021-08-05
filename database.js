const iKmongoose = require('mongoose')

const iKconnectToMdb = async () => {
    try {
        const iKconnectWithMongoose = await iKmongoose.connect(
            process.env.MONGODBURI,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                useFindAndModify: false,
                useCreateIndex: true
                
            }
        )
        console.log('iK mongoose connection success')
    } catch(err) {
        console.log(err);
        process.exit(1)
    }
}

module.exports = iKconnectToMdb;