const axios = require('axios');
export class PixabayPhotos{
    constructor (pixabayApiKey) {
        this.pixabayUrl = 'https://pixabay.com/api/';
        this.pixabayApiKey = pixabayApiKey;
    }

    getPhotos(query){
        const url = `${this.pixabayUrl}?key=${this.pixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo`;
        const response = await axios.get(url);
        return response.data.hits.map(hit => ({
            id: hit.id,
            url: hit.largeImageURL,
            likes: hit.likes,
            downloads: hit.downloads,
            views: hit.views,
            source: 'pixabay'
        }));
    }
}
