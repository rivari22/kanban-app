<template>
  <div>
      <Navbar
        @changePage="changePage"
      ></Navbar>

      <Login 
        v-if="pageName == 'login-page'"
        @loginMethod="loginMethod"
        :errorMsg="errorMsg"
      ></Login>

      <Register 
        v-else-if="pageName == 'register-page'"
        @registerMethod="registerMethod"
        :errorMsg="errorMsg"
      ></Register>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"

export default {
    name: "App",
    data(){
        return {
            pageName: "login-page",
            errorMsg: ""
        }
    },
    methods: {
        changePage(page){
            this.pageName = page
            this.errorMsg = ""
        },
        registerMethod(data){
            fetch("http://localhost:3000/register",{
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
                this.pageName = "login-page"
                }
            })
            .catch(err => console.log(err))
        },
        loginMethod(data){
             fetch(`http://localhost:3000/login`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json', // this needs to be defined
                },
                body: JSON.stringify(data)
            })
            .then(response => response.json())
            .then(response => {
                console.log(response)
                if(response.message) {
                this.errorMsg = response.message
                } else {
                    localStorage.setItem("access_token", response.access_token) 
                    this.login.email = ""
                    this.login.password = ""
                }
            })
            .catch(err => {
                console.log(err)
            })
        }
    },
    components: {
        Navbar,
        Login,
        Register
    }
}
</script>

<style>

</style>