const mongoose=require("mongoose");

async function connectToDB(){
    console.log("Server is running");
   await mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        console.log("Server is connected to DB");
        return

    })
    .catch(err=>{
        console.log("ERROR OCCURED",err.message);
        process.exit(1);
        // Agar Server database se connect nhi ho paata hai to ham yahi apne server ko band kar denge 
    })
}

module.exports =connectToDB;