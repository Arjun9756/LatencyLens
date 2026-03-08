import delhiCenterQueue from '../Queues/DelhiCenter'
import mumbaiCenterQueue from '../Queues/MumbaiCenter'
import Redis from '../Utils/Redis'
import result from '../DatabaseSchema/Database.Schema'
const subscriber = Redis.createRedisObject()

subscriber.on('connect' , ()=>{
    console.log("Central Server Subscriber Connected")
})
subscriber.on('close' , ()=>{
    console.log('Central Server Subscriber Closed')
})

subscriber.on('message' , (channel , message)=>{
    const {websiteURL , UUID , userIP} = JSON.parse(message)

    delhiCenterQueue.add("getNetworkInfo" , {websiteURL , UUID , userIP} , {
        attempts:5,
        backoff:{type:'exponential' , delay:2000},
        removeOnComplete:true,
        removeOnFail:true
    })

    mumbaiCenterQueue.add('getNetworkInfo' , {websiteURL , UUID , userIP} , {
        attempts:5,
        backoff:{type:'exponential' , delay:2000},
        removeOnComplete:true,
        removeOnFail:true
    })

    
})