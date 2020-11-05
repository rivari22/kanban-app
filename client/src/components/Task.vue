<template>
    <div>
        <div class="card mb-4 rounded-manual">
            <div class="card-body">
                <div class="row justify-content-between">
                    <div class="col">
                        <div v-if="taskData.id !== task.id">
                            <h6 class="card-title badge-primary py-2 px-3 rounded-pill">{{task.title}}</h6>
                            <p class="card-text">{{task.description}}</p>
                        </div>
                        <form action="" v-on:submit.prevent="editTask(task.id)" v-else-if="taskData.id == task.id && isEdit">
                            <div class="form-group">
                                <label for="edit-title-task">Title: </label>
                                <input type="text"
                                    class="form-control" name="edit-title-task" id="edit-title-task" aria-describedby="helpId" placeholder="" v-model="taskData.title">
                            </div>
                            <div class="form-group">
                                <label for="edit-description-task">Description: </label>
                                <input type="text"
                                    class="form-control" name="edit-description-task" id="edit-description-task" aria-describedby="helpId" placeholder="" v-model="taskData.description">
                            </div>
                            <button class="btn btn-primary" type="submit">Edit Task</button>
                        </form>

                        <form action="" v-on:submit.prevent="updateCatTask(task.id)" v-else-if="taskData.id == task.id && isUpdate">
                            <div class="form-group">
                                <select name="" id="" v-model="selected">
                                    <option :value="cat.id" v-for="cat in categories" :key="cat.id">{{cat.name}}</option>
                                </select>
                            </div>
                            <button class="btn btn-primary" type="submit">Update</button>
                        </form>
                        
                    </div>
                    <div class="col d-flex justify-content-between flex-column">
                        <button class="btn btn-outline-danger rounded-manual" @click="deleteTask(task.id)">
                            delete
                        </button>
                        <button class="btn btn-outline-success rounded-manual" @click="formEditTask(task.id)">
                            Edit
                        </button>
                        <button class="btn btn-outline-dark"
                        @click="formUpdateCat(task.id)"
                        >+</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Task",
    data(){
        return{
            taskData: {
                id: "",
                title: this.task.title,
                description: this.task.description,
                CategoryId: ""
            },
            isUpdate: false,
            isEdit: false,
            selected: "" // CategoryId
        }
    },
    methods: {
        deleteTask(taskId){
            this.$emit("deleteTask", taskId)
        },
        formEditTask(taskId) {
            this.taskData.id = taskId
            this.isEdit = true
        },
        formUpdateCat(taskId){
            this.taskData.id = taskId
            this.isUpdate = true
        },
        editTask(taskId){
            const data = {
                id: taskId,
                title: this.taskData.title,
                description: this.taskData.description
            }
            this.$emit("editTask", data)
            // this.taskData.title = ""
            // this.taskData.description = ""
            this.taskData.id = ""
            this.isEdit = false
        },
        updateCatTask(taskId){
            const data = {
                id: taskId,
                CategoryId: this.selected
            }
            this.$emit("updateCatTask", data)
            this.isUpdate = false
        }
    },
    props: ["task", "category", "categories"]
}
</script>

<style>

</style>