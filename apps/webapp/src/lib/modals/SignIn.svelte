<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Google from "$lib/components/icons/Google.svelte";
  import Discord from "$lib/components/icons/Discord.svelte";
  import Modal from "$lib/components/Modal.svelte";

  const submit = () => {
    console.log("submit();");
  };

  export let zIndex = 5;
  export let close: (() => void) | (() => never);
</script>

<Modal {zIndex} {close} title="Sign in">
  <form on:submit|preventDefault={submit}>
    <div class="inline-flex mb-2">
      <Input placeholder="Username" class="mr-2 w-48" />
      <div class="border border-black mr-2" />
      <Input placeholder="Password" type="password" class="w-48" />
    </div>
    <br />
    <Button type="submit" class="w-full">Submit</Button>

    <div class="flex items-center my-2">
      <div class="border border-black w-full mr-2" />
      <p>or</p>
      <div class="border border-black w-full ml-2" />
    </div>

    <Button class="w-full mb-2">
      Sign in with
      <Google class="ml-1" />
    </Button>
    <Button class="w-full">
      Sign in with
      <Discord class="ml-1" />
    </Button>
  </form>
</Modal>
