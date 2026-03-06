import mongoose from 'mongoose'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'

dotenv.config({path:path.join(__dirname , ".." , ".env")})
async function connectDatabase(){
    const MONOG_DB_URI = process.env.MONGO_DB_URI as string
    if(!MONOG_DB_URI || MONOG_DB_URI.length <= 0){
        console.log("No MongoDB URI is Provided Service Binned Up")
        process.exit(1)
    }

    try{
        const database = await mongoose.connect(MONOG_DB_URI)
        console.log("Mongo Database Connected Successfuly")
    }
    catch(error:any){
        console.log(`Error in Connecting MongoDB ${error.message}`)
        fs.writeFile(path.join(__dirname , ".." , ".." , "LogMetrics.txt") , `\n ${new Date().toLocaleString('IN')} Error in MongoDB Connection ${error?.message || error}` , (err)=>{})
        process.exit(1)
    }
    finally{

    }
}

export default connectDatabase