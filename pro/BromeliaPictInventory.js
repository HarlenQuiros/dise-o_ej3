import { Adapter } from "./Adapter";
import { PixabayPhotos } from "./Apis/PixbayPhotos";
import { UnplashPhotos } from "./Apis/UnplashPhotos";

class BromeliaPictInventory {
    constructor(algorythm) {
        this.algorythm = algorythm;
        this.unplash = new UnplashPhotos(UNPLASHKEY)
        this.pixabay = new PixabayPhotos(PIXABAYKEY)
    }    

    rankPhotosResult(unplashPhotosList, pixBayPhotosList){
        const adapter = new Adapter()
        const sameFormatPhotos = adapter.adapt(unplashPhotosList, pixBayPhotosList)
        const sortedPhotos = this.algorythm.getSortedPhotos(sameFormatPhotos)
        return sortedPhotos
    }

    // Ahora se podra cambiar el algoritmo de optencion de imagenes en cualquier momento
    setAlgorythm(algorythm){
        this.algorythm = algorythm
    }
}

