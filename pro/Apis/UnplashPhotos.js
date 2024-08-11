const axios = require('axios');
export class UnplashPhotos{
    constructor(unsplashAccessKey){
        this.unsplashUrl = 'https://api.unsplash.com/search/photos'
        this.unsplashAccessKey = unsplashAccessKey
    }

    getPhotos(query){
        const url = `${this.unsplashUrl}?query=${encodeURIComponent(query)}&client_id=${this.unsplashAccessKey}`;
        const response = await axios.get(url);
        return response.data.results.map(result => ({
            id: result.id,
            url: result.urls.regular,
            likes: result.likes,
            source: 'unsplash'
        }));
    }
}