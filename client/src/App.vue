<template>
  <div class="h-100">
      <Navbar
        @changePage="changePage"
        @logoutMethod="logoutMethod"
        :access_token="access_token"
      ></Navbar>

      <Login 
        v-if="pageName == 'login-page'"
        @loginMethod="loginMethod"
        :errorMsg="errorMsg"
        @OnGoogleAuthSuccess="OnGoogleAuthSuccess"
        @OnGoogleAuthFail="OnGoogleAuthFail"
      ></Login>

      <Register 
        v-else-if="pageName == 'register-page'"
        @registerMethod="registerMethod"
        :errorMsg="errorMsg"
      ></Register>

      <Content
        v-else-if="pageName == 'content-page'"
        :categories="categories"
        :tasks="tasks"
        @addTask="addTask"
        @deleteTask="deleteTask"
        @editTask="editTask"
        @updateCatTask="updateCatTask"
      ></Content>
  </div>
</template>

<script>
import Navbar from "./components/Navbar"
import Login from "./components/Login"
import Register from "./components/Register"
import Content from "./components/Content"
import axios from "./config/axios"

export default {
    name: "App",
    data(){
        return {
            pageName: "",
            errorMsg: "",
            access_token: localStorage.access_token || null,
            tasks: [],
            categories: [],
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
                    this.changePage("content-page")
                    this.fetchTask(response.access_token)
                    this.fetchCategory(response.access_token)
                    // this.checkToken()
                }
            })
            .catch(err => {
                console.log(err)
            })
        },
        OnGoogleAuthSuccess(tokenGoogle){
            const access_token_google = tokenGoogle
            // console.log(tokenGoogle, "ni dr oauth google")
            axios({
                method: "POST",
                url: "/googleLogin",
                data: {
                    access_token_google
                }
            })
            .then(response => {
                // console.log(response.data)
                localStorage.setItem("access_token", response.data.access_token) 
                this.changePage("content-page")
                this.fetchTask(response.data.access_token)
                this.fetchCategory(response.data.access_token)
            })
            .catch(err => {
                console.log(err)
            })
        },
        OnGoogleAuthFail(err){
            console.log(err)
        },
        logoutMethod(){
            localStorage.clear()
            this.changePage("login-page")
        },
        checkToken(){
            if(this.access_token) {
                this.pageName = "content-page"
                this.fetchTask()
                this.fetchCategory()
                return true
            } else {
                this.pageName = "login-page"
                // this.fetchTask()
                // this.fetchCategory()
                return false
            }
        },
        fetchTask(token){
            axios({
                method: "GET",
                url: `/tasks`,
                headers: {
                    access_token: token || this.access_token
                }
            })
            .then(response => {
            this.tasks = response.data
            // console.log(JSON.stringify(response.data, null, 2))
            })
            .catch(err => console.log(err))
        },
        fetchCategory(token){
            axios({
                method: "GET",
                url: `/categories`,
                headers: {
                    access_token: token || this.access_token
                }
            })
            .then(response => {
            this.categories = response.data
            // console.log(JSON.stringify(response.data, null, 2))
            })
            .catch(err => console.log(err))
        },
        addTask(data){
            axios({
            method: "POST",
            url: `/tasks`,
            data: {
                title: data.title,
                description: data.description,
                CategoryId: data.CategoryId
            },
            headers: {
                access_token: this.access_token
            }
            })
            .then(response => {
                this.fetchTask()
                this.fetchCategory()
            })
            .catch(err => console.log(err))
        },
        deleteTask(taskId) {
            console.log(taskId)
            axios({
                method:"DELETE",
                url: `/tasks/${taskId}`,
                headers: {
                    access_token: this.access_token
                }
            })
            .then(response => {
                console.log(response.data, "ni")
                this.fetchTask()
                this.fetchCategory()
            })
            .catch(err => console.log(JSON.stringify(err, null, 2)))
        },
        editTask(data){
            axios({
                method: "PUT",
                url: `/tasks/${data.id}`,
                headers: {
                    access_token: this.access_token
                },
                data: {
                    title: data.title,
                    description: data.description,
                }
            })
            .then(response => {       
                this.fetchTask()
                this.fetchCategory()
            })
            .catch(err => console.log(err))
        },
        updateCatTask(data) {
            axios({
                method: "PATCH",
                url: `/tasks/${data.id}`,
                headers: {
                    access_token: this.access_token
                },
                data: {
                    CategoryId: data.CategoryId
                }
            })
            .then(response => {       
                this.fetchTask()
                this.fetchCategory()
            })
            .catch(err => console.log(err))
        }
    },
    components: {
        Navbar,
        Login,
        Register,
        Content
    },
    created(){
        this.checkToken()
    }
}
</script>

<style>

</style>