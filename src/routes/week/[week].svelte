<script context="module">
  export async function load({ params }) {
    return {
      status: 301,
      redirect: `/week/${params.week}/lunch`
    };
  }
</script>
