exports.mw1 = (req,res,next)=>{
    console.log('running mw1')
    next()
}

exports.mw2 = (req,res,next)=>{
    console.log('running mw2')
    next()
}