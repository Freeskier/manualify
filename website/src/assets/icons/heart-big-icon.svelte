<svg viewBox="0 0 28 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    d="M17 19C14.6815 21.2756 16.7219 19.2555 13.9257 22L4.19367 12.4479C-0.0884072 7.09874 8.08665 -0.542919 13.9257 7.48085C19.7649 -0.542919 28.3291 7.09878 23.6577 12.4479L22 14M18.5 17.5L19.4664 16.5612L20.4327 15.6225"
    stroke-width="2.5"
    stroke="currentColor"
  />
  <path
    pathLength="100"
    d="M17 19C14.6815 21.2756 16.7219 19.2555 13.9257 22L4.19367 12.4479C-0.0884072 7.09874 8.08665 -0.542919 13.9257 7.48085C19.7649 -0.542919 28.3291 7.09878 23.6577 12.4479L22 14M18.5 17.5L19.4664 16.5612L20.4327 15.6225"
    stroke-width="2.5"
    class="heart-anim"
  />
</svg>

<style>
  .heart-anim {
    stroke: var(--clr-red-400);
    stroke-dasharray: 100 100;
    stroke-dashoffset: 100;
    transition: stroke-dashoffset 200ms ease-in-out;
  }

  svg:hover .heart-anim {
    stroke-dashoffset: 0;
  }
</style>
