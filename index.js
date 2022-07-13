require('dotenv').config()

const fs = require('fs')
const express = require('express')

const app = express()
const port = process.env.PORT || 8000

const USER_DATA_PATH = "./data/users.json"

app.use(express.json())
app.use(express.urlencoded({extended: false}))

app.get('/hello', (req,res, next) => {
    return res.status(200).json({
        message: 'hello world from hot reload'
    })
})


//get data users
app.get('/users', (req,res,next) => {
    //buat variabel untuk menampung data read file
    const usersAsString = fs.readFileSync(USER_DATA_PATH).toString()
    //parse data string menjadi json
    const users = JSON.parse(usersAsString)
    //dicek datanya ada atau ngga
    const isUserExist = users && users.length >0
    if(!isUserExist){
        return res.status(404).JSON({
            message : 'user tidak ditemukan'
        })
    }
    return res.status(200).JSON({
        message: "user ditemukan",
        data:users
    })
})

//create new user
app.post('/users',(req,res,next) => {
    //console.log(req.body)
    //read file users.json
    //tambah data baru ke array of users
    const newUser = {
        id:users.length +1,
        full_name: req.body.full_name,
        address:req.body.address,
        age:req.body.age,
    }
    users.push(newUser)
        fs.writeFileSync('/data/users.json',JSON.stringify(users))
        return res.status(201).json({
            message:"user created",
            data:newUser,
        })
    }
    //konversi data arrray/object ke string
    //ditulis ulang data baru ke file users.json
    //ditampilkan respon bahwa data berhasil dibuat
})

//update existing user
app.patch('/users', (req,res,next) => {
    console.log(req.params.id)
    console.log(req.body)
    //nyari data dengan id tertentu ada atau ngga
    //kalo ngga ada respon data not found
    //kalo ada kita update data dari request
    //save ulang data ke users.json
    //dimunculin respon kalau data berhasil diupdate
})

app.delete('/users',(req,res,next) => {
    //cari datanya by id
    //datanya gk ketemu => respon not found
    //kalo datanya ketemu baru kita hapus data tersebut
    //simpan data ke users.json
    //dimunculinn respon bahwa data berhasil dihapus
})

app.listen(port,() => {
    console.log(`server running on port ${port}`)
})