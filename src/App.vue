<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import TopBar from './components/TopBar.vue'
const color = 'yellow'
</script>

<template>
	<TopBar msg="Hello Vue 3 + TypeScript + Vite" color="" />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

body {
	font-family: 'Poppins', sans-serif;
	font-size: 16px;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	margin: 2rem;
}
</style>
