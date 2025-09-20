const { faker } = require('@faker-js/faker');
const mysql = require('mysql2');
const express = require("express");
const app = express();
const path = require("path")
const methodOverride = require("method-override")
const { v4: uuidv4 } = require('uuid');
const { ifError } = require('assert');


app.use(methodOverride("_method")) 
app.use(express.urlencoded({ extended: true })) // request data parse korar jonno
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"/views"));


 const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'practice_app',
  password: 'R@fi200533'
});


app.listen(8080, () => {
  console.log("server is Listening to port 8080")
})



//home Route
app.get("/", (req,res) =>{
  let q = `SELECT count(*) FROM user`;
  try{
    connection.query(q, (err, result)=>{
        if(err) throw err;
        let count = result[0]["count(*)"];
        res.render("home.ejs",{count})
    });
  }catch(err){
    res.send("Some Error has been found")
  }
})


//Show Route
app.get("/user", (req,res) => {
  let q = "SELECT * FROM user";
  let q2 = `SELECT count(*) FROM user`;
  try{
    connection.query(q,(err, users) =>{
      if(err) throw err;
      connection.query(q2,(err, result)=>{
        if(err)throw err;
        let count = result[0]["count(*)"]
        res.render("showusers.ejs",{users, count});
      })
    })
  }catch(err){
    res.send("Some Error has been found")
  }
})


//Edit Route
app.get("/user/:id/edit", (req, res) => {
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, (err, result) =>{
      if(err) throw err;
      let user = result[0]
      res.render("edit.ejs",{user})
    })
  }catch(err){
    res.send("Some Error has been found")
  }
})


//Update DB Route 
app.patch("/user/:id", (req, res) =>{
  let {id} = req.params;
  let {username: newUsername, password: formpassword} = req.body;
  let q = `SELECT * FROM user WHERE id = '${id}'`;
  try{
    connection.query(q, (err, result) =>{
      if(err) throw err;
      let user = result[0];
      if(formpassword != user.password){
        res.send("WRONG Password")
      }else{
        let q2 = `UPDATE user SET username = '${newUsername}' WHERE id = "${id}"`;
        connection.query(q2, (err, result) =>{
          if(err) throw err;
          res.redirect("/user")
        })
      }
    })
  }catch(err){
    res.send("Some Error has been found")
  }
})

//Add User
app.get("/user/adduser",(req, res)=>{
  res.render("adduser.ejs")
})

//Create User
app.post("/user/adduser",(req,res)=>{
  let {username,password,email} = req.body;
  let id = uuidv4();
  let q = `INSERT INTO user (id, username, email, password) VALUES ('${id}','${username}','${email}','${password}') `;
  try{
    connection.query(q, (err, result)=>{
      if(err) throw err;
      console.log("added new user");
      res.redirect("/user");
    })
  }catch(err){
    res.send("Some Error has been found")
  }

})



//Delete User

app.get("/user/:id/delete", (req, res)=>{
  let {id} = req.params;
  let q = `SELECT * FROM user WHERE id = "${id}"`;
  try {
    connection.query(q, (err, result)=>{
    if(err) throw err;
    let user= result[0];
    res.render("delete.ejs", {user})
    })
  } catch (err) {
    res.send("Some Error has been found to Delete")
  }
})

app.delete("/user/:id",(req, res)=>{
  let {id} = req.params;
  let {password} = req.body;
  let q = `SELECT * FROM user WHERE id = "${id}"`;
  try {
     connection.query(q, (err, result)=>{
    if(err) throw err;
    let user = result[0];
    if(user.password !== password){
      res.send("Wrong Password")
    }else{
      let q2 = `DELETE FROM user WHERE id="${id}"`;
      connection.query(q2, (err, deleteResult)=>{
        if(err) throw err;
        else{
          console.log(deleteResult)
          console.log("deleted");
          res.redirect("/user")
        }
      })
      }
    })
  } catch (err) {
    res.send("SOME ERR")
  }
 
})



// app.get("/user/:id/delete", (req, res) => {
//   let {id} = req.params;
//   let q = `SELECT * FROM user WHERE id = '${id}'`;
//   try{
//     connection.query(q, (err, result) =>{
//       if(err) throw err;
//       let q2 = `DELETE FROM user WHERE id = "${id}"`;
//       let user = result[0]
//       connection.query(q2,(err,Deleteresult)=>{
//         if(err) throw err;
//         res.redirect("/user")
//       })
//     })
//   }catch(err){
//     res.send("Some Error has been found")
//   }
// })



//Faker (fake Data create)
let getRandomUser = () => {
  return [
    faker.string.uuid(),
    faker.internet.username(), // before version 9.1.0, use userName()
    faker.internet.email(),
    faker.internet.password(),
]
}

//Insert New Data
// let q = "INSERT INTO user (id, username, email, password) VALUES ?";

// let userData = [];
// for(let i = 1; i<=100; i++){
//   userData.push(getRandomUser());
// }


