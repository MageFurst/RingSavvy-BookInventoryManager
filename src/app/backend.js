

export function createJSON(isbn) {
    fetch('/api/readJSON')
        .then(response => response.json())
        .then((data) => {
            var books_json = data.data;
            if(Object.keys(books_json.result).length > 0){
                fetch('https://openlibrary.org/search.json?q=' + isbn + '&fields=key,title,author_name,ratings_average')
                    .then(response => response.json())
                    .then((data) => {
                        books_json.result[Object.keys(books_json.result).length] = {book_title:data.docs[0].title, author:data.docs[0].author_name, isbn: isbn, rating: data.docs[0].ratings_average, cover: 'https://covers.openlibrary.org/b/isbn/' + isbn + '-M.jpg'}
                        fetch('/api/writeJSON?q=' + JSON.stringify(books_json))
                            .then(response => response)
                            .then((data) => {
                                console.log(data);
                                location.reload();
                            });
                    });
            }
            else{
                fetch('https://openlibrary.org/search.json?q=' + isbn + '&fields=key,title,author_name,ratings_average')
                    .then(response => response.json())
                    .then(async (data) => {
                        var books = {result:{0:{book_title:data.docs[0].title, author:data.docs[0].author_name, isbn: isbn, rating: data.docs[0].ratings_average, cover: 'https://covers.openlibrary.org/b/isbn/' + isbn + '-M.jpg'}}}
                        fetch('/api/writeJSON?q=' + JSON.stringify(books))
                            .then(response => response)
                            .then((data) => {
                                console.log(data);
                                location.reload();
                            });
                    });
            }
        });
}

export function deleteJSON(index){
    fetch('/api/deleteJSON?q=' + index)
        .then(response => response)
        .then((data) => {
            console.log(data);
            location.reload();
        });
}
export function getJSON() {
    fetch('/api/readJSON')
        .then(response => response.json())
        .then((data) => {
            return data.data;
        })
}