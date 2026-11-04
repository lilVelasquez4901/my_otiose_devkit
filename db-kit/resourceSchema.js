'use strict'

const mongoose = require('mongoose')

const exampleSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'Name of the record required'], //This can simply be true/false but when placed in brackets, it may equipped with an error message if a resource is attempted to be created without it
            trim:true,
            maxLength:[60, 'Book names cannot exceed 60 characters'] //Prevents the string from exceeding this many characters
        },
        description:{
             type:String,
             trim:true,
             maxLength:[1000, 'Description cannot exceed 1000 characters'],
             default:'Unknown' //The string will default to this value if nothing is provided  
        },
        ownerId:{
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