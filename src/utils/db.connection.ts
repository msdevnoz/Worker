import {connect} from "mongoose";
!(async function() {
    try {
        await connect('mongodb://127.0.0.1:27017/worktop')
        console.log('db is connected');
        
    } catch (error:any) {
        console.error();
        return false;
    }
})()