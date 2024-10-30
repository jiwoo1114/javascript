const options = {
   method: 'GET',
   headers: {
      accept: 'application/json',
      Authorization:
         'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDI5ZmIzYTNiOGFkZjkzYzNkNTQxNDU4OTczNzA0OSIsIm5iZiI6MTcxOTg5NTcxOS43NjI4OSwic3ViIjoiNjI0ZDQzNDFjMzkyNjYwMDRmOTI5OGJlIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.ruIypQSMtEMHNnGzEoff8malu2AAblE5ehb53jpQTHE',
   },
}

const tvPopularUrl = `https://api.themoviedb.org/3/tv/popular?language=ko-KR&page=1`

const getPopularTv = async (tvPopularUrl) => {
   try {
      const response = await fetch(tvPopularUrl, options)

      const data = await response.json()
      console.log('tv popular:', data)
   } catch (error) {
      console.error('에러 발생:', error)
   }
}

getPopularTv(tvPopularUrl)
