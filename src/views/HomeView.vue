<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { auth } from "@/composables/auth";

import Category from "@/components/Category.vue";
import ItemOperation from "@/components/ItemOperation.vue";

const { authUser, authHeader, base_url } = auth();
const items = ref([]);
const itemOperationRef = ref(null); // Reference to ItemOperation

// Fetch items
const fetchItems = async () => {
  try {
    const response = await axios.get(base_url.value + "items", authHeader);
    items.value = response.data.items;
  } catch (error) {
    console.error("Error fetching items:", error);
  }
};

// Call delete function in child
const callDeleteFunction = (id) => {
  if (itemOperationRef.value) {
    itemOperationRef.value.deleteItem(id);
  }
};

// Handle new item after saving
const handleSaveRequest = (data) => {
  alert(data);
  fetchItems(); // Refresh items after save
};

onMounted(() => {
  authUser();
  fetchItems();
});
</script>

<template>
  <Category />
  <div class="m-4">
    <!-- Bind ref to the child -->
    <ItemOperation ref="itemOperationRef" @Saverequest="handleSaveRequest", @item-deleted="fetchItems" />

    <table class="table table-bordered">
      <thead>
      <tr class="border">
        <th>Name</th>
        <th>Category</th>
        <th>Color</th>
        <th>Size</th>
        <th>Operations</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in items" :key="item.id">
        <td>{{ item.item_name }}</td>
        <td>{{ item.category }}</td>
        <td>{{ item.color }}</td>
        <td>{{ item.size }}</td>
        <td>
          <button @click="callDeleteFunction(item.id)" class="btn bg-danger">
            Delete
          </button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
