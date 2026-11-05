'use strict'

const mongoose = require('mongoose')
const {RATING} = require('../auth-kit/index')

const exampleSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'Name of the record required'], //This can simply be true/false but when placed in brackets, it may equipped with an error message if a resource is attempted to be created without it
            trim:true, //used to eliminate whitespace after a string, useful just for strings only
            maxLength:[60, 'Book names cannot exceed 60 characters'] //Prevents the string from exceeding this many characters
        },
        description:{
             type:String,
             trim:true,
             maxLength:[1000, 'Description cannot exceed 1000 characters'],
             default:'Unknown' //The string will default to this value if nothing is provided  
        },
        rating:{
            type:String,
            required:true,
            trim:true,
            values:{values:RATINGS, message:'{VALUE} is not a supported rating'}, //used to keep specific values as the only options
            default:'G'
        },
        ownerId:{ //This should be automatically filled out with a mongoose id by a user when running a create function
            type:mongoose.Schema.Types.ObjectId,
            ref:'User',
            default:null,
            index: true,
        },
    },{
            timestamps:true,
            toJSON:{
                virtuals:true,
                versionKey:false,
                transform(doc, ret){
                    ret.id = ret._id
                    delete ret._id
                    return ret
                }
            },
            toObject:{virtuals:true}
        }


)

exampleSchema.index({status:1, location: 1})
exampleSchema.index({createdAt: -1})

module.exports = mongoose.model('Example', exampleSchema)