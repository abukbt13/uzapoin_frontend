<script setup>

</script>

<template>
  <!-- Button trigger modal -->
  <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Add item
  </button>

  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Modal title</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          hhhh
          <form  @submit.prevent="">

              Loan For

            <select v-model="loan_id" class="form-control" name="">
              <option>--Select User--</option>
              <option v-for="loan in loans" :key="loan" :value="loan.id">{{ loan.first_name }} {{ loan.last_name }}{{ loan.balance }}</option>
            </select>
            <label for=" ">
              Amount
            </label>
            <input type="number" v-model="amount" class="form-control">
            <label for=" ">
              Date
            </label>
            <input type="date" v-model="date" class="form-control">
            <button style="width: 6rem; background-color: #41464b;color: white"   data-bs-dismiss="modal" class="btn  float-end my-3 ">Save</button>
          </form>

        </div>


      </div>
    </div>
  </div>
</template>

<style scoped>

</style>