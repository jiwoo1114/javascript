const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzdhNmI5NjBiYjIxZmYzOTIzMWIyNGU4NzE1YzU4YSIsIm5iZiI6MTczMDA3NjEyMS4wMTQ4MTMsInN1YiI6IjY3MWFlOWI0MjdiZDU3ZDkxZjYyODA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PQHiyeqlSMznOrvnbc8XsEj_ILEDbQOn9GcyeDZTLrI'
  }
};

//현재 페이지의 url을 사용하여  URLSearchParams 객체 생성
const urlParams = new URLSearchParams(window.location.search)

const programid = urlParams.get('program_id')


const urlDetail =`https://api.themoviedb.org/3/tv/${programid}?language=ko-KR`


const mainContainer = document.querySelector('main .container')
let rowsHtml =''


//tv프로그램 상세정보 바인딩

const programDetail = async (urlDetail) => {
    try {
        const response = await (fetch(urlDetail, options))
        const data = await response.json()

        console.log(data)

        const imgSrc = `https://image.tmdb.org/t/p/w300${data.poster_path}`


        const rowHtml=`<div class="row">
                    <div class="col-md-3" style="text-align: center;">
                            <img src="${imgSrc}" alt=${data.name} class=poster-detail style="max-width:100%">
                    </div>
                    <div class="col-md-9 program-name">
                        <h2 style="margin-top:40px;">${data.name}</h2>
                        <ul class ="program-info">
                            <li>원제${data.original_name}</li>
                            <li>평점${data.vote_average} </li>
                            <li>처음방영일:${data.first_air_date} </li>
                            <li>최근방영일:${data.last_air_date} </li>
                        </ul>
                    <p>${data.overview}</p>
                </div>`
        
        mainContainer.innerHTML += rowHtml
        await program_seaseon(urlDetail)
       
    } catch (error) {
        console.log('에러 발생했습니다:',error)
    }
}

programDetail(urlDetail)

//시즌 정보 바인딩
const program_seaseon = async (urlDetail) => {
    try {
       const response = await fetch(urlDetail, options)
        const data = await response.json()

        let season_rowHtml = '<div class = "row", style="margin-top: 30px";>'  

        for (let i = 0; i < data.seasons.length; i++) { 


             let seasons = data.seasons.map((season) => {
            return `${season.name} (평점: ${!season.vote_average? '미반영':season.vote_average})
            보러가기 - ${!season.air_date?'기재 요망':season.air_date} 방영`
             })
            
               season_rowHtml += `<div col-md-3 p-3 m-20" >
                                     <p class="card-season">${seasons[i]}</p>   
                                 </div>`
        
        }
        
        season_rowHtml += '</div>'

        mainContainer.innerHTML += season_rowHtml

    } catch (error) {
        console.log('에러 발생:',error)
    }
}

  