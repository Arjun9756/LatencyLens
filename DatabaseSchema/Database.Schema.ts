import mongoose, { mongo } from 'mongoose'

const resultSchema = new mongoose.Schema({
    fastestRegion:{
        type:String,
        enum:["Delhi" , "Mumbai" , "Banglore" , "Uttarakhand"],
    },
    slowestRegion:{
        type:String,
        enum:["Delhi" , "Mumbai" , "Banglore" , "Uttarakhand"],
    },
    avgLatency:{
        type:Number
    }
})

const schema = new mongoose.Schema({
    jobID:{
        type:String,
        required:true
    },
    website:{
        type:String,
        required:true
    },
    status:{
        type:String,
        enum:["Pending" , "Completed" , "Failed"],
        required:true,
    },
    resultSummary:resultSchema
})

const result = mongoose.model('LatencyLens' , schema)
export default result