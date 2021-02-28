// domain/.netlify/functions/1-hello
//const person = {name: 'john'};
exports.handler = async(event,context)=>{
    
    return{
        statusCode:200,
        body: "test",
    }
}

/*exports.handler = (event,context,cb)=>{
    cb(null,{statusCode:200, body:'Our First Netlify Function Example'})
    
}*/