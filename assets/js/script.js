let close_nav = document.querySelector(".close_nav")
let menu_icon = document.querySelector(".menu_icon")
let nav_list = document.querySelector(".nav_list")
let menu_btn = document.querySelector(".menu_btn")
let main_section = document.querySelector(".main_section")
let join_us_shadow = document.querySelector(".join_us_shadow")
let join_us_box = document.querySelector(".join_us_box")
let join_us_link = document.querySelector(".join_us_link")


join_us_link?.addEventListener("click",function (e){
    join_us_shadow.style.display= "block"
    join_us_box.style.display= "block"
})
join_us_shadow?.addEventListener("click",function (e){
    join_us_shadow.style.display= "none"
    join_us_box.style.display= "none"
})

window.addEventListener("resize", function () {
    let window_width = window.innerWidth;
    if (window_width < 991) {
        nav_list.style.display = "none"
    } else {
        nav_list.style.display = "block"
    }
})
menu_icon?.addEventListener("click", function () {
    nav_list.style.display = "flex"
})
close_nav?.addEventListener("click", function () {
    nav_list.style.display = "none"
})
/* ======================== Admin menu ========================= */

window.addEventListener("resize", function () {
    let window_width = window.innerWidth;
    if (window_width < 991) {
        admin_nav.classList.add("hide")
        main_section.classList.add("margin_0")
    } else {
        admin_nav.classList.remove("hide")
        main_section.classList.remove("margin_0")
    }
})
menu_btn?.addEventListener("click", function () {
    if(admin_nav.classList.contains("hide") && main_section.classList.contains("margin_0")){
        admin_nav.classList.remove("hide")
        main_section.classList.remove("margin_0")
    }else{
        admin_nav.classList.add("hide")
        main_section.classList.add("margin_0")
    }
})
function mobileNavAdmin(){
    let window_width = window.innerWidth;
    if (window_width < 991) {
        admin_nav.classList.add("hide")
        main_section.classList.add("margin_0")
    } else {
        admin_nav.classList.remove("hide")
    }
}

/* ======================== LOGIN SCRIPTS ========================= */
let username = document.getElementById("username")
let password = document.getElementById("password")
let login_btn = document.getElementById("login_btn")
let login_section = document.querySelector(".login_section")
let admin_section = document.querySelector(".admin_section")
let log_out = document.querySelector(".log_out")

const login_storage = JSON.parse(localStorage.getItem("login")) ?? []

let login_data = [
    {
        username: "admin",
        password: "12345",
        isLogin: false

    }
]


login_btn?.addEventListener('click', function (e) {
    let user = username.value
    let pass = password.value
    if (!user) {
        username.classList.add("is-invalid")
    } else {
        username.classList.remove("is-invalid")
    }
    if (!pass) {
        password.classList.add("is-invalid")
    } else {
        password.classList.remove("is-invalid")
    }
    if (!user || !pass) return
    login_data.map((item) => {
        if (item.username === user && item.password === pass) {
            item.isLogin = true
            login_data.push(item)
            localStorage.setItem("login", JSON.stringify(item));
            login_section.classList.remove("show")
            admin_section.classList.remove("hide")
        } else {
            username.classList.add("is-invalid")
            password.classList.add("is-invalid")
            login_section.classList.add("show")
            admin_section.classList.add("hide")
        }
    })
    password.value = ""
    username.value = ""

})
log_out?.addEventListener("click", function (e) {
    e.preventDefault()
    login_storage.isLogin = false
    localStorage.setItem("login", JSON.stringify(login_storage))
    if (login_storage.isLogin === false) {
        login_section.classList.add("show")
        admin_section.classList.add("hide")
    } else {
        login_section.classList.remove("show")
        admin_section.classList.remove("hide")
    }
})
//
// function isLoginFN() {
//     if (login_storage.isLogin === true) {
//         login_section.classList.remove("show")
//         admin_section.classList.remove("hide")
//     } else {
//         login_section.classList.add("show")
//         admin_section.classList.add("hide")
//     }
// }
//
// isLoginFN()


