const options = {
   method: 'GET', //RestFul 방식 중 GET방식으로 요청
   headers: {
      accept: 'application/json', //저는 json 형태로 데이터를 받을거에요~ 라고 서버에서 요청
      //보안을 위해 서버에게 주는 인증키
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTcxOTg5NTcxOS43NjI4OSwic3ViIjoiNjI0ZDQzNDFjMzkyNjYwMDRmOTI5OGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ruIypQSMtEMHNnGzEoff8malu2AAblE5ehb53jpQTHE',
   },
}

const url = 'https://api.themoviedb.org/3/movie/now_playing?language=ko-KR&page=1&region=KR'

//1. promise fetch 사용
// fetch(url, options)
//    .then((response) => response.json())
//    .then((response) => console.log(response))
//    .catch((err) => console.error(err))

//2. async, await 사용
const getPlayingMovies = async (url) => {
   try {
      const response = await fetch(url, options)

      const data = await response.json()
      // console.log('success data:', data)

      const results = data.results
      // console.log(results)

      // for (const result of results) {
      //    //서버에서 받은 데이터 출력
      //    console.log(result)
      //    console.log(result.id)
      //    console.log(result.title)
      //    // 혹은 console.log(result['title'])
      //    console.log(result.poster_path)
      //    console.log(result.vote_average)
      // }

      //서버에서 받은 데이터 바인딩(웹브라우저 화면에 출력)
      /*
          어떻게 해야할까?
          (방법1) - 속도는 느리나, 쉬운 방법
          1. 우선 데이터를 바인딩할 요소의 dom을 가져온다.
          2. 해당 dom에 데이터를 넣어준다.

          (방법2) - 속도는 이게 더 빠르나, 초보자에겐 어려운 방법
          1. 바인딩할 dom을 생성한다. 
          2. 해당 dom에 데이터를 넣어준 후 화면에 나타낸다.
      */

      const rows = document.querySelectorAll('main .container .row')

      //row 요소를 각각 가져온다.
      rows.forEach((row, rowIdx) => {
         //rowIdx:0~5까지
         //console.log(row)

         //각 row 요소가 가진 card 요소를 각각 가져온다.
         const cards = row.querySelectorAll('.card')
         cards.forEach((card, cardIdx) => {
            //cardIdx: 0~4까지
            //console.log(card)
            const index = cardIdx + rowIdx * 4
            card.querySelector('.title').innerText = results[index].title
            card.querySelector('.average').innerText = `${results[index].vote_average.toFixed(1)}점`
            // w500은 이미지의 width를 500px로 서버에서 가져온다
            card.querySelector('img').src = `https://image.tmdb.org/t/p/w500${results[index].poster_path}`
            card.querySelector('img').alt = results[index].title
            card.querySelector('a').href = `./detail.html?movie_id=${results[index].id}`
         })
      })
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getPlayingMovies(url)
