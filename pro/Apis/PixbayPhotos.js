const axios = require('axios');
class PixabayPhotos{
    constructor (query, pixabayApiKey) {
        this.pixabayUrl = 'https://pixabay.com/api/';
        this.query = query;
        const url = `${this.pixabayUrl}?key=${this.pixabayApiKey}&q=${encodeURIComponent(query)}&image_type=photo`;
        const response = await axios.get(url);
        // Se guardan las fotos recibidas
        this.photos = response.data.hits.map(hit => ({
            id: hit.id,
            url: hit.largeImageURL,
            likes: hit.likes,
            downloads: hit.downloads,
            views: hit.views,
            source: 'pixabay'
        }));
        
    }
    getPhotos(){
        return this.photos
    }
}
