const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTcxOTg5NTcxOS43NjI4OSwic3ViIjoiNjI0ZDQzNDFjMzkyNjYwMDRmOTI5OGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ruIypQSMtEMHNnGzEoff8malu2AAblE5ehb53jpQTHE',
   },
}

// 현재 페이지의 URL을 사용하여 URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

// 특정 쿼리 스트링 값 가져오기 (예: ?movie_id=573435)
const movieId = urlParams.get('movie_id')
//console.log(movieId) // 573435

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`
const mainContainer = document.querySelector('main .container')

const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)

      const data = await response.json()
      // console.log('success data:', data)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
               <div class="row">
                  <div class="col-sm-3">
                     <img src="${imgSrc}" class="poster-detail" alt="${data.title}"/>
                  </div>
                  <div class="col-sm-9 movie-detail">
                     <h2>${data.title}</h2>
                     <ul class="movie-info">
                        <li>개봉일 ${data.release_date}</li>
                        <li>
                           ${data.genres.map((genre) => {
                              return genre.name
                           })}
                        </li>
                        <li>${data.runtime}분</li>
                     </ul>
                     <p>평점 ${data.vote_average.toFixed(1) == 0.0 ? '미반영' : data.vote_average.toFixed(1)}</p>
                     <p>${data.overview}</p>
                  </div>
               </div>`

      // console.log(rowHtml)
      mainContainer.innerHTML += rowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getDetailMovie(movieDetailUrl)
