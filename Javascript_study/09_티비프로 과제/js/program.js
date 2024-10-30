const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3YzdhNmI5NjBiYjIxZmYzOTIzMWIyNGU4NzE1YzU4YSIsIm5iZiI6MTczMDE4MzA3OC40MTY2MjcsInN1YiI6IjY3MWFlOWI0MjdiZDU3ZDkxZjYyODA4MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.iWpXj1swlM8YwlJCLypoCygAZw24G4byuMwIwMigzvc'
  }
};


const url = 'https://api.themoviedb.org/3/tv/top_rated?language=ko-KR&page=1'

const popularprogram = async (url) => {
    try {
        const response = await fetch(url, options)
        const data = await response.json()
        console.log(data)

        const results = data.results
        const container = document.querySelector('main .container')
        let rowsHtml = ''

        for (let i = 0; i < results.length; i += 4) {
            let rowHtml = '<div class="row">'

            //4번 반복 => col을 4개 만들어준다
            for (let j = 0; j < 4; j++) {
                const index = i + j
                if (index >= results.length) break //results 배열을 벗어나면 중단

                const program = results[index]

                rowHtml += `
                <div class="col-sm-3 p-3";>
                    <div class="card">
                        <a href="./showdetail.html?program_id=${program.id}">
                           <img src="https://image.tmdb.org/t/p/w500${program.poster_path}" class="card-img-top poster" alt="${program.name}" />
                        </a>
                        <div class="card-body">
                           <p class="card-text title">${program.name}</p>
                           <p class="card-overview">${!program.overview ? '줄거리 기재 요망': program.overview }
                             <p class="card-text date">${program.vote_average}

                        </div>
                    </div>
                </div>
                `
            }

            rowHtml += '</div>'
            rowsHtml += rowHtml
        }
         container.innerHTML = rowsHtml 
    } catch (error) {
        console.log('에러 발생:', error)
    }
}
popularprogram(url)
