const express = require('express');
const app = express();
const db = require("./config/db.js")
const User = require("./models/user");
const port = process.env.PORT||3000;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}))
app.use(express.static("public"));

app.set('view engine','ejs');

// home route
app.get('/',(req,res)=>{
    res.render('base',{title:"Login System"});
})

app.get('/welcome',(req,res)=>{
    res.render('welcome',{title:"Welcome To My Web!"});
})

app.post("/login", async(req,res) => {
    const {email, password} = req.body
    try {
        const user = await User.findOne({where: {email, password}});
        if (user) {
            res.redirect("/welcome");
            console.log("Login berhasil");
        } else {
            console.log("Login gagal: Username atau password salah");
            res.send("Login gagal: Username atau password salah");
        }
    } catch (error) {
        console.error("Error:", error);
        res.status(500).send("Internal Server Error");
    }
})

// // Contoh penggunaan: Mendapatkan semua data dari tabel 'users' dan mencetaknya ke konsol
// app.get("/getUsers", async (req, res) => {
//     try {
//       const users = await User.findAll(); // Query untuk mendapatkan semua data dari tabel 'users'
//       console.log("Data Users:");
//       users.forEach((user) => {
//         console.log(`Email: ${user.email}, Password: ${user.password}`);
//       });
//       res.send(users); // Mengirim data sebagai respons (jika diperlukan)
//     } catch (error) {
//       console.error("Error:", error);
//       res.status(500).send("Internal Server Error");
//     }
//   });


  
db.authenticate().then(() => {
    console.log("Connection to db success");
    app.listen(port, () => {
        console.log(`Listening to the server on http://localhost:${port}`);
    });
})
.catch((err) => {
    console.error("Error connecting to db:", err);
});