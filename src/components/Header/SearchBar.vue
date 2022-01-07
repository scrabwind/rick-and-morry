<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from 'vue-inline-svg'
import arrow from '../../assets/down_arrow.svg'
import search from '../../assets/search_black_24dp.svg'

const messeage = ref<string>('')

const emit = defineEmits<{ (event: 'changeDupa', string: string): void }>()
</script>

<template>
	<div class="search-container">
		<span class="search-text">Search by</span>
		<button class="button search-by">
			<div>Name</div>
			<inline-svg :src="arrow" class="arrow-icon" />
		</button>
		<form
			class="input-container"
			@submit.prevent="() => emit('changeDupa', messeage)"
		>
			<input class="input" type="text" v-model="messeage" />
			<button class="button search-button" type="submit">
				<inline-svg :src="search" class="search-icon" />
			</button>
		</form>
	</div>
</template>

<style scoped lang="scss">
.button,
.input {
	border: none;
	background-color: transparent;
}
.button {
	cursor: pointer;
}
.arrow-icon {
	fill: #a9b1bd;
	padding-left: 2.5rem;
}
.search-by {
	display: flex;
	align-items: center;
	border-right: 1px solid #a9b1bd;
	padding: 1rem 1rem;
}
.search-icon {
	fill: #11b0c8;
	// padding: 1rem 0;
}
.search-container {
	display: flex;
	border: 1px solid #a9b1bd;
	border-radius: 12px;
	align-items: center;
}

.search-text {
	padding: 1rem 1.25rem;
	border-right: 1px solid #a9b1bd;
}

.input-container {
	display: flex;
}
.search-button {
	display: flex;
	margin: 1rem 1.25rem 1rem 0;
	padding: 0;
}

.input {
	outline: none;
}
</style>
