<template>
  <div class="col">
    <div class="backlog-category h-100 mt-5">
      <h3>{{ category.name }}</h3>
      <div class="card bg-content rounded-manual overflow-auto">
        <div class="card-body">
          <Task
            v-for="task in filterTaskByCat"
            v-bind:key="task.id"
            :task="task"
            @deleteTask="deleteTask"
            @editTask="editTask"
          >
          </Task>
          <div class="card mb-4 rounded-manual button-add-another">
            <div class="d-flex justify-content-center h-100 mt-2">
              <div
                class=""
                v-if="category.id && category.id !== taskData.CategoryId"
              >
                <button class="btn" @click="formAdd(category.id)">
                  <h6 class="card-title py-2 px-3 rounded text-primary">
                    Add Another Task
                  </h6>
                </button>
              </div>
              <form
                action=""
                v-on:submit.prevent="addTask(category.id)"
                v-else-if="taskData.CategoryId === category.id"
              >
                <div class="form-group">
                  <label for="add-title-task">Title: </label>
                  <input
                    type="text"
                    class="form-control"
                    name="add-title-task"
                    id="add-title-task"
                    aria-describedby="helpId"
                    placeholder=""
                    v-model="taskData.title"
                  />
                </div>
                <input type="hidden" value="category.id" />
                <button class="btn btn-primary" type="submit">Add Task</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Task from "./Task";

export default {
  name: "Category",
  data() {
    return {
      taskData: {
        id: "",
        title: "",
        CategoryId: ""
      },
    };
  },
  components: {
    Task,
  },
  methods: {
    formAdd(categoryId) {
      this.taskData.CategoryId = categoryId;
    },
    addTask(catId){
        const data = {
            title: this.taskData.title,
            CategoryId: catId,
        }
        this.$emit("addTask", data)
        this.taskData.CategoryId = ""
        this.taskData.title = ""
    },
    deleteTask(taskId){
        this.$emit("deleteTask", taskId)
    },
    editTask(data){
        this.$emit("editTask", data)
    }
  },
  computed: {
    filterTaskByCat() {
      let filter = this.tasks.filter((e) => {
        return e.CategoryId == this.category.id;
      });
      return filter;
    },
  },
  props: ["category", "tasks"],
};
</script>

<style></style>
