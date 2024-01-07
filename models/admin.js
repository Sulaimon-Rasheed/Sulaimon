const mongoose = require("mongoose")
const bcrypt = require("bcrypt")

const Schema = mongoose.Schema;

const adminSchema = new Schema({
    admin_name:{type:String, unique:"true"},
    password:{type:String, unique:"true"}
})

adminSchema.pre("save", async function(next){
    const hash = await bcrypt.hash(this.password, 10)
    this.password = hash
    next()
})

adminSchema.methods.isValidPassword = async function(password){
const compare = await bcrypt.compare(this.password, password)
return compare
}

module.exports = mongoose.model("admins", adminSchema)