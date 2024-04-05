let search_result =document.querySelector("#search_result")
let book_name_search =document.querySelector("#book_name_search")


async function getBooks(book_name){
    try {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${book_name}`)
        const data = await response.json()
        return data.items
    } catch (err) {
        console.log('err',err);
    }
}

book_name_search.addEventListener("keyup",function (){
    let book_name = book_name_search.value;
    search_result.classList.add("show")
    showBookList(book_name);
})

async function showBookList(bookName){
    bookName = bookName.toLowerCase()
    let book_list = await getBooks()
    let filtered_list = book_list.filter((book)=>{
        let book_name = book.volumeInfo["title"].toLowerCase()
        if(book_name.includes(bookName)){
            return book_name
        }
    })
    console.log(filtered_list,'filtered_list')
    let data_list = filtered_list.map((book)=>{
        return `
        <li>
            <span><i class="far fa-clock"></i></span>
            <button value="${book.id}" class="clicked_data">${book.volumeInfo["title"]}</button>
        </li>
        `
    }).join("")
    search_result.innerHTML = data_list
}
search_result.addEventListener("click",function (e){
    let data = e.target.dataset;
    console.log(data,'book_id')
})

// function showBook(id){
//     console.log(id,'id')
// }