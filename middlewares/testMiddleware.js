const mw1 = (req,res,next)=>{
    console.log('running mw1')
    next()
}

const mw2 = (req,res,next)=>{
    console.log('running mw2')
    next()
}

export default {mw1,mw2}