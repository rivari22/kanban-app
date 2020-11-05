<template>
  <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
            <div class="container">
            <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <a class="nav-link" href="#">Home <span class="sr-only">(current)</span></a>
                </li>
                </ul>
                <button class="btn btn-outline-primary my-2 my-sm-0 mr-4" id="btn-register-nav" type="submit" v-on:click="changePage('register-page')" v-show="!access_token">Register</button>
                <button class="btn btn-primary my-2 my-sm-0" id="btn-login-nav" type="submit" v-on:click="changePage('login-page')"  v-show="!access_token">Login</button>
                <button class="btn btn-outline-danger my-2 my-sm-0" id="btn-logout-nav" type="submit" v-on:click="logoutMethod"  v-show="access_token">Logout</button>
            </div>
            </div>
        </nav>
    </header>
</template>

<script>
export default {
    name: "Navbar",
    data(){
        return {
            
        }
    },
    methods: {
        changePage(pageName){
            this.$emit("changePage", pageName)
        },
        logoutMethod(){
            this.$emit("logoutMethod")
        }
    },
    props: ["access_token"]
}
</script>

<style>

</style>