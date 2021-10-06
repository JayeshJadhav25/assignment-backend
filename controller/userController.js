const bcrypt = require('bcrypt');
const connection = require('../database/db')
const jwt = require('jsonwebtoken')

const register =async (req,res) => {
    try {
        var email=req.body.email;
        var username=req.body.username;
        var password=req.body.password;
    
      bcrypt.hash(password, 8).then(hashpw => {
            connection.query('select * from user where email=?',[email],(error,result) => {
                if(error) {
                   res.status(500).json('server error')
                }
        
                if(result.length ==0){
                    connection.query('insert into user(username,email,password) value(?,?,?)',[username,email,hashpw],(error,iresult)=>{
                        if(error) {
                            res.json({"Error":error})
                        }
                        res.json({
                            'message':'SignUp successfully..!!'
                        })               
                    })
                }else {
                    res.status(400).json({"message":"Email already registered"})
                }
                
            })
      })

        
    } catch(err) {
        res.json(err)
    }
}


const login = async (req,res) => {
    try {
        const { email, password } = req.body
        connection.query('select * from user where email=?',[email],async (error,result) => {
            if(error) {
                res.status(500).json('Server error')
            }
            if(result.length == 0)  {
                res.status(400).json({"message":"Username and password are invalid"})
            } else {

                await bcrypt.compare(password,result[0].password).then(results => {
                    if(results) {
                        
                        const payload = {
                            id: result[0].id
                        }
                
                        const token = jwt.sign(payload, "mysecreat");
                        res.json({
                            'status':1,
                            'token':token,
                            'message':'Login Succesfull'
                        })
                    } else {
                        res.status(400).json({"message":"Username and password are invalid"})
                    }
                   
                })
               
            }
        })
    }catch(err) {
        res.json(err)
    }
}


module.exports = {
    register,
    login
}