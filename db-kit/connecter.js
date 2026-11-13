'use strict'
const mongoose = require('mongoose')

let listenerAttached = false

function attachedListeners(){
    if(listenerAttached) return;
    listenersAttached = true

    mongoose.connection.on('connected', ()=>{
        console.log(`MongoDB Connected: ${mongoose.connection.name}`)
    })

    mongoose.connection.on('error', (err)=>{
        console.log(`MongoDB error: ${err.message}`)
    })

    mongoose.connection.on('disconnected', ()=>{
        console.log(`MongoDB disconnected`)
    })
}

async function connectDatabase(uri){
  mongoose.set('strictQuery', true)
  attachedListeners()

    try {
        await mongoose.connect(uri,{
            serverSelectionTimeoutMS: 10000, 
        })
    } catch (err) {
        console.log(` Could not connect to MongoDB: ${err.message}`)
        process.exit(1)
    }
}

async function disconnectDatabase(){
    await mongoose.connection.close()
}

function isConnected(){
    return mongoose.connection.readyState === 1
}


module.exports = { connectDatabase, disconnectDatabase, isConnected}