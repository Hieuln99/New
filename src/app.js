const express = require ('express')
const {Int32} = require('mongodb');
const exphbs = require('express-handlebars');
const { DeleteS, Search, updateStudent, getAll, getPro, insert} = require('./databasehandle');

const app = express()
app.engine('handlebars',exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.set('view engine','hbs')

app.post('/insert', async (req,res)=>{
    const nameInput = req.body.txtName;
    const picInput= req.body.txtPic;
    const priceInput= req.body.txtPrice;
    const newPro = {name: nameInput,pic: picInput,price: Int32(priceInput)};
    await insert(newPro);
// chuyen huong den file index
    res.redirect('/');
})
app.post('/insert1', async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput= req.body.txtTuoi;
    const newStudent = {name: nameInput,tuoi: Int32(tuoiInput)};
    await insertStudent(newStudent);
// chuyen huong den file index
    res.render('addToy');
})

app.get('/delete',async (req,res)=>{
    const IdInput = req.query.id;
    await DeleteS(IdInput)
    res.redirect('/');
})
app.get('/addToy',(_req,res)=>{
    res.render('addToy')
})
app.get('/information',(_req,res)=>{
    res.render('information')
})

app.post('/search',async (req,res)=>{
    const SearchIn = req.body.txtSearch;
    const allStudents = await Search(SearchIn);
    res.render('index',{data:allStudents})
})
app.post('/update',async (req,res)=>{
    const Id = req.body.id;
    const inputName = req.body.txtName;
    const inputTuoi= req.body.txtTuoi;
    await updateStudent(Id,inputName,inputTuoi)
    res.redirect('/');
})

app.get('/edit',async (req,res)=>{
    const Id = req.query.id;
    const Search = await getPro(Id)
    res.render('edit',{pro: Search});
})

app.get('/',async (_req,res)=>{
    const all =  await getAll();
    res.render('index',{data:all})
})

const PORT = process.env.PORT ||5000;
app.listen(PORT);






