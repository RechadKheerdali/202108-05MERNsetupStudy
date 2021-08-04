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
    const salt = await iKbcrypt.genSalt();
    const hash = await iKbcrypt.hash(this.iKpassword, salt);
    this.iKpassword = hash;
    next()
})

//create the database model
const iKuserModel = iKmongoose.model('iKdbCollectionName', iKschema)

module.exports = iKuserModel;


/**
 */