/* ======================== HTML elements ========================= */
let contact_form = document.getElementById("contact_form");
let name_input = document.querySelector("#name");
let phone_input = document.querySelector("#phone");
let address_input = document.querySelector("#address");
let email_input = document.querySelector("#email");
let alert_box = document.querySelector(".alert_box");
let contact_list = document.querySelector("#contact_list")


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

function writeSetContactData(collection, data) {
    try {
        if (!collection) {
            alert('Required collection')
            return
        }
        const contactRef = ref(db, collection)
        console.log(contactRef, 'contactRef')
        set(contactRef, data)
    } catch (err) {
        console.log(err, 'err')
    }
}

function writePushContactData(collection, data) {
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
    writePushContactData('contacts', form)
    e.target.name.value = "";
    e.target.email.value = "";
    e.target.phone.value = "";
    e.target.address.value = "";
    e.target.note.value = "";
})

onValue(ref(db, "contacts"), renderContacts);


function renderContacts(snaphot) {
    const data = convertData(snaphot.val());
    let data_list = data.map((item, index) => {
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
                    <button onclick="handlerRmv()" class="text-danger btn"><i class="fas fa-trash"></i> </button> 
                    <button onclick=showData(${item.id}) class="text-success btn"><i class="fas fa-eye"></i> </button>
                </div>
                </td>
            </tr>
        `
    }).join("")
    contact_list.innerHTML = data_list;
    return data
}

function handlerRmv() {
    console.log('test')
}


function rmvData(id, col) {
    const dataRef = ref(db, col + "/" + id);
    remove(dataRef);
}
// rmvData(id,'contacts')



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

function showData(data) {
    console.log(data, 'datadata')
}



