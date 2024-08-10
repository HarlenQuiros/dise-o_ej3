const axios = require('axios');
class UnplashPhotos{
    constructor(query,unsplashAccessKey){
            this.unsplashUrl = 'https://api.unsplash.com/search/photos'
            const url = `${this.unsplashUrl}?query=${encodeURIComponent(query)}&client_id=${this.unsplashAccessKey}`;
            const response = await axios.get(url);
            this.photos = response.data.results.map(result => ({
                id: result.id,
                url: result.urls.regular,
                likes: result.likes,
                downloads: result.downloads || 0, // Unsplash doesn't provide downloads in this endpoint
                views: result.views || 0, // Unsplash doesn't provide views in this endpoint
                source: 'unsplash'
            }));

    }
}