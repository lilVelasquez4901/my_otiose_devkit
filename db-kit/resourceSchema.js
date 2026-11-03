'use strict'

const mongoose = require('mongoose')

/** Rename the schema as needed, resource is just to point out it's for what your api will be storing from the users like the
 * book example used here
*/
const resourceSchema = new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true, 'Name of the book required'], //This can simply be true/false but when placed in brackets, it may equipped with an error message if a resource is attempted to be created without it
            trim:true,
            maxLength:[60, 'Book names cannot exceed 60 characters'] //Prevents the string from exceeding this many characters
        },
        author:{
             type:String,
             trim:true,
             maxLength:[80, 'Author cannot exceed 80 characters'],
             default:'Unknown' //The string will default to this value if nothing is provided  
        },
        year:{
            type:Number,
            required:[true, 'Year of book required'],
            default:null
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

plantSchema.index({status:1, location: 1})
plantSchema.index({createdAt: -1})

module.exports = mongoose.model('Plant', plantSchema)