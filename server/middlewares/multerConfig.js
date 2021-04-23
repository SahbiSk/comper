const multer=require('multer')


const MIME_TYPES = {
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'uploads');
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
  }
});
  
  
  const filefilter=(req,file,cb)=>{
  
      if(file.mimetype==='image/jpeg'|| file.mimetype==='image/png' )
      cb(null,true)
  
      else cb(new Error('the format must be JPEG or PNG'),false)
  }
  
  
  const upload=multer({storage:storage, limits:{fileSize:1024*1024*10},fileFilter:filefilter})
  
  







module.exports=upload;