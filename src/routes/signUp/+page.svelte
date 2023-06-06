<script lang="ts">
  let email = "";
  let password = "";
</script>

<form class="flex flex-col items-end w-fit mx-auto my-10 justify-center gap-4">
  <div class="flex flex-row gap-5">
    <label class="text-white" for="emailInput">Email</label>
    <input type="text" name="email" id="emailInput" bind:value={email} />    
  </div>
  <div class="flex flex-row gap-5">
    <label class="text-white" for="passwordInput">Password</label>
    <input type="text" name="password" id="passwordInput" bind:value={password} />    
  </div>
</form>
