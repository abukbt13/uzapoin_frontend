<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";

import { Modal } from "bootstrap";
import {auth} from "@/composables/auth.js"; // Import Bootstrap Modal properly
const {base_url,authHeader} = auth()

const item_name = ref("");
const category = ref("");
const color = ref("");
const error = ref("");
const size = ref("");
const isLoading = ref(false);
const props = defineProps({
  item_id: Number, // Accepts item ID from the parent
});
const emit = defineEmits(["@Saverequest","item-delete"]);

const categories = ref([
  "T shirts",
  "skirt",
  "vest",
  "Accessories",
  "Underwears",
  ]);

  // Function to delete an item
  const deleteItem = async (id) => {

  if (!id) {
  alert("Invalid item ID.");
  return;
}

  try {
  await axios.get(base_url.value +"items/"+id, authHeader);
  emit("item-deleted", id); // Notify parent to refresh items
  alert("Item deleted successfully");
} catch (error) {
  console.error("Error deleting item:", error);
}
};



const saveItem = async () => {
  error.value = "";

  // **Enhanced Validation**
  if (!item_name.value || !category.value || !color.value || !size.value) {
    error.value = "All fields are required.";
    return;
  }
  try {
    isLoading.value = true; // Show loading state
    const formData = new FormData()

    formData.append('item_name', item_name.value)
    formData.append('category', category.value)
    formData.append('color', color.value)
    formData.append('size', size.value)

    const response = await axios.post(base_url.value +"items", formData,authHeader);

    emit("Saverequest", response.data.message); // Emit event to parent component

    // Reset form fields
    item_name.value = "";
    category.value = "";
    color.value = "";
    size.value = "";

    // Close modal properly
    const modalElement = document.getElementById("exampleModal");
    const modalInstance = Modal.getInstance(modalElement) || new Modal(modalElement);
    modalInstance.hide();
  } catch (error) {
    console.error("Error saving item:", error);
  } finally {
    isLoading.value = false;
  }
};

// Expose function to parent
defineExpose({
  deleteItem
})

</script>

<template>
  <table class="w-100">
    <tr class="border">
      <th colspan="5" scope="col" class="p-2">
        Clothing items
        <button
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
            class="btn btn-primary btn-sm float-end"
        >
          Add
        </button>
      </th>
    </tr>
  </table>

  <!-- Modal -->
  <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Add Item</h1>
          <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h2 v-if="error" class="bg-danger text-center">{{error}}</h2>
          <form @submit.prevent="saveItem">
            <div class="my-1">
              <label for="">Item Name</label>
              <input v-model="item_name" class="form-control" placeholder="Item Name" required />
            </div>
            <div class="my-1">
              <label for="">Category</label>
              <select v-model="category" class="form-control">
                <option value="" disabled>Select a category</option>
                <option v-for="(category, index) in categories" :key="index" :value="category">
                  {{ category }}
                </option>
              </select>
            </div>
            <div class="my-1">
              <label for="">Item Color</label>
              <input v-model="color" class="form-control" placeholder="Item Color" required />
            </div>
            <div class="my-1">
              <label for="">Item Size</label>
              <input v-model="size" class="form-control" placeholder="Item Size" required />
            </div>
            <div class="mt-2">
              <button type="submit" class="btn btn-primary" :disabled="isLoading">
                <span v-if="isLoading">Saving Item...</span>
                <span v-else>Save Item</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add any custom styles here */
</style>
