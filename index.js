import express from 'express'
import router from './router.js';
import { multipleParamsController, notfoundController, postController, putController } from './controller.js';
import fs from 'fs';
import multer from 'multer';


const app = express();
const PORT = 3000;
const storage = multer.diskStorage({
  destination: 'uploads',
  filename: (req, file, callback)=> {
    callback(null, file.fieldname+'_'+Date.now()+file.originalname)
  }
})
const upload = multer({storage})

app.use(express.urlencoded({extended: true}))
app.use(upload.single('file'))

// Middleware to parse JSON request bodies
app.use('/public', express.static('public'))
app.use('/images', express.static('images'))

app.post('/form', (req, res)=> {
   console.log(req.body);
   console.log(req.file);
   res.send("Form Received")
})

app.use(express.json());

app.use('/informal', (res, req, next)=> {
  req.on('finish', ()=> {
    console.log("this is the End.")
  })
  next();
})
// ======================
//  Normal Routing
// ======================
app.get("/", (req, res) => {
  res.send("Hello Express");
});

// ======================
//  Dynamic Routing
// ======================
app.use("/user", router);

app.post("/users", postController);

app.put("/users/:id", putController);


app.get("/multiple/:thing/:id", multipleParamsController);

app.use('/error', ()=> {
   throw new Error("this is mock")
})

app.use((err, req, res, next)=> {
   console.error(err.message);
   res.send('internal Server Error')
})
app.use(notfoundController)


app.listen(PORT, () => {
  console.log(`server running on http://localhost:${PORT}`);
});
