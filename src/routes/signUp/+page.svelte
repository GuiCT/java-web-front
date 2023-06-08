<script lang="ts">
  import { emailErrorMap, passwordErrorMap, validateEmail, validatePassword } from "@/lib/validations";
  import FormInput from "@/components/formInput.svelte";

  let email = "";
  let password = "";

  function makeRequest() {
    // fetch("endpoint", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify({ email, password }),
    // })
    // TODO: Form validation for invalid email or existing
    // https://learn.svelte.dev/tutorial/form-validation
    alert(`Request made with parameters: ${email} and ${password}`)
  }
</script>

<form class="flex flex-col items-end w-fit mx-auto my-10 justify-center gap-4" on:submit={makeRequest}>
  <FormInput
    label="Email"
    type="email"
    required
    validator={validateEmail}
    errorMap={emailErrorMap}
    bind:value={email}
  />
  <FormInput
    label="Senha"
    type="password"
    required
    validator={validatePassword}
    errorMap={passwordErrorMap}
    bind:value={password}
  />
  
  <button class="w-fit py-1 px-10 bg-white rounded-md">Registrar</button>
</form>