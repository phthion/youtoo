const API_KEY = 'AIzaSyDpifV8J2_NIouCqiTBiQFTiAt-YH-XNWU';
const BLOCKED_CHANNELS = ['ChannelName1', 'ChannelName2']; // Add channels here
const BLOCKED_KEYWORDS = ['keyword1', 'keyword2']; // Add keywords here

async function fetchVideos(query = '') {
    const grid = document.getElementById('video-grid');
    const endpoint = query 
        ? `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=15&key=${API_KEY}`
        : `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&chart=mostPopular&maxResults=15&key=${API_KEY}`;
    
    const response = await fetch(endpoint);
    const data = await response.json();
    
    grid.innerHTML = '';
    
    data.items.forEach(video => {
        const title = video.snippet.title;
        const channel = video.snippet.channelTitle;
        
        // Filter logic
        const isBlocked = BLOCKED_CHANNELS.includes(channel) || 
                          BLOCKED_KEYWORDS.some(word => title.toLowerCase().includes(word.toLowerCase()));
        
        if (!isBlocked) {
            grid.innerHTML += `
                <div class="cursor-pointer" onclick="window.location.href='watch.html?id=${video.id.videoId || video.id}'">
                    <img src="${video.snippet.thumbnails.high.url}" class="rounded-xl w-full">
                    <h3 class="font-bold mt-2">${title}</h3>
                </div>
            `;
        }
    });
}
