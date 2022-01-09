<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'

const emit = defineEmits<{
	(event: 'changeDupa', msg: string[]): void
	(event: 'currentPage', page: number): void
}>()

const passEmit = (searchText: string[]) => {
	emit('changeDupa', searchText)
}
const passPageEmit = (currentPage: number) => {
	emit('currentPage', currentPage)
}
</script>

<template>
	<div class="header">
		<img class="logo" alt="Rick and Morty logo" src="../../assets/logo.svg" />
		<SearchBar
			@change-dupa="event => passEmit(event)"
			@current-page="event => passPageEmit(event)"
		/>
	</div>
</template>

<style scoped lang="scss">
.header {
	display: flex;
	padding: 2rem;
	border-bottom: 1px solid #e5eaf4;
	align-items: center;
}

.logo {
	margin-right: 5rem;
}
</style>
