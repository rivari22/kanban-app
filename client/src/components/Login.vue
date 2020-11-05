<template>
    <section class="login mt-5">
        <div class="container h-100">
            <div class="row h-100">
                <div class="col-7 mr-5">
                    <img src="../assets/images/login-authen.svg" class="img-fluid ${3|rounded-top,rounded-right,rounded-bottom,rounded-left,rounded-circle,|}" alt="">
                </div>
                <div class="col-4">
                    <div class="card p-3 shadow">
                        <div class="card-body">
                            <h4 class="card-title mb-4">Login</h4>
                            <form action="" method="post" id="form-login" v-on:submit.prevent="loginMethod">
                                <div class="form-group">
                                <label for="email-login">Email: </label>
                                <input type="text" class="form-control" name="email-login" id="email-login" aria-describedby="helpId" placeholder="" v-model="login.email">
                                <small id="helpId" class="form-text text-muted">Ex: jhon@mail.com</small>
                                </div>
                                <div class="form-group">
                                <label for="password-login">Password: </label>
                                <input type="password" class="form-control" name="password-login" id="password-login" aria-describedby="helpId" placeholder="" v-model="login.password">
                                <small id="helpId" class="form-text text-muted">Insert your password</small>
                                </div>
                                <button type="submit" class="btn btn-primary">Login</button>
                                <br> <br>
                                <span id="error-msg-login" class="text-danger error-msg">{{errorMsg}}</span>
                            </form>
                            <!-- <div class="g-signin2" v-on:click="onSignIn"></div> -->

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
export default {
    name: "Login",
    data(){
        return {
            login: {
                email: "",
                password: ""
            },
        }
    },
    methods: {
        loginMethod(){
            const data = {
                email: this.login.email,
                password: this.login.password
            }
            this.$emit("loginMethod", data)
            this.login.email = ""
            this.login.password = ""
        }
    },
    props: ["errorMsg"]
}
</script>

<style>

</style>