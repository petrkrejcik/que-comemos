<script context="module">
  export const prerender = true;

  import { getWeekId } from '$lib/date';

  export async function load() {
    return {
      status: 301,
      redirect: `/week/${getWeekId(0)}/lunch`
    };
  }
</script>
