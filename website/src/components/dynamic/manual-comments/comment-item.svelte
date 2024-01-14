<script lang="ts">
  import type { ManualComment } from "@types";
  import moment from "moment";
  import ClockSmallIcon from "@assets/icons/clock-small-icon.svelte";
  import HeartSmallIcon from "@assets/icons/heart-small-icon.svelte";
  import HeartBigIcon from "@assets/icons/heart-big-icon.svelte";
  import ReplySmallIcon from "@assets/icons/reply-small-icon.svelte";
  import ReplyBigIcon from "@assets/icons/reply-big-icon.svelte";
  import IncognitoIcon from "@assets/icons/incognito-icon.svelte";
  import TransitionContainer from "@components/transition-container.svelte";
  import { fade } from "svelte/transition";

  type IProps = {
    comment: ManualComment;
    wideContainer: boolean;
  };

  let { comment, wideContainer } = $props<IProps>();

  let expanded = $state(true);

  $effect(() => {
    if (!wideContainer) {
      expanded = false;
    }
  });

  const countReplies = (comment: ManualComment) => {
    let count = 0;

    if (comment.replies && comment.replies.length > 0) {
      comment.replies.forEach((c) => {
        count++;
        count += countReplies(c);
      });
    } else {
    }

    return count;
  };
</script>

<div
  class="comment__container"
  class:is-author={comment.isAuthor}
  class:is-reply={comment.isReply}
  class:is-wide={wideContainer}
>
  <div class="comment__avatar">
    {#if comment.authorAvatar}
      <img src={comment.authorAvatar} alt="user icon" />
    {:else}
      <IncognitoIcon />
    {/if}
  </div>
  <div class="comment__heading">
    <div class="comment__author">
      <span class="comment_author-name">{comment.authorName}</span>
      {#if comment.isAuthor}
        <span class="comment_author__indicator">&#8226; AUTHOR</span>
      {/if}
    </div>
    <div class="comment__details">
      <div class="comment__detail">
        <ClockSmallIcon />
        <span>{moment(comment.date).fromNow()}</span>
      </div>
      <div class="comment__detail">
        <HeartSmallIcon />
        <span>{comment.likes} likes</span>
      </div>
      {#if comment.replies?.length && comment.replies?.length > 0}
        <div class="comment__detail">
          <ReplySmallIcon />
          <span>{countReplies(comment)} replies</span>
        </div>
      {/if}
    </div>
  </div>
  <div class="comment__content">
    {comment.content}
    <div class="comment__controls">
      <button class="comment__control-item"
        ><HeartBigIcon /> <span>like</span></button
      >
      <button class="comment__control-item"
        ><ReplyBigIcon /><span>reply</span></button
      >
      {#if comment.replies && comment.replies.length > 0}
        <button
          onclick={() => {
            expanded = !expanded;
            wideContainer = true;
          }}
          class="comment__control-item hide"
          ><span->{expanded ? "hide" : "show"} ({countReplies(comment)})</span-
          ></button
        >
      {/if}
    </div>
  </div>
  {#if comment.replies}
    <div class="comment__replies" class:expanded>
      <div class="comment__replies-list">
        {#each comment.replies as reply}
          <svelte:self comment={reply} />
        {/each}
      </div>
    </div>
  {/if}
</div>

<style>
  .comment__container {
    --avatar-size: 2.5rem;
    --clr-avatar-accent: var(--clr-neutral-500);
    --column-spacing: calc(var(--avatar-size) * 0.33);
    --gap-reply: 1rem;

    position: relative;
    display: grid;
    grid-template-columns: var(--column-spacing) var(--column-spacing) 1fr;
    row-gap: 0.5rem;
    column-gap: var(--column-spacing);
  }

  .comment__container.is-author {
    --clr-avatar-accent: var(--clr-green-400);
  }

  .comment__container:has(.comment__replies-list):before {
    --indent-top: calc(var(--avatar-size) + var(--gap-reply));
    position: absolute;
    content: "";
    top: var(--indent-top);
    left: calc(var(--column-spacing) * 1.5);
    width: 1px;
    height: calc(100% - var(--indent-top));
    background-color: transparent;
    z-index: -2;
    transition: background-color 300ms ease-in-out;
  }

  .comment__container.is-wide:has(.comment__replies-list)::before {
    background-color: var(--clr-avatar-accent);
  }

  .comment__container.is-wide > .comment__content {
    margin-left: 0;
  }

  .comment__container:not(.is-wide) .comment__replies {
    grid-template-rows: 0fr;
  }

  :global(
      .comment__container:not(.is-reply)
        > .comment__replies
        > .comment__replies-list
        > .comment__container
    ) {
    padding-left: calc(var(--column-spacing) * 2.5);
  }

  :global(
      .comment__container:not(.is-reply)
        > .comment__replies
        > .comment__replies-list
        .comment__container::before
    ) {
    display: none;
  }

  :global(
      .comment__container.is-reply
        > .comment__replies
        > .comment__replies-list
        > .comment__container
    ) {
    margin-left: 1rem;
  }

  :global(
      .comment__container.is-reply .comment__container .comment__avatar::before
    ) {
    display: none;
  }

  .comment__container.is-reply .comment__avatar::before {
    content: "";
    position: absolute;
    left: calc(var(--column-spacing) * -1);
    top: 50%;
    translate: -50% -50%;
    aspect-ratio: 1;
    background-color: var(--clr-avatar-accent);
    width: 0.5rem;
    box-shadow: 0 0 0 var(--gap-reply) var(--clr-neutral-200);
    border-radius: 50%;
    z-index: -1;
  }

  .comment__container.is-reply .comment__content {
    grid-column: 2 /4;
    margin-left: calc(var(--column-spacing) * -0.5);
  }

  .comment__avatar {
    position: relative;
    aspect-ratio: 1;
    width: var(--avatar-size);
    border-radius: 50%;
    border: 1px solid
      color-mix(in srgb, var(--clr-avatar-accent) 50%, transparent 50%);
    grid-row: 1;
    grid-column: 1 / 3;
    display: flex;
    align-items: center;
    justify-content: center;
    align-self: center;
  }

  :global(.comment__avatar > svg) {
    aspect-ratio: 1;
    width: 50%;
  }

  :global(.comment__avatar > img) {
    border-radius: 50%;
    width: 80%;
  }

  .comment__avatar::after {
    content: "";
    position: absolute;
    inset: 3px;
    border-radius: 50%;
    background-color: var(--clr-avatar-accent);
    opacity: 0.3;
    z-index: -1;
  }

  .comment__heading {
    grid-row: 1;
    grid-column: 3;
    display: grid;
    gap: 0.125rem;
  }

  .comment__author {
  }

  .comment_author-name {
    font-size: 1.125rem;
    font-weight: 500;
    color: var(--clr-text-dark);
  }

  .comment_author__indicator {
    color: var(--clr-green-400);
    font-size: 0.875rem;
    font-weight: 600;
    position: relative;
    white-space: nowrap;
  }

  .comment__content {
    grid-column: 3;
    grid-row: 2;
    color: var(--clr-neutral-500);
    display: grid;
    gap: 0.75rem;
    margin-left: calc(var(--column-spacing) * -4);
    transition: margin 300ms ease-in-out;
  }

  .comment__details {
    --gap-detail: 1rem;

    display: flex;
    flex-wrap: wrap;
    column-gap: var(--gap-detail);
    row-gap: 0.25rem;
  }

  .comment__detail {
    display: grid;
    grid-auto-flow: column;
    align-items: center;
    gap: 0.25rem;
  }

  .comment__detail span {
    color: var(--clr-neutral-400);
    font-weight: 500;
    font-size: 0.875rem;
  }

  :global(.comment__detail > svg) {
    aspect-ratio: 1;
    width: 0.875rem;
    color: var(--clr-neutral-400);
  }

  .comment__controls {
    display: flex;
    gap: 1.5rem;
  }

  .comment__control-item {
    display: flex;
    align-items: center;
    color: var(--clr-neutral-400);
    font-size: 1rem;
    gap: 0.5rem;
    font-weight: 600;
  }

  :global(.comment__control-item > svg) {
    height: 1.5rem;
    color: var(--clr-neutral-500);
    flex-shrink: 0;
  }

  .comment__control-item.hide {
    flex: 1;
  }

  .hide::before {
    content: "";
    width: auto;
    height: 1px;
    flex: 1;
    background-color: var(--clr-neutral-400);
  }

  .comment__replies {
    grid-column: 1 / 4;
    display: grid;
    grid-template-rows: 0fr;
    transition: grid-template-rows 300ms ease-in-out;
  }

  .comment__replies.expanded {
    grid-template-rows: 1fr;
  }

  .comment__replies-list {
    overflow: hidden;
  }

  :global(.comment__replies-list > *) {
    margin-top: 1.25rem;
  }
</style>
