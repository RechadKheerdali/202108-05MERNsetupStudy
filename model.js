const iKmongoose = require('mongoose')
const iKbcrypt = require('bcrypt')


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
    // console.log( this ) 

    await iKbcrypt.hash(this.iKpassword, 10).then((hash) => {
        // Store hash in your password DB.
        this.iKpassword = hash;
        next()
    });
})

//create the database model
const iKuserModel = iKmongoose.model('iKdbCollectionName', iKschema)

module.exports = iKuserModel;


/**
 */