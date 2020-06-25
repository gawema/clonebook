<script>
  // ####
  export let onEdit;
  export let onDelete;

  export let openEdit = false;
  let openOptions = false;
  let openDelete = false;

  const showOptions = () => {
    openOptions = !openOptions;
  };
</script>

<style>
  .editBox {
    position: absolute;
    width: 14rem;
    background: white;
    left: -6.5rem;
    z-index: 10;
  }

  .actionButtons,
  .deleteButtons {
    transition: 0.3s ease all;
    cursor: pointer;
  }

  .actionButtons:hover {
    background: #f2f2f2;
  }

  .editButton {
    width: 1.5rem;
    height: 1.5rem;
  }

  .deleteButtons:hover {
    background-color: rgba(101, 103, 107, 0.15);
  }
</style>

<div class="relative mt-2 ml-2">
  {#if openEdit}
    <div
      class="editButton flex items-center justify-center"
      on:click={showOptions}>
      {#if !openOptions}
        <img src="/images/dots.png" alt="fb-dots" style="cursor: pointer;" />
      {:else}
        <i class="fas fa-times cursor-pointer" />
      {/if}
    </div>
    {#if openOptions}
      {#if !openDelete}
        <div class="editBox rounded-lg shadow p-2">
          <p
            class="actionButtons px-4 py-2 rounded-md"
            on:click={() => {
              onEdit();
              openOptions = false;
            }}>
            Edit
          </p>
          <p
            class="actionButtons px-4 py-2 rounded-md"
            on:click={() => (openDelete = true)}>
            Delete
          </p>
        </div>
      {:else}
        <div class="editBox rounded-lg shadow p-2">
          <p class="text-center mb-2">Are you sure?</p>

          <div class="grid grid-cols-2">
            <div
              class="deleteButtons mx-1 rounded-md flex items-center
              justify-center"
              on:click={() => {
                onDelete();
                openEdit = false;
                openOptions = false;
              }}>
              Yes
            </div>
            <div
              class="deleteButtons mx-1 rounded-md flex items-center
              justify-center"
              on:click={() => {
                openDelete = false;
                openOptions = false;
              }}>
              No
            </div>
          </div>
        </div>
      {/if}
    {/if}
  {/if}
</div>
