<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Google from "$lib/components/icons/Google.svelte";
  import Discord from "$lib/components/icons/Discord.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import LeftArrow from "$lib/components/icons/LeftArrow.svelte";

  let currentPage = "sign in";

  const signin = () => {
    console.log("signin();");
  };

  const signup = () => {
    console.log("signup();");
  };

  export let zIndex = 5;
  export let close: (() => void) | (() => never);
</script>

{#if currentPage === "sign in"}
  <Modal {zIndex} {close} title="Sign in">
    <form on:submit|preventDefault={signin}>
      <div class="mb-2">
        <Input placeholder="Email" class="mb-2 w-full" />
        <Input placeholder="Password" type="password" class="w-full" />
      </div>
      <Button type="submit" class="w-full">Sign in</Button>

      <div class="flex items-center my-2">
        <div class="border border-black w-full mr-2" />
        <p>or</p>
        <div class="border border-black w-full ml-2" />
      </div>

      <Button class="w-full mb-2">
        Continue with
        <Google class="ml-1 h-5 w-5" />
      </Button>
      <Button class="w-full mb-2">
        Continue with
        <Discord class="ml-1 h-5 w-5" />
      </Button>
      <Button class="w-full" on:click={() => (currentPage = "sign up")}>
        Create account
      </Button>
    </form>
  </Modal>
{:else if currentPage === "sign up"}
  <Modal {zIndex} {close} title="Sign in">
    <form on:submit|preventDefault={signup}>
      <div class="mb-2">
        <Input placeholder="Email" type="email" class="w-96 mb-2" />
        <Input placeholder="Username" class="w-96 mb-2" />
        <Input placeholder="Password" type="password" class="w-96" />
      </div>

      <div class="flex">
        <Button class="mr-2" on:click={() => (currentPage = "sign in")}>
          <LeftArrow class="text-white" />
        </Button>

        <Button type="submit" class="w-full">Sign up</Button>
      </div>
    </form>
  </Modal>
{/if}
