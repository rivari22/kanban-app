let app = new Vue({
    el: '#app',
    data: {
      pageName: "content-page",
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
      errorMsg: "",
      access_token: localStorage.access_token || null,
      tasks: [],
      categories: [],
      taskAdd: {
        id: "",
        title: "",
        CategoryId: ""
      },
      idCategory: 0
    },
    methods: {
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
      },
      signOut(){
        var auth2 = gapi.auth2.getAuthInstance();
        auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      },
      onSignIn (googleUser) { // blm bisa
        var profile = googleUser.getBasicProfile();
        console.log('ID: ' + profile.getId()); // Do not send to your backend! Use an ID token instead.
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail()); // This is null if the 'email' scope is not present
      },
      fetchTask(){
        axios({
          method: "GET",
          url: `${this.server}/tasks`,
          headers: {
            access_token: this.access_token
          }
        })
        .then(response => {
          this.tasks = response.data
          // console.log(JSON.stringify(response.data, null, 2))
        })
        .catch(err => console.log(err))
      },
      fetchCategory(){
        axios({
          method: "GET",
          url: `${this.server}/category`,
          headers: {
            access_token: this.access_token
          }
        })
        .then(response => {
          this.categories = response.data
          // console.log(JSON.stringify(response.data, null, 2))
        })
        .catch(err => console.log(err))
      },
      formAdd(categoryId){
        this.taskAdd.CategoryId = categoryId
      },
      addTask(category){
        axios({
          method: "POST",
          url: `${this.server}/tasks`,
          data: {
            title: this.taskAdd.title,
            // description: this.description, nanti akan ada
            CategoryId: category
          },
          headers: {
            access_token: this.access_token
          }
        })
        .then(response => {
          this.taskAdd.CategoryId = ""
          this.taskAdd.title = ""
          this.fetchTask()
          this.fetchCategory()
        })
        .catch(err => console.log(err))
      },
      deleteTask(taskId) {
        console.log(taskId)
        axios({
          method:"DELETE",
          url: `${this.server}/tasks/${taskId}`,
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
      formEditTask(taskId) {
        this.taskAdd.id = taskId
      },
      editTask(taskId){
        axios({
          method: "PUT",
          url: `${this.server}/tasks/${taskId}`,
          headers: {
            access_token: this.access_token
          },
          data: {
            title: this.taskAdd.title,
          }
        })
        .then(response => {
          this.taskAdd.id = ""
          this.taskAdd.title = ""          
          this.fetchTask()
          this.fetchCategory()
        })
        .catch(err => console.log(err))
      }
    },
    created(){
      this.fetchTask()
      this.fetchCategory()
    },
    mounted() {

    }
})