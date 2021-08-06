const iKmongoose = require('mongoose')

const iKschema = new iKmongoose.Schema({
    iKemail: {
        type: String,
        required: true,
        unique: true
    },
    iKpassword: {
        type: String,
        required: true
    }
}, { timestamps: true })

iKschema.pre('save', async function (next) {   
    
    console.log( this ) 
})

//create the database model
const iKuserModel = iKmongoose.model('iKdbCollectionName', iKschema)

module.exports = iKuserModel;


/**
 */