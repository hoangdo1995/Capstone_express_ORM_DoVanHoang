const successCode = (res,data,message)=>{
    res.status(200).json({
        content:data,
        statusCode:200,
        message,
        date:new Date()
    })
}

const failCode = (res,data,statusCode,message)=>{
    res.status(statusCode).json({
        content:data,
        statusCode,
        message,
        date:new Date()
    })
}

const errorCode = (res,data,message)=>{
    res.status(500).json({
        content:data,
        statusCode:500,
        message,
        date:new Date()
    })
}

export {successCode,failCode,errorCode}