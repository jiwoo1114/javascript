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
      const response = await fetch(url)

      const data = await response.json()
      // console.log('success data:', data)

      const results = data.results
      // console.log(results)

      for (const result of results) {
         //서버에서 받은 데이터 출력
         console.log(result)
         console.log(result.id)
         console.log(result.title)
         // 혹은 console.log(result['title'])
         console.log(result.poster_path)
         console.log(result.vote_average)
      }
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getPlayingMovies(url)
