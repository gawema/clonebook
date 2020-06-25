<script>
  // ####

  import IconThumbnail from "./IconThumbnail.svelte";
  import { profile, postModal, storePosts } from "./../store.js";
  import { postRequest } from "./../utils/postRequest.js";

  let hiddenImageInput;
  let inputDescription;
  let imageFile = "";
  let imageUrl = "";
  $: showModal = $postModal.show;

  $: currentPost = $storePosts.filter(
    post => post._id === $postModal.postData
  )[0];

  $: if ($postModal.postData) {
    setTimeout(() => {
      inputDescription.value = currentPost.description;
      imageUrl = currentPost.photo;
    }, 200);
  }

  $: if (imageUrl) {
    setTimeout(() => {
      inputDescription.style.fontSize = "1rem";
      inputDescription.style.height = "2rem";
    }, 200);
  }

  const onClose = () => {
    $postModal.show = false;
    $postModal.postData = undefined;
    imageUrl = "";
    imageFile = "";
    currentPost = "";
  };

  const selectImage = e => {
    // console.log(e.target.files[0]);
    imageFile = e.target.files[0];
    // console.log(URL.createObjectURL(event.target.files[0]));
    imageUrl = URL.createObjectURL(event.target.files[0]);
  };

  const onRemoveImage = () => {
    imageUrl = "";
    imageFile = "";
    inputDescription.style.fontSize = "1.6rem";
    inputDescription.style.height = "10rem";
  };

  const onPost = async () => {
    // let postObject = {
    //   id: $profile.posts.length + 1,
    //   description: inputDescription.value,
    //   timestamp: "now",
    //   likes: [],
    //   photo: imageUrl,
    //   user: $profile.public_json,
    //   comments: []
    // };

    let form = new FormData();
    form.append("description", inputDescription.value);
    form.append("image", imageFile);

    let response = await postRequest("/posts", form);
    // console.log(response.post);
    $storePosts = [response.post, ...$storePosts];

    onClose();

    // console.log($profile.posts);
  };

  const onEdit = async () => {
    let form = new FormData();
    form.append("description", inputDescription.value);
    form.append("postId", currentPost._id);
    form.append("image", imageFile);
    form.append("imageRemoved", imageUrl ? false : true);

    let response = await postRequest("/posts/update", form);

    // console.log(response.post);

    if (response.type === "success") {
      currentPost.description = response.post.description;
      currentPost.photo = response.post.photo;
      currentPost = currentPost;
      // console.log(response.post);

      let posts = $storePosts;
      $storePosts = "";
      $storePosts = posts;

      onClose();
    }
  };
</script>

<style>
  /* ### */
  .wrapper {
    background: rgba(240, 242, 245, 0.6);
    z-index: 100;
    overflow: scroll;
  }

  .formBox {
    width: 40%;
    min-height: 40%;
    max-height: 80%;
    overflow-y: scroll;
  }

  .formHeader {
    border-bottom: 1px solid black;
    height: 3rem;
  }

  .closeForm {
    right: 0.3rem;
    top: 0.3rem;
    width: 2rem;
    height: 2rem;
    background: #e4e6eb;
    border-radius: 50%;
    transition: 0.2s ease all;
    cursor: pointer;
  }

  .closeForm:hover {
    background: #f2f3f5;
  }

  .postInputDescription {
    width: 100%;
    display: block;
    font-size: 1.6rem;
    height: 10rem;
    outline: none;
  }

  .buttonForm {
    background: #1877f2;
    height: 3rem;
    color: white;
    cursor: pointer;
  }

  .imageInput {
    border: 0.5px solid #e4e6eb;
    height: 3rem;
    transition: 0.2s ease all;
    cursor: pointer;
  }

  .postImage {
    border: 0.5px solid #e4e6eb;
  }
</style>

{#if showModal}
  <div class="wrapper w-screen h-screen fixed flex items-center justify-center">
    <div class="formBox bg-white rounded-lg p-4 shadow-lg">
      <!-- Header of form -->
      <div class="formHeader relative flex justify-center items-center">
        <p class="text-lg text-center">
          {$postModal.postData ? 'Edit Post' : 'Create Post'}
        </p>
        <div
          class="closeForm absolute flex items-center justify-center"
          on:click={onClose}>
          <i class="fas fa-times" />
        </div>
      </div>
      <!-- Owner of form -->
      <div class="flex justify-start items-center my-4">
        <IconThumbnail width="2.5rem" photoUrl={$profile.photo} />
        <div>
          <p>{$profile.firstName + ' ' + $profile.lastName}</p>
        </div>
      </div>

      <!-- Post description -->
      <div class="descriptionBox relative mb-2">
        <textarea
          class="postInputDescription relative pl-2"
          bind:this={inputDescription}
          name="description"
          placeholder="Write something..." />
      </div>

      <!-- Post image -->

      <div class="imageBox flex justify-center relative mb-2">
        {#if imageUrl}
          <img src={imageUrl} alt="post" class="postImage rounded-md" />
          <div
            class="closeForm absolute flex items-center justify-center"
            on:click={onRemoveImage}>
            <i class="fas fa-times" />
          </div>
        {/if}
      </div>

      <!-- Post actions -->
      <div>
        <div
          class="imageInput rounded-lg shadow mb-2 flex items-center
          justify-center "
          on:click={() => hiddenImageInput.click()}>
          <p>Add an image</p>
          <img
            src="/images/action_media.png"
            alt="action-fb"
            class="ml-2"
            style="width: 1.2rem;" />
          <input
            bind:this={hiddenImageInput}
            accept="image/*"
            type="file"
            alt="hiddenFile"
            style="display: none;"
            on:change={e => selectImage(e)} />
        </div>
        <div
          class="buttonForm w-full rounded-lg flex items-center justify-center"
          on:click={$postModal.postData ? onEdit : onPost}>
          <p>{$postModal.postData ? 'Edit' : 'Post'}</p>
        </div>
      </div>

    </div>
  </div>
{/if}
