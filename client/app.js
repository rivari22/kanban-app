let app = new Vue({
    el: '#app',
    data: {
      pageName: "register-page",
      register: {
        name: "",
        email: "",
        password: "",
      },
      login: {
        email: "",
        password: ""
      },
      server: "http://localhost:3000",
      errorMsg: ""
    },
    methods: {
      // changePage: function (page) {
      //   this.pageName = page
      // }
      changePage(page) {
        this.pageName = page
      },
      loginMethod() {
        const data = {
          email: this.login.email,
          password: this.login.password
        }
        console.log(this.server)
        fetch(`${this.server}/login`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // this needs to be defined
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(response => {
            // const errorMsg = document.querySelector("#error-msg-login")
            if(response.message) {
              this.errorMsg = response.message
            } else {
                localStorage.setItem("access_token", response.access_token) 
                console.log(response)
                this.login.email = ""
                this.login.password = ""
            }
        })
        .catch(err => {
            console.log(err)
        })
      },
      registerMethod() {
        const data = {
          name: this.register.name, 
          email: this.register.email, 
          password: this.register.password
        }
        // console.log(server)
        fetch(this.server+ "/register",{
            method: "POST",
            headers: {
                'Content-Type': 'application/json', // this needs to be defined
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            return response.json()
        })
        .then(res => {
            if(res.message) {
              this.errorMsg = res.message
            } else {
              this.register.name = ""
              this.register.email = ""
              this.register.password = ""
              this.pageName = "login-page"
            }
        })
        .catch(err => console.log(err))
      }
    }
})



// es6
// document.addEventListener("DOMContentLoaded", function(){
//     // Handler when the DOM is fully loaded
//     const token = localStorage.getItem("access_token")
//     console.log("hello")
//     // if(token){

//     // }
// });

// const loginPage = document.querySelector(".login")
// const registerPage = document.querySelector(".register")

// // btn login & form login
// const btnLoginNav = document.querySelector("#btn-login-nav")
// btnLoginNav.addEventListener("click", (e) => {
//     e.preventDefault()
//     loginPage.style.display = "block"
//     registerPage.style.display = "none"
// })

// // btn regis & form regis
// const btnRegisNav = document.querySelector("#btn-register-nav")
// btnRegisNav.addEventListener("click", (e) => {
//     e.preventDefault()
//     loginPage.style.display = "none"
//     registerPage.style.display = "block"
// })

// // register
// const formRegis = document.querySelector("#form-register")
// formRegis.addEventListener("submit", e => {
//     e.preventDefault()
//     const name = document.querySelector("#name-register")
//     const email = document.querySelector("#email-register")
//     const password = document.querySelector("#password-register")
    // const data = {
    //     name: name.value , email: email.value, password: password.value
    // }
    // // console.log(server)
    // fetch(server+ "/register",{
    //     method: "POST",
    //     headers: {
    //         'Content-Type': 'application/json', // this needs to be defined
    //     },
    //     body: JSON.stringify(data)
    // })
    // .then(response => {
    //     return response.json()
    // })
    // .then(res => {
    //     const errorMsg = document.querySelector("#error-msg-register")
    //     if(res.message) {
    //         errorMsg.innerHTML = `${res.message}`
    //     } else {
    //         errorMsg.innerHTML = ``
    //         name.value = ""
    //         email.value = ""
    //         password.value = ""
    //         console.log(res)
    //     }
    // })
    // .catch(err => console.log(err))
// })

// //login 
// const formLogin = document.querySelector("#form-login")
// formLogin.addEventListener("submit", e => {
//     e.preventDefault()
//     const email = document.querySelector("#email-login")
//     const password = document.querySelector("#password-login")
//     const data = {
//         email: email.value, password: password.value
//     }

//     fetch(`${server}/login`, {
//         method: "POST",
//         headers: {
//             'Content-Type': 'application/json', // this needs to be defined
//         },
//         body: JSON.stringify(data)
//     })
//     .then(response => response.json())
//     .then(response => {
//         const errorMsg = document.querySelector("#error-msg-login")
//         if(response.message) {
//             errorMsg.innerHTML = `${response.message}`
//         } else {
//             errorMsg.innerHTML = ``
//             localStorage.setItem("access_token", response.access_token)
//             email.value = ""
//             password.value = ""
//             console.log(response)
//         }
//     })
//     .catch(err => {
//         console.log(err)
//     })
// })

  