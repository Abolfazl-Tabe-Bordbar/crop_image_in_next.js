const multer  = require('multer');
const mkdirp = require('mkdirp');



const cropImageStore = multer.diskStorage({

    destination : ( req , file , callback) => {

        let dir = `./upload/cropImage`;
        // ----------------------------------------------

        mkdirp(dir).then(answer => callback( null , dir)).catch(error => callback( error , dir))

    },
    filename : ( req , file , callback ) => {
        callback( null , Date.now() + file.originalname )
    }
});



const cropImage = multer({
    storage : cropImageStore,
});

module.exports =  {
    cropImage
}

