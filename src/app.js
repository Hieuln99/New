const express = require ('express')
const {Int32} = require('mongodb');
const exphbs = require('express-handlebars');
const { insertStudent, DeleteS, Search, updateStudent, getAll, getStudent} = require('./databasehandle');

const app = express()
app.engine('handlebars',exphbs())
app.set('view engine', 'handlebars')

app.use(express.urlencoded({extended: true}))
app.set('view engine','hbs')

app.post('/insert', async (req,res)=>{
    const nameInput = req.body.txtName;
    const tuoiInput= req.body.txtTuoi;
    const newStudent = {name: nameInput,tuoi: Int32(tuoiInput)};
    await insertStudent(newStudent);
// chuyen huong den file index
    res.redirect('/');
})
app.get('/delete',async (req,res)=>{
    const IdInput = req.query.id;
    await DeleteS(IdInput)
    res.redirect('/');
})
app.get('/addToy',(req,res)=>{
    res.render('addToy')
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
    const Searchstudent = await getStudent(Id)
    res.render('edit',{student: Searchstudent});
})

app.get('/',async (req,res)=>{
    const allStudents =  await getAll();
    res.render('index',{data:allStudents})
})

const PORT = process.env.PORT ||5000;
app.listen(PORT);





