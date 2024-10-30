const obj = [10,20]

//에러의 원인:forEach는 배열에서만 사용가능
//not a function -> 적용 대상을 잘못 사용(json객체에서 forEach 함수 지원 x)

 //obj 객체의 요소를 배열로 정리해줘서 forEach문 실행가능하게 하기

obj.forEach((element) => {
   console.log(element)
})
