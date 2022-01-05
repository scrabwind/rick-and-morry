<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import Header from './components/Header.vue'
import TopBar from './components/TopBar.vue'
import Table from './components/DataTable/Table.vue'
</script>

<template>
	<Header class="margin" />
	<TopBar class="margin" />
	<Table class="margin" />
</template>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');

body,
html {
	padding: 0;
	margin: 0;
	width: 100%;
	height: 100%;
}

body {
	font-family: 'Poppins', sans-serif;
	font-size: 16px;
	color: #a9b1bd;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;

	// padding-left: 8.75rem;
}

// .dupa {
// 	width: 500px;
// 	height: 200px;
// 	background-color: black;
// }
.margin {
	padding-left: 8.75rem !important;
}
</style>
