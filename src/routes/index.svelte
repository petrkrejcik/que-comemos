<script context="module">
  import { getWeekId } from '$lib/date';
  export const prerender = true;

  export async function load() {
    return {
      status: 301,
      redirect: `/week/${getWeekId(0)}/lunch`
    };
  }
</script>
