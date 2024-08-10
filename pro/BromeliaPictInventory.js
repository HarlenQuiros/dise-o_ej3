

class BromeliaPictInventory extends Algorythm{
    constructor(pixabayApiKey, unsplashAccessKey) {
        this.pixabayApiKey = pixabayApiKey;
        this.unsplashAccessKey = unsplashAccessKey;
    }    

    rankPhotosResult(unplashPhotosList, pixBayPhotosList, algorythm){
        // Se utilizan nombres de ordenamiento de listas para ejemplificar
        algorythmsAvailable = {"Gnome" : new Gnomesort(unplashPhotosList + pixBayPhotosList),
                               "Quick" : new Quicksort(unplashPhotosList + pixBayPhotosList),
                               "Bucket" : new Bucketsort(unplashPhotosList + pixBayPhotosList)
        }
        this.algorythm = algorythmsAvailable[algorythm];
        const sortedPhotos = this.algorythm.getSortedPhotos()
        return sortedPhotos.slice(0,10)
    }

}

