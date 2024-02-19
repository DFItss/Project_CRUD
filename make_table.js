
const ko = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/;  //한글여부를 확인하기 위한 변수.

function make_table(type, object){  //type의 값이 't'일 경우 title, 'v'일 경우 value값을 표로 출력하는 함수.

  let limit = 17 //표의 가로길이를 텍스트 갯수로 설정.

  if(type==='v'){
    let colum = Object.values(object) //object의 value값을 배열로 선언. (js에서 배열은 key,value,length 값을 가진 object)
    for(let i=0; i<colum.length; i++){
      let str = colum[i].toString()
      if(ko.test(str)){  //object의 value값이 한글인 경우 가로길이에서 글자수만큼 추가로 빼서 다른 글자와의 간격을 동일하게 맞춤.
          space = limit-str.length //한글은 터미널상에서 영어,숫자의 2배의 간격을 차지하기때문에 간격을 동일하게 유지하기 위해 limit값에서 한글의 갯수만큼 빼서 맞춤.
      }else{
        space=limit
      }
      if(i==colum.length-1){
        console.log(' '+str.padEnd(space,' '))
      }else{
        process.stdout.write(' '+str.padEnd(space,' ')+'|')
      }
    }
  }else if(type==='t'){ //title의 위 아래에 줄을 추가하기위해 value값과 구분.
    let line = ''
    console.log(line.padEnd(object.length*(limit+2),'=')) //title의 위 아래로 컬럼의 갯수x가로길이 만큼의 구분선 생성.
    for(let i=0; i<object.length; i++){
      let str = object[i].replace(/\s+/g, '')
      if(i==object.length-1){
        console.log(' '+str.padEnd(limit-str.length,' '))
      }else{
        process.stdout.write(' '+str.padEnd(limit-str.length,' ')+'|')
      }
    }
    for(let i=0; i<object.length; i++){  //title의 아랫줄은 각 컬럼이 끝나는 지점에서 '+'추가
      if(i==object.length-1){
        console.log(line.padEnd(limit+2,'='))
      }else{
        process.stdout.write(line.padEnd(limit+1,'=')+'+')
      }
    }
  }
}
module.exports = {make_table}