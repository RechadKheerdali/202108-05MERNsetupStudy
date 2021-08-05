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
    },
    iKisLoggedOut: {
        type: Boolean
    }
}, { timestamps: true })

iKschema.pre('save', async function (next) {   
    const salt = await iKbcrypt.genSalt();
    const hash = await iKbcrypt.hash(this.iKpassword, salt);
    this.iKpassword = hash;
    next()
})

// iK I did not finish logout so it will not work as you would expected. But I done all the heavy lifting and all need to do is adjust the iKauthenticateRoute middleware to check if iKisLoggedOut is true or false and code accordingly
iKschema.static('iKlogoutUser', function(iKuserId){
    this.findById(iKuserId.iKid)
        .then(iKuser => {
            console.log(iKuser.iKisLoggedOut)
        })
})

//create the database model
const iKuserModel = iKmongoose.model('iKdbCollectionName', iKschema)

module.exports = iKuserModel;