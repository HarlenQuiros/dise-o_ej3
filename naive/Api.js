const axios = require('axios');

class BromeliaPictInventory {
    constructor(pixabayApiKey, unsplashAccessKey) {
        this.pixabayApiKey = pixabayApiKey;
        this.unsplashAccessKey = unsplashAccessKey;
        this.pixabayUrl = 'https://pixabay.com/api/';
        this.unsplashUrl = 'https://api.unsplash.com/search/photos';
    }

    async fetchPixabayPhotos(query) {
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

    async fetchUnsplashPhotos(query) {
        const url = `${this.unsplashUrl}?query=${encodeURIComponent(query)}&client_id=${this.unsplashAccessKey}`;
        const response = await axios.get(url);
        return response.data.results.map(result => ({
            id: result.id,
            url: result.urls.regular,
            likes: result.likes,
            downloads: result.downloads || 0, // Unsplash doesn't provide downloads in this endpoint
            views: result.views || 0, // Unsplash doesn't provide views in this endpoint
            source: 'unsplash'
        }));
    }

    rankPhotosResult(listaFotosUnsplash, listaFotosPixabay) {
        const listaFotos = [...listaFotosUnsplash, ...listaFotosPixabay];

        // Criteio para el ranking: likes + (descargas / 10) + (vistas / 100)
        const rankedPhotos = listaFotos.sort((a, b) => {
            const scoreA = a.likes + (a.downloads / 10) + (a.views / 100);
            const scoreB = b.likes + (b.downloads / 10) + (b.views / 100);
            return scoreB - scoreA;
        });

        // Return top 10 photos
        return rankedPhotos.slice(0, 10);
    }

    // Main method to search and rank photos
    async searchAndRankPhotos(query) {
        try {
            const [pixabayPhotos, unsplashPhotos] = await Promise.all([
                this.fetchPixabayPhotos(query),
                this.fetchUnsplashPhotos(query)
            ]);

            return this.rankPhotosResult(unsplashPhotos, pixabayPhotos);
        } catch (error) {
            console.error('Error fetching photos:', error);
            return [];
        }
    }
}

module.exports = BromeliaPictInventory;

// Example usage:
// const inventory = new BromeliaPictInventory('your_pixabay_key', 'your_unsplash_access_key');
// inventory.searchAndRankPhotos('cats').then(console.log);