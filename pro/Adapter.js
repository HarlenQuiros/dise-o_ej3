export class Adapter {
    constructor(unplash, pixabay){
    }
    adapt(unplashPhotosList, pixBayPhotosList){
        // Aqui deberia de ir la implementaion para adaptar ambos tipos de fotos en un solo formato
        const formatedUnplashPhotos = unplashPhotosList.map(photo => ({
            id: photo.id,
            url: photo.urls.regular,
            likes: photo.likes,
            downloads: photo.downloads,
        }).json())
        const formatedPixabayPhotos = pixBayPhotosList.map(photo => ({
            id: photo.id,
            url: photo.largeImageURL,
            likes: photo.likes,
            downloads: photo.downloads || 0,
        }).json())
        // Se retornan todas las fotos en el mismo formato 
        return formatedPixabayPhotos.concat(formatedUnplashPhotos)
    }

}