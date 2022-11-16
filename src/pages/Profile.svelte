<script>
  import { writable } from 'svelte/store';
  import { collection, addDoc, updateDoc, doc } from 'firebase/firestore';
  import { db } from '$lib/firebase';
  import AppBar from '$components/AppBar/AppBar.svelte';
  import Content from '$components/Content/Content.svelte';
  import { CATEGORIES } from '$lib/meal/meal';
  import BackButton from '$components/Button/BackButton.svelte';
  import { auth } from '$lib/firebase';

  const newMember = writable({
    email: '',
  });

  const logout = () => {
    auth.signOut();
  };

  const addMember = () => {
    console.log('🛎 ', 'newMember', newMember.email);
  };
</script>

<AppBar>
  <BackButton />
</AppBar>

<Content>
  <h3>Group members</h3>
  <div class="form-control">
    <label class="label" for="email">
      <span class="label-text">Añadir miembro</span>
    </label>
    <div class="input-group">
      <input
        name="email"
        type="email"
        placeholder="tina@google.com"
        class="input input-bordered text-black"
        bind:value={newMember.email}
      />
      <button class="btn btn-square" on:click={addMember}>Add</button>
    </div>
  </div>

  <button class="btn btn-wide btn-outline btn-error mt-5" on:click={logout}
    >Salir</button
  >
</Content>
