import * as backend from "@/app/backend";

async function displayJSON(json_str) {
    var str = json_str['q'];
    var iteration = JSON.parse(str).data.result;
    var htmlstr = "<div class='flex flex-wrap'>";
    for (let i = 0; i < Object.keys(iteration).length; i++) {
        htmlstr += "<div class='book-box box-border border-black m-2 h-96 w-80 max-h-96 max-w-80 p-4 border-4 bg-gray-500 m4 relative'>"
            + "<div class='text-2xl font-medium'>" + iteration[i].book_title + "</div>"
            + "<div class='text-xl font-normal'>" + (iteration[i].author).toString() + "</div>"
            + "<div class='text-xl font-light'>" + iteration[i].isbn + "</div>"
            + "<img style='height:50%' src='" + iteration[i].cover + "' alt='Book cover'>"
            + "<div class='absolute text-2xl font-medium' style='bottom:0'>" + getStars(Math.round(iteration[i].rating)) + "</div>"
            + "</div>"
    }
    htmlstr += "</div>"
    return htmlstr;
}

function getStars(stars){
    switch(stars) {
        case 0:
            return '☆☆☆☆☆';
        case 1:
            return '★☆☆☆☆'
        case 2:
            return '★★☆☆☆'
        case 3:
            return '★★★☆☆'
        case 4:
            return '★★★★☆'
        case 5:
            return '★★★★'
        default:
            return '☆☆☆☆☆'
    }
}

export default async function handler(req, res) {
    try {
        const html = await displayJSON(req.query);
        res.status(200).json({html});
    } catch (err) {
        res.status(500).json({error: 'failed to load data'})
    }
}