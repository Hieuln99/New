const {ObjectId,MongoClient} = require('mongodb');
//const url ='mongodb://localhost:27017';
const url = 'mongodb+srv://Hieulngbh:0977953600@cluster0.avzfi.mongodb.net/test';
const DATABASE_NAME = "GCH0803"

async function getdb() {
    const client = await MongoClient.connect(url);
    const dbo = client.db(DATABASE_NAME);
    return dbo;
}
async function insertStudent(newStudent) {
    const dbo = await getdb();
    const newS = await dbo.collection(DATABASE_NAME).insertOne(newStudent);
    console.log("ID: ", newS.insertedId.toHexString());
}
async function DeleteS(IdInput) {
    const dbo = await getdb();
    await dbo.collection(DATABASE_NAME).deleteOne({ _id: ObjectId(IdInput) });
}
async function getStudent(Id) {
    const dbo = await getdb();
    return dbo.collection(DATABASE_NAME).findOne({ _id: ObjectId(Id) });
}
async function getAll() {
    const dbo = await getdb();
    const allStudents = await dbo.collection(DATABASE_NAME).find({}).toArray();
    return allStudents;
}
async function updateStudent(id,nameInput,tuoiInput){
    const dbo  = await getdb();
    dbo.collection(DATABASE_NAME).updateOne({_id:ObjectId(id)},{$set:{name: nameInput, tuoi: tuoiInput}})
}
async function Search(SearchIn) {
    const dbo = await getdb();
    const allStudents = await dbo.collection(DATABASE_NAME).find({ name: SearchIn }).toArray();
    return allStudents;
}

module.exports={getdb, insertStudent, DeleteS, updateStudent,getStudent, Search, getAll}