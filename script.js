const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';

async function fetchVideos() {
    const grid = document.getElementById('video-grid');
    const status = document.getElementById('status');
    
    try {
        const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails&chart=mostPopular&maxResults=15&key=${API_KEY}`;
        const response = await fetch(url);
        const data = await response.json();
        
        grid.innerHTML = ''; 
        
        data.items.forEach(video => {
            // Filter logic: Check if video is longer than 60 seconds
            const duration = video.contentDetails.duration;
            if (duration.includes('M') && !duration.includes('PT0M')) {
                grid.innerHTML += `
                    <div class="cursor-pointer hover:scale-105 transition duration-200" onclick="window.location.href='watch.html?id=${video.id}'">
                        <img src="${video.snippet.thumbnails.high.url}" class="rounded-xl w-full aspect-video object-cover shadow-md">
                        <h2 class="font-bold mt-3 text-gray-800 leading-snug">${video.snippet.title}</h2>
                        <p class="text-gray-500 text-sm mt-1">${video.snippet.channelTitle}</p>
                    </div>
                `;
            }
        });
    } catch (err) {
        status.innerText = "Error loading videos. Check your API key or internet connection.";
    }
}

fetchVideos();
