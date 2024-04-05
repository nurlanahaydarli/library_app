/* ======================== HTML elements ========================= */
let contact_form = document.getElementById("contact_form");
let name_input = document.querySelector("#name");
let phone_input = document.querySelector("#phone");
let address_input = document.querySelector("#address");
let email_input = document.querySelector("#email");
let alert_box = document.querySelector(".alert_box");
let contact_list = document.querySelector("#contact_list")
let modal_alert = document.querySelector(".modal_alert")
let close_alert = document.querySelector(".close_alert")
let submit_alert = document.querySelector(".submit_alert")
let modal_body_custom = document.querySelector(".modal_body_custom")
let modal_data = document.querySelector(".modal_data")
let modal_body_show = document.querySelector(".modal_body_show")
let close_data = document.querySelector(".close_data")
let description_about = document.querySelector("#description_about")
let image_url = document.querySelector("#image_url")
let about_title = document.querySelector("#about_title")
let add_about_btn = document.querySelector(".add_about_btn")
let user_name = document.querySelector("#user_name")
let user_email = document.querySelector("#user_email")
let submit_join = document.querySelector(".submit_join")
let join_us_shadow = document.querySelector(".join_us_shadow")
let join_us_box = document.querySelector(".join_us_box")
let join_us_table = document.querySelector("#join_us_table")
let type_name = document.querySelector("#type_name")
let book_category_submit = document.querySelector(".book_category_submit")
let book_type = document.querySelector("#book_type")
let modal_category = document.querySelector(".modal_category")
let about_img_box = document.querySelector(".about_img_box")
let about_title_web = document.querySelector(".about_title")
let about_desc = document.querySelector(".about_desc")




import {initializeApp} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    child,
    set,
    get,
    onValue,
    update,
    remove,
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXchTsvIYu76qNlWKP8XaYtitk6X1qyG8",
    authDomain: "library-custom-edb5a.firebaseapp.com",
    projectId: "library-custom-edb5a",
    storageBucket: "library-custom-edb5a.appspot.com",
    messagingSenderId: "1044082173381",
    appId: "1:1044082173381:web:af78fac5c86fa79d8b57ac"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const db = getDatabase()
/* ======================== Firebase Methods ========================= */

function writePushData(collection, data) {
    try {
        if (!collection) {
            alert('Required collection')
            return
        }
        const contactRef = ref(db, collection)
        push(contactRef, data)
        // location.reload()
    } catch (err) {
        console.log(err, 'err')
    }
}
function writeSetData(collection, data) {
    try {
        if (!collection) {
            alert('Required collection')
            return
        }
        const contactRef = ref(db, collection)
        set(contactRef, data)
        // location.reload()
    } catch (err) {
        console.log(err, 'err')
    }
}
function convertData(d) {
    const newData = Object.entries(d);
    const myNewData = newData.map((arr) => {
        const newObj = {
            id: arr[0],
            ...arr[1],
        };
        return newObj;
    });
    return myNewData;
}
function rmvData(id, col) {
    const dataRef = ref(db, col + "/" + id);
    remove(dataRef);
}


/* ======================== Submit Forms ========================= */

contact_form?.addEventListener("submit", function (e) {
    e.preventDefault();
    let name = e.target.name.value;
    let email = e.target.email.value;
    let phone = e.target.phone.value;
    let address = e.target.address.value;
    let note = e.target.note.value;

    if (!name) {
        name_input.classList.add("is-invalid")
    } else {
        name_input.classList.remove("is-invalid")
    }
    if (!email) {
        email_input.classList.add("is-invalid")
    } else {
        email_input.classList.remove("is-invalid")
    }
    if (!phone) {
        phone_input.classList.add("is-invalid")
    } else {
        phone_input.classList.remove("is-invalid")
    }
    if (!address) {
        address_input.classList.add("is-invalid")
    } else {
        address_input.classList.remove("is-invalid")
    }

    if (!name || !email || !phone || !address) {
        return
    }
    let form = {
        name,
        email,
        phone,
        address,
        note
    }
    if (form) {
        alert_box.innerHTML = `
                    <div class="alert mt-3 alert-success" role="alert">
                      Form added!
                    </div>
                    `
    }
    setTimeout(() => {
        alert_box.innerHTML = ''
    }, 3000)
    writePushData('contacts', form)
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
    e.target.address.value = "";
    e.target.note.value = "";
})
add_about_btn?.addEventListener("click", function (e) {
    e.preventDefault()
    let about = description_about.value;
    let title = about_title.value;
    let image = image_url.value;
    if (!about) {
        description_about.classList.add("is-invalid")
    } else {
        description_about.classList.remove("is-invalid")
    }
    if (!title) {
        about_title.classList.add("is-invalid")
    } else {
        about_title.classList.remove("is-invalid")
    }
    if (!image) {
        image_url.classList.add("is-invalid")
    } else {
        image_url.classList.remove("is-invalid")
    }
    if (!image || !title || !about) {
        return
    }
    let form = {
        title,
        image,
        about,
    }
    writeSetData('about', form)
    if (form) {
        alert_box.innerHTML = `
        <div class="alert mt-3 alert-success" role="alert">
          About added!
        </div>
        `
    }
    setTimeout(() => {
        alert_box.innerHTML = ''
    }, 3000)
    description_about.value="";
    about_title.value = "";
    image_url.value = "";
})
book_category_submit?.addEventListener("click", function (e) {
    e.preventDefault()
    let category_name = type_name.value;
    if (!category_name) {
        type_name.classList.add("is-invalid")
    } else {
        type_name.classList.remove("is-invalid")
    }
    if (!category_name) {
        return
    }
    let form = {
        category_name,
    }
    writePushData('categories', form)
    if (form) {
        alert_box.innerHTML = `
        <div class="alert mt-3 alert-success" role="alert">
          About added!
        </div>
        `
    }
    setTimeout(() => {
        alert_box.innerHTML = ''
    }, 3000)
    type_name.value = "";
    modal_category.style.display="none"

})
submit_join?.addEventListener("click",function (e){
    e.preventDefault()
    let name = user_name.value;
    let email = user_email.value;
    if (!name) {
        user_name.classList.add("is-invalid")
    } else {
        user_name.classList.remove("is-invalid")
    }
    if (!email) {
        user_email.classList.add("is-invalid")
    } else {
        user_email.classList.remove("is-invalid")
    }
    if (!name || !email) {
        return
    }
    let form = {
        name,
        email,
    }
    writePushData('join_us', form)
    if (form) {
        alert_box.innerHTML = `
        <div class="alert mt-3 alert-success" role="alert">
          About added!
        </div>
        `
    }
    join_us_box.style.display="none"
    join_us_shadow.style.display="none"

    setTimeout(() => {
        alert_box.innerHTML = ''
    }, 1000)
    user_name.value= "";
    user_email.value = "";
})


/* ======================== Show About Collection ========================= */
function showAboutData(data) {

}
showAboutData()

/* ======================== Show Join Us Collection ========================= */
onValue(ref(db, "join_us"), renderJoinUS);
function renderJoinUS(snaphot) {
    const data = convertData(snaphot.val());
    let data_list = data.map((item, index) => {
        return `
            <tr>
                <td>${index+1}</td>
                <td>${item.name}</td>
                <td>${item.email}</td>
            </tr>
        `
    }).join("")
    join_us_table.innerHTML = data_list;
    return data
}

/* ======================== Show Categories Collection ========================= */
onValue(ref(db, "categories"), renderCategory);
function  renderCategory(snaphot){
    const data = convertData(snaphot.val());
    let data_list = data.map((item, index) => {
        return `
            <option value="${item.id}">${item.category_name}</option>
        `
    }).join("")
    book_type.innerHTML = data_list;
    return data
}
/* ======================== Show Abput Collection ========================= */
onValue(ref(db, "about"), renderAbout);
function  renderAbout(snaphot){
    const data = snaphot.val();
    // about_title_web.innerHTML = data.title
    // about_desc.innerHTML = data.about
    // about_img_box.src = data.image
    // about_img_box.alt = data.title
    description_about.value = data.about
    image_url.value= data.image
    about_title.value = data.title
    return data
}

/* ======================== Show Contact Collection ========================= */
function getDatas() {
    const db_ref = ref(db)
    get(child(db_ref, 'contacts')).then((snapshot) => {
        if (snapshot.exists()) {
            let dataArr = Object.entries(snapshot.val())
            let data_list = dataArr.map((item) => {
                const newObj = {
                    id: item[0],
                    ...item[1],
                };
                return newObj
                // console.log(item,'item')

            })
            let data_list_mapping = data_list.map((item, index) => {
                return `
            <tr data-id="${item.id}">
                <td>${index + 1}</td>
                <td>${item.name}</td>
                <td>${item.address.substr(0, 10)}${item.address.length > 10 ? '...' : ''}</td>
                <td>${item.email}</td>
                <td>${item.phone}</td>
                <td>${item.note.substr(0, 10)}${item.note.length > 10 ? '...' : ''} </td>
                <td>
                <div class="d-flex align-items-center gap-1 justify-content-end">
                    <button type="button" class="text-danger btn removeDoc" data-id="${item.id}"><i class="fas fa-trash"></i> </button> 
                    <button  class="text-success btn showDoc" data-id="${item.id}"><i class="fas fa-eye"></i> </button>
                </div>
                </td>
            </tr>
        `
            }).join("")
            contact_list.innerHTML = data_list_mapping;

            let btns = document.getElementsByClassName('removeDoc');
            for (let i = 0; i < btns.length; i++) {
                btns[i].addEventListener('click', function () {
                    let id = btns[i].getAttribute('data-id')
                    handlerRmv(id)
                })
            }
            let showDocs = document.getElementsByClassName('showDoc');
            for (let i = 0; i < showDocs.length; i++) {
                showDocs[i].addEventListener('click', function () {
                    let item = showDocs[i].getAttribute('data-id')
                    showData(item)
                })
            }

            return data_list
        }
    }).catch((err) => {
        console.log(err, 'err')
    })
}
async function showData(id) {
    modal_data.classList.add("show");
    let dataRef = ref(db, 'contacts' + "/" + id);
    get(dataRef).then(function (snapshot) {
        let data = snapshot.val();
        modal_body_show.innerHTML = `
        <ul class="list-group">
          <li class="list-group-item">Name: ${data.name}</li>
          <li class="list-group-item">Address: ${data.address}</li>
          <li class="list-group-item">Phone: ${data.phone}</li>
          <li class="list-group-item">Email: ${data.email}</li>
          <li class="list-group-item">Note: ${data.note}</li>
        </ul>
`
    }).catch(function (error) {
        console.error("Error getting data:", error);
    });
}
getDatas()

/* ======================== Remove Contacts Collection ========================= */
function handlerRmv(id) {
    modal_alert.classList.add("show");
    modal_body_custom.innerHTML = `
                    <div class="alert alert-danger" role="alert">
                        Are you sure delete contact??
                    </div>
                    `
    submit_alert.addEventListener("click", function () {
        rmvData(id, 'contacts')
        modal_alert.classList.remove("show")
        location.reload()
    })
    return id
}

/* ======================== UI alerts Events ========================= */
close_alert?.addEventListener('click', function () {
    modal_alert.classList.remove("show")
})
close_data?.addEventListener('click', function () {
    modal_data.classList.remove("show")
})





