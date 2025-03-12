import { connect } from "mongoose";

export const CONNECT_DATABASE = (MONGO_URI)=>{
    connect(MONGO_URI).then(()=>{
        console.log("DB Connected :)")
    }).catch((err)=>{
        console.log(err)
    })
}