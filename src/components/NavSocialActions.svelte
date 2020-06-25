<script>
  // ####
  import { profile } from "./../store.js";
  import IconThumbnail from "./IconThumbnail.svelte";
  import { getRequest } from "./../utils/getRequest";
  import { fromNowOrNow } from "./../utils/fromNowOrNow";
  import { onMount } from "svelte";
  import moment from "moment";

  onMount(async () => {
    setInterval(() => {
      checkForNotifications();
      checkForMessages();
    }, 3000);
  });

  let showActionsBox;
  let bindBoxActions;
  let showRequestActions = true;

  $: activeAction = "";
  $: boxContent = [];
  $: newNotifications = "";
  $: newMessages = "";

  const checkForNotifications = async () => {
    let response = await getRequest("/notifications");

    if (response.notifications.length > $profile.notifications.length) {
      newNotifications =
        response.notifications.length - $profile.notifications.length;
    }
  };

  const checkForMessages = async () => {
    let response = await getRequest("/friends");
    let accumulator = 0;
    if (response.type === "success") {
      for (let i = 0; i < $profile.friends.length; i++) {
        for (let j = 0; j < response.friends.length; j++) {
          if (
            $profile.friends[i].chat.length < response.friends[j].chat.length &&
            $profile.friends[i].username === response.friends[j].username
          ) {
            accumulator +=
              response.friends[j].chat.length - $profile.friends[i].chat.length;
          }
        }
      }
      newMessages = accumulator;
    }
  };

  const getNotifications = async () => {
    activeAction = "notifications";

    let friends = await getRequest("/friends");
    let response = await getRequest("/notifications");

    $profile.friends = friends.friends;
    $profile.notifications = response.notifications;

    let reducedNotifications = $profile.notifications.reduce(
      (accumulator, item) => {
        if (item.type === "request") {
          let findNotification = accumulator.find(
            notif => notif.type === "request" && notif.user.id === item.user.id
          );

          if (!findNotification) {
            accumulator = [...accumulator, item];
          }
        } else {
          accumulator = [...accumulator, item];
        }

        return accumulator;
      },
      []
    );

    boxContent = reducedNotifications;

    newNotifications = "";
    showActionsBox = true;

    setTimeout(() => {
      bindBoxActions.focus();
    }, 200);

  };

  const getMessages = async () => {
    activeAction = "messages";
    let response = await getRequest("/friends");

    response.friends = response.friends.sort((a, b) => {
      if (a.chat.length > 0 && b.chat.length > 0) {
        console.log(
          new Date(a.chat[a.chat.length - 1].timestamp) -
            new Date(b.chat[b.chat.length - 1].timestamp)
        );
        return (
          new Date(b.chat[b.chat.length - 1].timestamp) -
          new Date(a.chat[a.chat.length - 1].timestamp)
        );
      } else {
        return -1;
      }
    });
    $profile.friends = response.friends;

    newMessages = "";
    boxContent = $profile.friends;
    showActionsBox = true;
    setTimeout(() => {
      bindBoxActions.focus();
    }, 200);
  };

  const showChatWindow = user => {
    let checkFriend = $profile.activeChats.find(
      friend => friend.id === user.id
    );
    if (checkFriend === undefined) {
      user.activeChat = true;
      $profile.activeChats = [user, ...$profile.activeChats];
    }
  };

  const onAccept = async item => {
    let response = await getRequest("/notifications/accept", {
      friendId: item.user.id
    });

    if (response.type === "success") {
      let foundIndexFriend = $profile.friends.findIndex(
        friend => friend.id === item.user.id
      );
      if (foundIndexFriend > 0) {
        $profile.friends[foundIndexFriend].friendshipStatus = "accept";
      }
      showRequestActions = false;
    }
    // we want to get message, success, friendId
  };


  const onDecline = async item => {
    // we update both of the users with the latest friendshipStatus = 3
    let response = await getRequest("/notifications/decline", {
      friendId: item.user.id
    });
    if (response.type === "success") {
      let foundIndexFriend = $profile.friends.findIndex(
        friend => friend.id === item.user.id
      );
      if (foundIndexFriend > 0) {
        $profile.friends[foundIndexFriend].friendshipStatus = "decline";
      }
      showRequestActions = false;
    }

    // we want to get message, success, friendId
  };
</script>

<style>
  .actionButtonsNav {
    background: #f0f2f5;
    border-radius: 50%;
    width: 3rem;
    height: 3rem;
    cursor: pointer;
    transition: 0.3s ease all;
    margin: 0px 0.5rem;
  }

  .actionButtonsNav:hover {
    background: #e4e6eb;
  }

  .actionsBox {
    width: 20rem;
    background: white;
    max-height: 45vh;
    overflow: auto;
    right: 1rem;
    outline: 0px;
  }

  .contentBoxItem {
    min-height: 4rem;
    transition: 0.3s ease all;
  }

  .contentBoxItem:hover {
    background: #f0f2f5;
  }

  .notificationItem {
    grid-template-columns: 2fr 8fr;
  }

  .notificationTimestamp {
    color: rgb(24, 118, 242);
  }

  .requestButton {
    background: #e4e6eb;
    transition: 0.3s ease all;
  }

  .requestButtonAccept:hover {
    background: rgb(24, 118, 242);
    color: white;
  }
  .requestButtonDecline:hover {
    background: #e02200;
    color: white;
  }
  .dot {
    height: 5px;
    width: 5px;
    background-color: #bbb;
    border-radius: 50%;
  }

  .counterCircle {
    background: red;
    top: 0;
    right: 0;
    border-radius: 50%;
    width: 1.2rem;
    height: 1.2rem;
    color: white;
    font-size: 12px;
  }
</style>

<div>

  <div class="flex items-center justify-center">
    <div class="actionButtonsNav relative flex items-center justify-center" on:click={getMessages}
      style={activeAction === 'messages' ? 'background-color: #E7F3FF;' : 'background-color: #f0f2f5'}>
      <i class="far fa-comment-alt"></i>
      {#if newMessages > 0}
        <span class="absolute flex items-center justify-center counterCircle">
          <p>{newMessages}</p>
        </span>
      {/if}
    </div>

    <div class="">
      <div class="actionButtonsNav relative flex items-center justify-center" on:click={getNotifications}
        style={activeAction === 'notifications' ? 'background-color: #E7F3FF;' : 'background-color: #f0f2f5'}>
        <i class="far fa-bell"></i>
        {#if newNotifications}
          <span class="absolute flex items-center justify-center counterCircle">
            <p>{newNotifications}</p>
          </span>
        {/if}
      </div>
    </div>
  </div>

  {#if showActionsBox}
    <div
      bind:this={bindBoxActions}
      class="actionsBox grid grid-cols-1 absolute mt-4 shadow-lg rounded-lg p-2"
      tabindex="0"
      on:blur={() => {
        showActionsBox = false;
        activeAction = undefined;
      }}>

      {#each boxContent as item}
        {#if activeAction === 'notifications'}
          <div class="contentBoxItem flex items-center cursor-pointer">
            <div class="notificationItem w-full h-full grid gap-1">
              <div class="flex items-center justify-center">
                <IconThumbnail photoUrl={item.user.photo} width="2.6rem" />
              </div>
              <div>
                {#if item.type === 'request'}
                  <div class="p-2">
                    <p class="flex items-center">
                      {item.user.firstName + ' ' + item.user.lastName + ' '}
                      <span class="mx-1 dot" />
                      <span class="notificationTimestamp font-normal text-sm">
                        {' ' + fromNowOrNow(item.timestamp)}
                      </span>
                    </p>
                    <p class="font-normal">{item.body}</p>
                    {#if showRequestActions && !$profile.friends.find(friend => friend.id === item.user.id && friend.friendshipStatus !== 'pending')}
                      <div class="grid grid-cols-2 gap-1">
                        <div
                          class="requestButton requestButtonAccept p-1 m-1
                          rounded-md shadow-md flex items-center justify-center"
                          on:click={onAccept(item)}>
                          <p>Accept</p>
                        </div>
                        <div
                          class="requestButton requestButtonDecline p-1 m-1
                          rounded-md shadow-md flex items-center justify-center"
                          on:click={onDecline(item)}>
                          <p>Decline</p>
                        </div>
                      </div>
                    {/if}
                  </div>
                {:else if item.type === 'like'}
                  <div class="p-2">
                    <p class="flex items-center">
                      {item.user.firstName + ' ' + item.user.lastName + ' '}
                      <span class="mx-1 dot" />
                      <span class="notificationTimestamp font-normal text-sm">
                        {' ' + fromNowOrNow(item.timestamp)}
                      </span>
                    </p>
                    <p class="font-normal">{item.body}</p>
                  </div>
                {/if}
              </div>
            </div>
          </div>
        {:else if item.chat.length > 0}
          <div class="contentBoxItem flex items-center cursor-pointer">
            <div
              class="notificationItem w-full h-full grid gap-1"
              on:click={showChatWindow(item)}>
              <div class="flex items-center justify-center">
                <IconThumbnail photoUrl={item.photo} width="3rem" />
              </div>
              <div class="p-2">
                <p class="flex items-center">
                  {item.firstName + ' ' + item.lastName + ' '}
                  <span class="mx-1 dot" />
                  <span class="notificationTimestamp font-normal text-sm">
                    {' ' + fromNowOrNow(item.chat[item.chat.length - 1].timestamp)}
                  </span>
                </p>
                <p class="font-normal">
                  {@html item.chat[item.chat.length - 1].message}
                </p>
              </div>
            </div>
          </div>
        {/if}
      {/each}
    </div>
  {/if}
</div>
