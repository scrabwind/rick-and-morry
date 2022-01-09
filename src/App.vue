<script setup lang="ts">
import Header from './components/Header/Header.vue'
import TopBar from './components/TopBar.vue'
import Table from './components/DataTable/Table.vue'
import { ref } from 'vue'
const search = ref<string[]>(['', 'Name'])
const page = ref<number>(1)
const activeChar = ref<boolean>(true)
const handleEvent = (searchText: string[]) => {
	search.value = searchText
}
const handleEvent2 = (currentPage: number) => {
	page.value = currentPage
}
const handleEvent3 = (isCharActive: boolean) => {
	activeChar.value = isCharActive
}
</script>

<template>
	<Header
		@change-dupa="event => handleEvent(event)"
		@current-page="event => handleEvent2(event)"
		class="margin"
	/>
	<TopBar class="margin" @active-char="event => handleEvent3(event)" />
	<Table
		:search="search[0]"
		:options="search[1]"
		:page="page"
		:char-active="activeChar"
		class="margin"
	/>
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
* {
	font-family: 'Poppins', sans-serif;
	font-size: 16px;
	color: #a9b1bd;

	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
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
