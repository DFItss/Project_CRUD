let mysql = require('mysql')
// let mysql = require("mysql2");
const Table = require('./make_table')
const del = require('./delete_personal_subject')

let connection = mysql.createConnection({
  host:process.env.DB_HOST,
  port:process.env.DB_PORT,
  user:process.env.DB_USER,
  password:process.env.DB_PASSWORD,
  database:process.env.DB_NAME
})

function read_personal_subject(num){
  console.clear();
  let sql = `select sbj.sub_num, sbj.sub_name, sbj.sub_professor, sbj.sub_credit 
            from list as li join subject as sbj on li.sub_num = sbj.sub_num WHERE num=${num} order by sbj.sub_num asc`;
  //
  connection.query(sql, async (error, result, fields) => {
    let total = 0
    if(error){
      console.log('error:'+error);
    } else {
      console.log('<수강 신청 목록>')
      Table.make_table('t', ['강의번호','강의명','담당교수','학점'])
      for(var i = 0; i < result.length; i++){
        Table.make_table('v',result[i])
        total += result[i].sub_credit
      }
    }
    total>18 ? console.log('총 신청 학점 : '+total+'/18(신청가능 학점 초과/18)'):console.log('총 신청 학점 : '+total)
    await del.delete_personal_subject(num)
    // await read_personal_subject(num);
  });
}

module.exports = {read_personal_subject};