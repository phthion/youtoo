const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';
const BLOCKED = ['Channel1', 'BadWord']; 

async function fetchVideos(q = '') {
    const url = q 
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${q}&type=video&maxResults=12&key=${API_KEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=12&key=${API_KEY}`;
    
    const res = await fetch(url);
    const data = await res.json();
    const grid = document.getElementById('video-grid');
    grid.innerHTML = '';
    
    data.items.forEach(v => {
        const title = v.snippet.title;
        if (!BLOCKED.some(b => title.includes(b))) {
            const id = v.id.videoId || v.id;
            grid.innerHTML += `
                <div class="cursor-pointer" onclick="window.location.href='watch.html?id=${id}'">
                    <img src="${v.snippet.thumbnails.high.url}" class="rounded-xl w-full">
                    <h3 class="font-bold text-sm mt-2">${title}</h3>
                </div>`;
        }
    });
}

function toggleTheme() {
    document.body.classList.toggle('dark');
}
fetchVideos();
