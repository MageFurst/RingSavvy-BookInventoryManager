import fs from 'fs';
function writeJSON(json_str){
    var str = json_str['q'];
    fs.writeFile("books.json", str, function(err, result) {
        if(err) console.log('error', err);
    });
}

export default function handler(req, res){
    writeJSON(req.query);
    return res.json();
}