const express = require('express');
const mysql = require('mysql');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
    user: 'root',
    host: 'localhost',
    password: 'GODOFSUN=lpd2003',
    database: 'employeedetails',
});

app.post('/add', (req, res) => {
    const name = req.body?.name;
    const id = req.body?.id;
    const dob = req.body?.dob;
    const age= req.body?.age;
    const city = req.body?.city;
    const salary = req.body?.salary;
    const contact = req.body?.contact;

    console.log(req.body);

    db.query('INSERT INTO data(name, id, dob, age, city, salary, contact) VALUES(?,?,?,?,?,?,?)',
        [name, id, dob, age, city, salary, contact],
        (err, result) => {
            if (err) {
                console.log(err);
                res.status(500).send("Error occurred while inserting data.");
            } else {
                console.log("Success");
                res.send("Success");
            }
        }
    );
});

app.get('/employee' , (req,res) => {
    db.query("SELECT * FROM data", 
    (err,result)=>{
        if(err)
        {
            console.log(err);
        }
        else{
            res.send(result);
        }
    }
    )
})

app.delete("/delete/:id", (req, res) => {
    const id = req.params.id;
    db.query("DELETE FROM data WHERE key = ?", key, (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    });
  });

app.listen(3001, () => {
    console.log('Server started');
});