const API_KEY = "AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU"

const API_URL =
"https://www.googleapis.com/youtube/v3/search"


async function searchVideos(query){

const url =
`${API_URL}?part=snippet&type=video&maxResults=20&q=${query}&key=${API_KEY}`

const res = await fetch(url)

const data = await res.json()

return data.items

}
