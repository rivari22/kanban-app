<template>
    <section class="content h-100">
            <div class="container-fluid">
                <div class="row">
                    <Category
                        v-for="category in categories" 
                        v-bind:key="category.id"
                        :category="category"
                        :categories="categories"
                        :tasks="tasks"
                        @addTask="addTask"
                        @deleteTask="deleteTask"
                        @editTask="editTask"
                        @updateCatTask="updateCatTask"
                    ></Category>

                    <div class="col">
                        <div class="card bg-content rounded-manual">
                            <div class="card-body">
                                <div class="d-flex justify-content-center h-100 mt-2">
                                    <div class="">
                                        <button class="btn">
                                            <h6 class="card-title  py-2 px-3 rounded text-primary">Add Category</h6>
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                    
                </div>
            </div>
        </section>
</template>

<script>

import Category from "./Category"

export default {
    name: "Content",
    data(){
        return {
        }
    },
    components: {
        Category
    },
    methods: {
        addTask(data){
            this.$emit("addTask", data)
        },
        deleteTask(taskId){
            this.$emit("deleteTask", taskId)
        },
        editTask(data){
            this.$emit("editTask", data)
        },
        updateCatTask(data){
            this.$emit("updateCatTask", data)
        }   
    },
    props: ["categories", "tasks"]
}
</script>

<style>

</style>