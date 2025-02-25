<script setup>


import {auth} from "@/composables/auth";
import {computed, onBeforeMount, onMounted, ref} from "vue";
import axios from "axios";
import {admin} from "@/composables/admin.js";
// import Swal from "sweetalert2";

const {authUser, authHeader,currentUser,base_url,storage} = auth()

import Category from "@/components/Category.vue";
import Item from "@/components/Item.vue";


onMounted(() => {
  authUser()
})
</script>

<template>

  <Category />
  <div class="m-4">

    <table class="table table-bordered">
      <thead>
      <tr class="border">
        <th colspan="5" scope="col" class="text-center">Clothing items <Item /></th>
      </tr>
      <tr class="border">
        <th scope="col">#</th>
        <th scope="col">Name</th>
        <th scope="col">Category</th>
        <th scope="col">Handle</th>
        <th scope="col">Operation</th>
      </tr>
      </thead>
      <tbody>
      <tr class="border">
        <th scope="row">1</th>
        <td>Mark</td>
        <td>Otto</td>
        <td>@mdo</td>
        <td><router-link to="/category" class="btn btn-primary">View</router-link></td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
