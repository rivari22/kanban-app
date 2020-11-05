<template>
    <div>
        <div class="card mb-4 rounded-manual">
            <div class="card-body">
                <div class="row justify-content-between">
                    <div class="col">
                        <div v-if="taskData.id !== task.id">
                            <h6 class="card-title badge-primary py-2 px-3 rounded-pill">{{task.title}}</h6>
                            <p class="card-text">{{task.title}}</p>
                        </div>
                        <form action="" v-on:submit.prevent="editTask(task.id)" v-else-if="taskData.id == task.id">
                        <div class="form-group">
                            <label for="edit-title-task">Title: </label>
                            <input type="text"
                                class="form-control" name="edit-title-task" id="edit-title-task" aria-describedby="helpId" placeholder="" v-model="taskData.title">
                            </div>
                            <input type="hidden" value="category.id">
                            <button class="btn btn-primary" type="submit">Edit Task</button>
                        </form>
                    </div>
                    <div class="col d-flex justify-content-between flex-column">
                        <button class="btn btn-outline-danger rounded-manual" @click="deleteTask(task.id)">
                            delete
                        </button>
                        <button class="btn btn-outline-success rounded-manual" @click="formEditTask(task.id)">
                            Edit
                        </button>
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
                title: "",
                CategoryId: ""
            }
        }
    },
    methods: {
        deleteTask(taskId){
            this.$emit("deleteTask", taskId)
        },
        formEditTask(taskId) {
            this.taskData.id = taskId
        },
        editTask(taskId){
            const data = {
                id: taskId,
                title: this.taskData.title,
            }
            this.$emit("editTask", data)
            this.taskData.title = ""
        }
    },
    props: ["task"]
}
</script>

<style>

</style>