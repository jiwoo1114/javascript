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

console.log('1번')

// 1. 영화 상세정보 바인딩

const getDetailMovie = async (movieDetailUrl) => {
   try {
      const response = await fetch(movieDetailUrl, options)

      const data = await response.json()
      console.log('영화상세정보:', data)

      const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

      const rowHtml = `
               <div class="row">
                  <div class="col-sm-3" style="text-align:center">
                     <img src="${imgSrc}" class="poster-detail" alt="${data.title}" style="max-width:100%"/>
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

console.log('2번')

// 2. 출연 배우 데이터 바인딩(버그 수정 후)

const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditsMovie = async (movieCreditsUrl) => {
   try {
      const response = await fetch(movieCreditsUrl, options)

      const data = await response.json()
      console.log('출연배우 및 스태프:', data)

      let castRowHtml = `<div class="row" style="margin-top:30px; justify-content: flex-start;">`

      for (let i = 0; i < data.cast.length; i++) {
         if (i == 6) break //7명째가 되면 for문 종료

         let profileImg = !data.cast[i].profile_path ? `./images/person.png` : `https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}`

         castRowHtml += `
         <div class='col-sm-2 p-3'>
            <div class="card">
               <img src="${profileImg}"
               class="card-img-top"
               alt="${data.cast[i].name}">
               <div class="card-body">
                  <p class="card-text">${data.cast[i].name}</p>
               </div>
            </div>
         </div>`
      }

      castRowHtml += `</div>`

      mainContainer.innerHTML += castRowHtml
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getCreditsMovie(movieCreditsUrl)

console.log('3번')

// 2.출연 배우 데이터 바인딩(버그 수정 전)
// const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

// const getCreditsMovie = async (movieCreditsUrl) => {
//    try {
//       const response = await fetch(movieCreditsUrl, options)

//       const data = await response.json()
//       console.log('출연배우 및 스태프:', data)

//       //출연배우 6명만 출력
//       let castRowHtml = `<div class="row" style="margin-top:30px">`

//       for (let i = 0; i < 6; i++) {
//          castRowHtml += `
//          <div class='col-sm-2 p-3'>
//             <div class="card">
//                <img src="https://image.tmdb.org/t/p/w200${data.cast[i].profile_path}" class="card-img-top" alt="${data.cast[i].name}">
//                <div class="card-body">
//                   <p class="card-text">${data.cast[i].name}</p>
//                </div>
//             </div>
//          </div>`
//       }

//       castRowHtml += `</div>`

//       mainContainer.innerHTML += castRowHtml
//    } catch (error) {
//       console.error('에러 발생:', error)
//    }
// }

// getCreditsMovie(movieCreditsUrl)
