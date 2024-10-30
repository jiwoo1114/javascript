const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzdhNmI5NjBiYjIxZmYzOTIzMWIyNGU4NzE1YzU4YSIsIm5iZiI6MTczMDA3NjEyMS4wMTQ4MTMsInN1YiI6IjY3MWFlOWI0MjdiZDU3ZDkxZjYyODA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PQHiyeqlSMznOrvnbc8XsEj_ILEDbQOn9GcyeDZTLrI'
  }
};

//현재 페이지의 url을 사용하여  URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

//특정 쿼리 스트링 값 가져오기(예:?movie_id=1184918)
const movieId = urlParams.get('movie_id')

const movieDetailUrl = `https://api.themoviedb.org/3/movie/${movieId}?language=ko-KR`

const mainContainer = document.querySelector('main .container')

//1.영화 상세정보 바인딩
const getDetailMovie = async (movieDetailUrl) => {
    try {
        const response = await fetch(movieDetailUrl, options)
        const data = await response.json()

        //console.log(data)
        //w300 -> poster의 width를 300px로 가져온다. 
        const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`

        const rowHtml = `<div class="row">
                 <div class="col-sm-3" style='text-align:center'>
                <img src="${imgSrc}" alt="${data.title}" class="poster-detail"
                style = "max-width:100%">
              </div>
                <div class="col-sm-9">
                    <h2>${data.title}</h2>
                    <ul class="movie-info">
                        <li>개봉일${data.release_date}</li>
                        <li>${data.genres.map((genre) => genre.name)}</li>
                        <li>${data.runtime}</li>
                    </ul>
                   <p>${Number(data.vote_average.toFixed(1) == 0.0) ? '미반영' : data.vote_average.toFixed(1) }</p>
                   <p>${data.overview}</p>
                </div>
            </div>`
        
        mainContainer.innerHTML += rowHtml
        await getCreditMovie(movieCreditsUrl) //getDatailMovie 함수가 완료 될 때까지 기다렸다가 getCreditsMovie 함수 실행
    } catch (error) {
        console.log('에러 발생:',error)
    }
}

//함수실행
getDetailMovie(movieDetailUrl)

//2.출연배우 정보 바인딩
const movieCreditsUrl = `https://api.themoviedb.org/3/movie/${movieId}/credits?language=ko-KR`

const getCreditMovie = async (movieCreditsUrl) => {
    try {
        const response = await fetch(movieCreditsUrl, options)
        const data = await response.json()

        //console.log(data)

        let castRowHtml = `<div class = "row" style="margin-top:30px">`

        //출연배우 6명만 출력
        for (let i = 0; i < 6; i++){
            if (i == 6) break //7명째가 되면 for문 종료


            //프로필 이미지가 없을 경우 person.png 파일 경로를 profileImg 변수에 저장
            //cast의 6번째 항목까지의 프로필 사진 출력
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

        //기존에 영화 상세정보가 있기 때문에 누적합산을 해줘야한다
        mainContainer.innerHTML += castRowHtml

    } catch (error) {
        console.log('에러 발생:',error)
    }

}
