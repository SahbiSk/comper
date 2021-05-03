
const express = require('express')
const app = express()
var bodyParser = require('body-parser')
const config=require('./config')
const cookieParser = require('cookie-parser')
const auth=require('./middlewares/authenticate')
const product=require('./routes/products')



const upload=require('./middlewares/multerConfig')


app.use(cookieParser());



const port = 3000
const mongoose=require('mongoose')




mongoose.set('useNewUrlParser', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useCreateIndex', true);
mongoose.set('useUnifiedTopology', true);

app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use('/uploads' ,express.static('uploads'))
const url=config.mongoUrl;




const connect = mongoose.connect(url);

connect.then((db)=>{
  console.log('Connected correctly to server');
},(err)=>{
  console.log("error connection");
});





app.get('/',(req, res) => {


  res.send('hello world')
 
 
})

app.use('/products',require('./routes/products'))
app.use('/users',require('./routes/users'))
app.use('/favourites',require('./routes/favourites'))
app.use('/cart',require('./routes/cart'))
app.use('/orders',require('./routes/order'))



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

