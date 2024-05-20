const {readFile} = require('fs/promises');
async function readJSON(){

    const data = await readFile("books.json");
    return JSON.parse(data.toString());
}

export default async function handler(req, res) {
    try {
        const data = await readJSON();
        res.status(200).json({data});
    } catch (err) {
        res.status(500).json({error: 'failed to load data'})
    }
}