<script setup lang="ts">
import { ref } from 'vue'
import SearchBar from './SearchBar.vue'

// defineProps<{ msg: string; color: string }>()
const emit = defineEmits<{ (event: 'changeDupa', msg: string[]): void }>()

const passEmit = (searchText: string[]) => {
	emit('changeDupa', searchText)
}
</script>

<template>
	<div class="header">
		<img class="logo" alt="Rick and Morty logo" src="../../assets/logo.svg" />
		<SearchBar @change-dupa="event => passEmit(event)" />
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
