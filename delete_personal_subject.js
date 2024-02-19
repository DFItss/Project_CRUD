const Input = require("./userInput");
// let mysql = require("mysql");
let mysql = require("mysql2");

let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

async function delete_personal_subject(num) {
  try {
    let sql = `DELETE FROM list WHERE num = ? AND sub_num = ?`;

    console.log('삭제할 과목의 과목번호를 입력하세요. 없다면 ENTER 입력.');
    let subNum = await Input.getUserInput();

    let results = await new Promise((resolve, reject) => {
      connection.query(sql, [num, subNum], (error, results, fields) => {
        if (error) {
          console.error('쿼리 실행 중 오류 발생:', error);
          reject(error);
        } else {
          resolve(results);
        }
      });
    });

    if (results.affectedRows > 0) {
      console.log(`수강신청 삭제 완료`);
    } else {
      console.log('선택한 항목이 없습니다.');
    }
  } catch (err) {
    console.error('오류 발생:', err.message);
  }
}

module.exports={delete_personal_subject}