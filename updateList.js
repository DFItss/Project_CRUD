
// let mysql = require("mysql");
let mysql = require("mysql2");

let connection = mysql.createConnection({
    host:process.env.DB_HOST,
    port:process.env.DB_PORT,
    user:process.env.DB_USER,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME
})

// list에 임의의 자료 추가(1번학생 제외)
function list_update(){
  for(var i=2; i<6; i++){
    for(var j=1; j<5; j++){
      for(var k=1; k<4; k++){
        let sql = `insert into list values(${i},${(j*100)+k},now())`
        connection.query(sql)
      }
    }
  }
}

list_update(); 
connection.end();