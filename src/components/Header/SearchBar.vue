<script setup lang="ts">
import { ref, withDirectives } from 'vue'
import InlineSvg from 'vue-inline-svg'
import arrow from '../../assets/down_arrow.svg'
import search from '../../assets/search_black_24dp.svg'

import type { SearchOption } from './searchBar.types'

const searchText = ref<string>('')
const isOpen = ref<boolean>(false)
const page = ref<number>(1)

const availableOptions = {
	name: { text: 'Name', disabled: false },
	id: { text: 'Identifier', disabled: true },
	episode: { text: 'Episode', disabled: false },
}
const currentOption = ref<string>('Name')

const emit = defineEmits<{
	(event: 'changeDupa', string: string[]): void
	(event: 'currentPage', number: number): void
}>()

const optionHandler = (option: SearchOption) => {
	if (option.disabled) return

	searchText.value = ''
	currentOption.value = option.text
}
</script>

<template>
	<div class="search-container">
		<span class="search-text">Search by</span>
		<div class="button search-by" @click="() => (isOpen = !isOpen)">
			{{ currentOption }}
			<div v-if="isOpen" class="select">
				<!-- <div class="select-option">Name</div>
				<div class="select-option">Identifier</div>
				<div class="select-option">Episode</div> -->
				<div
					@click="() => optionHandler(option)"
					:class="option.disabled ? 'select-option disabled' : 'select-option'"
					v-for="option in availableOptions"
				>
					{{ option.text }}
				</div>
			</div>
			<inline-svg :src="arrow" class="arrow-icon" />
		</div>
		<form
			class="input-container"
			@submit.prevent="
				() => {
					emit('changeDupa', [searchText, currentOption])
					emit('currentPage', page)
				}
			"
		>
			<input class="input" type="text" v-model="searchText" />
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
	padding: 1rem;
	position: relative;
	border-right: 1px solid #a9b1bd;
	border-left: 1px solid #a9b1bd;
	background-color: white;

	// background: red;
}

.select {
	position: absolute;
	top: 57px;
	width: 100%;
	left: -1px;
	border: 1px solid #a9b1bd;
	border-top: none;
	border-radius: 0 0 12px 12px;
	background-color: white;
}

.select-option {
	padding: 1rem;
	border-top: 1px solid #a9b1bd;
}
.search-icon {
	fill: #11b0c8;
}
.search-container {
	display: flex;
	border: 1px solid #a9b1bd;
	border-radius: 12px;
	align-items: center;
}

.search-text {
	margin: 1rem 1.25rem;
}

.input-container {
	display: flex;
	padding-left: 1rem;
}
.search-button {
	display: flex;
	margin: 1rem 1.25rem 1rem 0;
	padding: 0;
}

.input {
	outline: none;
}

.disabled {
	background-color: #e5eaf4;
	cursor: default;
}
</style>
