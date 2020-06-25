<script>
  import { onMount } from "svelte";

  import { getRequest } from "./../utils/getRequest";
  import { postRequest } from "./../utils/postRequest";
  import { fromNowOrNow } from "./../utils/fromNowOrNow";
  import { profile, storePosts, postModal } from "./../store.js";

  import IconThumbnail from "./IconThumbnail.svelte";
  import EditDots from "./EditDots.svelte";

  let like = false;
  export let post;
  onMount(() => {
    like = false;
    setInterval(() => {
      checkLikes();
    }, 3000);
  });


  $: currentPost = $storePosts.filter(
    currentPost => currentPost._id === post._id
  )[0];

  // $: totalComments = currentPost && currentPost.comments.length;
  // $: post.comments.forEach(comment => {
  //   totalComments += comment.replies.length;
  // });

  $: myLike =
    currentPost && currentPost.likes.find(item => item.id === $profile._id);
  $: if (myLike) {
    like = true;
  }

  const checkLikes = async () => {
    let response = await getRequest("/posts/likes", {
      userId: currentPost.user.id,
      postId: currentPost._id
    });

    if (response.likes.length !== currentPost.likes.length) {
      currentPost.likes = response.likes;
    }
  };

  const onLikePost = async () => {
    let form = new FormData();
    form.append("postId", currentPost._id);
    form.append("user", JSON.stringify(currentPost.user));

    let response = await postRequest("/posts/likes", form);

    if (response.type === "success") {
      if (myLike === undefined) {
        currentPost.likes = [...currentPost.likes, $profile.public_json];
        like = true;
      } else {
        currentPost.likes = currentPost.likes.filter(
          currentLike => currentLike.id != $profile._id
        );
        like = false;
      }
    }
  };

  // const deleteComment = async id => {

  //   let response = await getRequest("/comments/delete", {
  //     commentId: id,
  //     postId: currentPost._id,
  //     userId: currentPost.user.id
  //   });

  //   if (response.type === "success") {
  //     currentPost.comments = currentPost.comments.filter(
  //       comment => comment._id !== id
  //     );
  //   }

  // };

  // const onAddComment = async e => {
  //   e.preventDefault();
  //   if (commentInput.value !== "") {
  //     let form = new FormData();
  //     form.append("commentBody", commentInput.value);
  //     form.append("postId", currentPost._id);
  //     form.append("userId", currentPost.user.id);

  //     let response = await postRequest("/comments", form);

  //     if (response.type === "success") {
  //       commentInput.value = "";
  //       currentPost.comments = [response.comment, ...currentPost.comments];
  //     }
  //   }
  // };

  const onEditPost = () => {
    $postModal.postData = currentPost._id;
    $postModal.show = true;
  };

  const onDeletePost = async () => {
    let response = await getRequest("/posts/delete", {
      postId: currentPost._id
    });

    if (response.type === "success") {
      $storePosts = $storePosts.filter(post => post._id !== currentPost._id);
    }
  };
</script>

<style>
  .post{
    padding: 1rem;
    border-radius: 1rem;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
  }
  .postHeader {
    grid-template-columns: 10fr 90fr;
  }

  .postStatusContainer {
    padding: 0.4rem 0.2rem;
    border-bottom: 1px solid rgba(128, 128, 128, 0.4);
  }


  .actionContainerStatus .actionTab {
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border-radius: 0.5rem;
    margin: 1rem 0rem;
    transition: 0.1s ease;
  }

  .actionContainerStatus .actionTab i {
    font-size: 1.1rem;
  }

  .actionTab:hover {
    background-color: rgba(101, 103, 107, 0.15);
  }

  .likeBtn:hover {
    color: #4080ff;
  }

  .postActions {
    margin: 0rem 1rem;
  }

  .editPostButton {
    right: 0.7rem;
    top: 0.3rem;
  }
</style>

{#if currentPost}
  <div >
    <div class="post postItem w-full mt-6 bg-white rounded-lg">
      <div>
        <div class="relative postHeader grid p-2">
          <div
            class="flex cursor-pointer items-center"
            on:click={() => (window.location.href = `profile/${currentPost.user.username}`)}>
            <IconThumbnail photoUrl={currentPost.user.photo} width="3rem" />
          </div>

          <div>
            <p>
              {currentPost.user.firstName + ' ' + currentPost.user.lastName}
            </p>
            <p class="text-gray-600 font-medium text-sm">
              {fromNowOrNow(currentPost.timestamp)}
            </p>
          </div>
          <div class="editPostButton absolute">
            <EditDots
              openEdit={currentPost.user.id === $profile._id ? true : false}
              onEdit={onEditPost}
              onDelete={onDeletePost} />
          </div>
        </div>
        <div class="mx-3 my-2 font-medium">
          <p>{currentPost.description}</p>
        </div>
      </div>

      <div class="flex justify-center w-full">
        {#if currentPost.photo}
          <img src={currentPost.photo} alt="Post" />
        {/if}
      </div>
      <div class="postActions">
        <div class="postStatusContainer grid grid-cols-2">
          <div class="flex items-center">
            <img
              class="w-5 m-1"
              src="/images/like.svg"
              alt="Facebook like button" />
            <p class="m-1 text-gray-700 font-medium">
              {currentPost.likes.length}
            </p>
          </div>

        </div>
        <div class="actionContainerStatus text-gray-600 grid grid-cols-3 h-12">
          <div class="actionTab likeBtn" on:click={onLikePost}>
            <i
              class=" far fa-thumbs-up"
              style={myLike ? 'color: #2078f4' : 'color: #718096'} />
            <p style={myLike ? 'color: #2078f4' : 'color: #718096'} class="p-1">
              Like
            </p>
          </div>
          <div class="actionTab">
            <i class="far fa-comment-alt" />
            <p class="p-1"> Comment </p>
          </div>
          <div class="actionTab">
            <i class="fas fa-share-square" />
            <p class="p-1">Share</p>
          </div>
        </div>
      </div>

    </div>
  </div>
{/if}
