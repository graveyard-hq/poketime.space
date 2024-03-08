<script lang="ts">
  import Button from "$lib/components/ui/button/button.svelte";
  import Input from "$lib/components/ui/input/input.svelte";
  import Google from "$lib/components/icons/Google.svelte";
  import Discord from "$lib/components/icons/Discord.svelte";
  import Modal from "$lib/components/Modal.svelte";
  import Mail from "$lib/components/icons/Mail.svelte";
  import LeftArrow from "$lib/components/icons/LeftArrow.svelte";

  let currentPage = "init";

  const signin = () => {
    console.log("signin();");
  };

  const signup = () => {
    console.log("signup();");
  };

  export let zIndex = 5;
  export let close: (() => void) | (() => never);
</script>

{#if currentPage === "init"}
  <Modal {zIndex} {close} title="Continue with">
    <Button class="w-96 mb-2">
      <Google class="mr-1" />
      Google
    </Button>
    <br />
    <Button class="w-96 mb-2">
      <Discord class="mr-1" />
      Discord
    </Button>
    <br />
    <Button class="w-96" on:click={() => (currentPage = "e-mail")}>
      <Mail class="mr-1" />
      E-mail
    </Button>
  </Modal>
{:else if currentPage === "e-mail"}
  <Modal {zIndex} {close} title="Continue with e-mail">
    <Button class="w-96 mb-2" on:click={() => (currentPage = "sign in")}>
      Sign in
    </Button>
    <br />
    <Button class="w-96 mb-2" on:click={() => (currentPage = "sign up")}>
      Sign up
    </Button>
    <br />
    <Button class="w-96" on:click={() => (currentPage = "init")}>
      <LeftArrow class="text-white mr-2" /> Back
    </Button>
  </Modal>
{:else if currentPage === "sign in"}
  <form on:submit|preventDefault={signin}>
    <Modal {zIndex} {close} title="Sign in with e-mail">
      <div class="mb-2">
        <Input placeholder="Email" type="email" class="w-96 mb-2" />
        <Input placeholder="Password" type="password" class="w-96" />
      </div>

      <div class="flex">
        <Button class="mr-2" on:click={() => (currentPage = "e-mail")}>
          <LeftArrow class="text-white" />
        </Button>

        <Button type="submit" class="w-full">Sign in</Button>
      </div>
    </Modal>
  </form>
{:else if currentPage === "sign up"}
  <form on:submit|preventDefault={signup}>
    <Modal {zIndex} {close} title="Sign up with e-mail">
      <div class="mb-2">
        <Input placeholder="Email" type="email" class="w-96 mb-2" />
        <Input placeholder="Username" class="w-96 mb-2" />
        <Input placeholder="Password" type="password" class="w-96" />
      </div>

      <div class="flex">
        <Button class="mr-2" on:click={() => (currentPage = "e-mail")}>
          <LeftArrow class="text-white" />
        </Button>

        <Button type="submit" class="w-full">Sign up</Button>
      </div>
    </Modal>
  </form>
{/if}
