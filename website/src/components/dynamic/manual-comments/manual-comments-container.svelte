<script lang="ts">
  import type { ManualComment } from "@global/types";
  import CommentItem from "./comment-item.svelte";

  type IProps = {};

  let expand = $state(true);

  let comments: ManualComment[] = [
    {
      authorAvatar: "",
      authorName: "Anonymous Rex",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the @Katherine standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
      date: "2024-01-01T14:30:00.1234567Z",
      id: "",
      isAuthor: true,
      likes: 4,
      replies: [
        {
          authorAvatar:
            "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg",
          authorName: "Brandon Lee",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "2024-01-12T14:30:00.1234567Z",
          id: "",
          isAuthor: false,
          likes: 4,
          replies: [
            {
              authorAvatar:
                "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg",
              authorName: "Brandon Lee",
              content:
                "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
              date: "2024-01-12T14:30:00.1234567Z",
              id: "",
              isAuthor: false,
              likes: 4,
              replies: [
                {
                  authorAvatar: "",
                  authorName: "Anonymous Rex",
                  content:
                    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the @Katherine standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled",
                  date: "2024-01-01T14:30:00.1234567Z",
                  id: "",
                  isAuthor: true,
                  likes: 4,
                  replies: [],
                  isReply: true,
                },
              ],
              isReply: true,
            },
          ],
          isReply: true,
        },
        {
          authorAvatar: "",
          authorName: "Anonymous Rex",
          content:
            "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
          date: "2024-01-12T14:30:00.1234567Z",
          id: "",
          isAuthor: true,
          likes: 4,
          replies: undefined,
          isReply: true,
        },
      ],
      isReply: false,
    },
    {
      authorAvatar:
        "https://mymodernmet.com/wp/wp-content/uploads/2019/09/100k-ai-faces-5.jpg",
      authorName: "Anonymous Rex",
      content:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
      date: "2024-01-12T14:30:00.1234567Z",
      id: "",
      isAuthor: false,
      likes: 4,
      replies: undefined,
      isReply: false,
    },
  ];
</script>

<button onclick={() => (expand = !expand)}>EXPAND</button>

<div class="comments__container" class:expand>
  {#each comments as comment}
    <CommentItem {comment} bind:wideContainer={expand} />
  {/each}
</div>

<style>
  .comments__container {
    padding-inline: 1.5rem;
    display: grid;
    gap: 2rem;
    max-width: 24rem;
    transition: max-width 300ms ease-in-out;
  }

  .comments__container.expand {
    max-width: 30rem;
  }
</style>
