const connection = require("../database/db");


const upload = (req,res) => {
    try {
	const title=req.body.title
        const url = req.protocol + '://' + req.get("host");
        const fileUrl = url + '/upload/' + req.file.filename;
        const addedBy = req.user
        const uniquecode = Math.floor(100000 + Math.random() * 900000);
        
        connection.query('insert into uploadedfiles(title,fileUrl,addedBy,unicode) values(?,?,?,?)',[title,fileUrl,addedBy,uniquecode],(error,result) => {
            if(error) {
                res.json(error)
            } else {
                res.json('File Uploaded Succesfully')
            }
        })

    } catch(err) {
        res.json(err)
    }
}


const getprofile = (req,res) => {
    try {

        connection.query('select * from uploadedfiles where addedBy=?',[req.user],(error,result) => {
            if(error) {
                res.json(error)
            } else {
                res.json(result)
            }
        })
    } catch(err) {

    }
}

const deleteFile = (req,res) => {
    try {
        connection.query('delete from uploadedfiles where id=?',[req.params.id],(error,result) => {
            if(error) {
                res.json(error)
            } else {
                res.json({
                    message:"File Deleted Succesfully"
                })
            }
        })
    } catch(err) {
        res.json(err)
    }
}


module.exports ={
    upload,
    getprofile,
    deleteFile
}