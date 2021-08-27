const express = require('express')
const path = require('path')
const mysql = require('mysql')
const bodyParser = require('body-parser')
const { json } = require('body-parser')
// const { type } = require('os')



const app = express()
const viewpath = path.join(__dirname, 'public')
console.log(viewpath)
app.set('view engine', 'ejs')
app.use(express.static(viewpath))
app.use(bodyParser.json())

var connection = mysql.createPool({
    connectionLimit:100, 
    host: 'localhost',
    user:'root',
    password:'',
    database:'HostelDB'
})



app.get('/students', (req, res)=>{
    connection.getConnection((error, temp)=>{
        if(error){
            temp.release();
            res.status(404).send({error: "Unable to connect database"})
            console.log(error)
        }else{
            console.log('Connected!!')
            temp.query("SELECT * from students", (error, rows, fields)=>{
                temp.release();
                if(error){
                    res.status(502).send({error: "Something went wrong"})
                }else{
                    console.log(rows)
                    console.log('Successful query')
                    res.render('students', {data: JSON.stringify(rows)})
                }
            })
        }
    })
})

app.post('/students', (req, res)=>{
    connection.getConnection((error, temp)=>{
        // temp.release()
        if(error){
            temp.release()
            res.status(404).send({error: "Unable to connect database"})
        }else{
            // query = `INSERT INTO students()`
            let id = req.body.id
            let name = req.body.name
            let address = req.body.address
            let contact = req.body.contact
            console.log(typeof(id), typeof(name), typeof(address), typeof(contact))
            const query = `INSERT INTO students(id, name, address, contact) values('${id}', "${name}", "${address}", ${contact})`
            console.log(query)
            temp.query(query, (error, rows, fields)=>{
                temp.release();
                if(error){
                    console.log(error)
                    res.status(502).send({error: "Something went wrong"})
                }else{
                    console.log('Successful query')
                    // res.status(200).json(rows)
                    res.redirect('/students')
                }
            })
        }
    })
})

app.delete("/students", (req, res)=>{
    connection.getConnection((error, temp)=>{
        if(error){
            temp.release()
            res.status(404).send({error: "Unable to connect database"})
        }else{
            console.log(req.query)
            let id = req.query.id
            const  query = `DELETE FROM students where id='${id}'`
            console.log(query)
            temp.query(query, (error, rows, fields)=>{
                temp.release()
                if(error){
                    console.log(error)
                    res.status(502).send({error: "Something went wrong"})
                }else{
                    console.log("query executed successfully")
                    res.redirect('/students')
                }
            })
        }
    })
})

// app.patch("/students",(req, res)=>{
//     connection.getConnection((error, temp)=>{
//         if(error){
//             temp.release()
//             req.statusCode(404).send({error: "Unable to connect database"})
//         }else{
//             let id = req.query.id
//             let update = req.query.update,
//             // const query = `UPDATE students set ${}`
//         }
//     })
// })

app.get('/addstudent', (req, res)=>{
    res.render('addstudent')
})

app.listen(3000, ()=>{
    console.log(`server is starting at port 3000`)
})