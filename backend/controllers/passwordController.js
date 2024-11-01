const Password = require('../models/passwordModel')
const mongoose = require('mongoose')

const getAllPasswords = async (req, res) => {
    const id = req.user._id
    const all_passwords = await Password.find({id });
    res.status(200).json(all_passwords)
}

const addPassword  = async (req, res) => {
    const {site, username, password} = req.body

    let emptyFields = []

    if(!site)
        emptyFields.push('site')

    if(!password)
        emptyFields.push('password')

    if(!username)
        emptyFields.push('username')

    if(emptyFields.length > 0)
        return res.status(400).json({error : 'Please fill in all the fields', emptyFields})

    try{
        const id = req.user._id
        const added_password = await Password.create({site, username, password, id})
        res.status(200).json(added_password)
    }

    catch(error){
        res.status(400).json({error : error.message})
    }
}

const updatePassword = async (req, res) => {
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id))
        return res.status(400).json({error : "Validation error"})

    const password = await Password.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!password)
        return res.status(404).json({error : "No such password"})

    return res.status(200).json(password)
}

const deletePassword = async (req, res) => {
    const {id} = req.params

    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(400).json({error : "Validation error"})
    }

    const password = await Password.findOneAndDelete({_id: id})
    
    if(!password)
        return res.status(404).json({error : "No such password"})

    return res.status(200).json(password)
}

module.exports = {
    addPassword,
    getAllPasswords,
    deletePassword,
    updatePassword
}