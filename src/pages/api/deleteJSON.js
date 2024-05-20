import fs from 'fs';
const {readFile} = require('fs/promises');
async function deleteJSON(index){

    console.log(index);

    const data = await readFile("books.json");
    let books_json = JSON.parse(data.toString());

    console.log(books_json);
    delete books_json.result[index];

    let valuesArray = Object.values(books_json.result);

    let newResult = {};
    for(let i = 0; i < valuesArray.length; i++){
        newResult[i] = valuesArray[i];
    }

    books_json = {result:newResult};

    fs.writeFile("books.json", JSON.stringify(books_json), function(err, result) {
        if(err) console.log('error', err);
    });
}

export default function handler(req, res){
    deleteJSON(req.query.q);
    return res.json();
}