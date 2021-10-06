const jwt = require('jsonwebtoken');

//middleware for auth
const auth = async(req,res,next) =>{

    const token = req.header('Authorization');
    if( !token ) {
        return res.status(401).json({ msg:'No token provided, Authorization denied..!!'});
    }
    try{
        const decoded = jwt.verify(token,"mysecreat");
        req.user = decoded.id;
    }catch( err ){
        return res.status(401).json({ msg:'Invalid token provided, Authorization denied..!!'});
    }
    next();
}

module.exports = auth;