<template>
  
	<div class="toggle">
	</div>
  
</template>


<script lang="ts">
export default {
  component: 'DarkLightMode',
  mounted() {
    const bod = document.querySelector('body') as HTMLElement;
    const toggle = document.querySelector('.toggle') as HTMLElement;
    const isDarkMode = localStorage.getItem('darkMode');

    if (isDarkMode === 'true') {
      bod.classList.add('dark');
    }

    toggle.onclick = () => {
      bod.classList.toggle('dark');
      const toggled = bod.classList.contains('dark');
      localStorage.setItem('darkMode', toggled.toString()); // Convert boolean to string
    };
  },
};
</script>

<style>

</style>