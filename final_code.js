const express = require('express')
const mysql = require('mysql2')
const app = express()
const port = 3000
const db = mysql.createConnection(
{
host: "localhost",
user: "root",
password: "1234",
database: "shopdee"
}
)
db.connect()
app.use(express.json())
app.use(express.urlencoded ({extended: true}))
4
//SQL Injection 
app.post('/product', function(req, res){ 
const { productName, productDetail, price, cost, quantity } = req.body;
// let sql = "INSERT INTO product (productName, productDetail, price,cost, quantity)"
// sql += "VALUES('"+ productName +"','"+ productDetail +"', "
// sql += price +","+ cost +"," + quantity + ")"
// db.query(sql, 
// function(err, result){
// if (err) throw err; 
// res.send({'message':'บันทึกข้อมูลส ำเร็จ','status':true});
// }
// )
// })
    let sql = "INSERT INTO product (productName, productDetail, price, cost, quantity) VALUES (?, ?, ?, ?, ?)";
    db.query(sql, [productName, productDetail, price, cost, quantity], function(err, result) {
      if (err) throw err; 
      res.send({'message': 'บันทึกข้อมูลสำเร็จ', 'status': true});
    });
  });

//SQL Injection productID = "1; DROP TABLE product;"
app.get('/product/:id', function(req, res) {
    const productID = req.params.id;
    let sql = "SELECT * FROM product WHERE productID = ?";
    db.query(sql, [productID], function(err, result) {
      if (err) throw err;
      res.send(result);
    });
  });

//SQL Injection
app.post('/login', function(req, res){
const {username, password} = req.body
// let sql = "SELECT * FROM customer WHERE "
// sql += "username='" + username + "'";
// sql += " AND password = '" + password + "' AND isActive = 1"; 
// db.query(sql, [username, password], function(err, result){
// if(err) throw err
// if(result.length > 0){
// let customer = result[0]
// customer['message'] = "เข้ำสู่ระบบสำเร็จ"
// customer['status'] = true
// res.send(customer)
// }else{
// res.send({"message":"กรุณำระบุรหัสผ่ำนใหม่อีกครั้ง",
// "status":false} )
// } 
// }) 
let sql = "SELECT * FROM customer WHERE username = ? AND password = ? AND isActive = 1";
db.query(sql, [username, password], function(err, result) {
  if (err) throw err;
  if (result.length > 0) {
    let customer = result[0];
    customer['message'] = "เข้าสู่ระบบสำเร็จ";
    customer['status'] = true;
    res.send(customer);
  } else {
    res.send({
      "message": "กรุณาระบุรหัสผ่านใหม่อีกครั้ง",
      "status": false
    });
  }
});
} )

//ไม่มีตัว single code
app.listen(port, function() {
console.log(`server listening on port ${port}`)
})