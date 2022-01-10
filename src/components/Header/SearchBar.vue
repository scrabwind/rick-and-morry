<script setup lang="ts">
import { ref, withDirectives } from 'vue'
import InlineSvg from 'vue-inline-svg'

import arrow from '../../assets/svg/arrow-down.svg'
import search from '../../assets/svg/search-icon.svg'

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
				<div
					@click="() => optionHandler(option)"
					class="select-option"
					:class="{ disabled: option.disabled }"
					v-for="option in availableOptions"
				>
					{{ option.text }}
				</div>
			</div>
			<inline-svg :src="arrow" class="arrow-icon" />
		</div>
		<form
			class="form"
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
.input {
	outline: none;
}

.form {
	display: flex;
	padding-left: 1rem;
}
.arrow-icon {
	fill: $color-grey;
	padding-left: 2.5rem;
}
.search {
	&-container {
		display: flex;
		border: 1px solid $color-grey;
		border-radius: 12px;
		align-items: center;
	}
	&-text {
		padding: 1rem 1.25rem;
		@media (max-width: 1320px) {
			padding: 0.25rem 0.5rem;
		}
		// 	@media (max-width: 1320px) {
		// 	mar-left: 1rem;
		// }
	}
	&-icon {
		fill: $color-blue;
	}
	&-button {
		display: flex;
		padding: 1rem 1.25rem 1rem 0;
		@media (max-width: 1320px) {
			padding: 0.25rem 0.5rem;
		}
		// padding: 0;
	}
	&-by {
		display: flex;
		align-items: center;
		padding: 1rem;
		@media (max-width: 1320px) {
			padding: 0.25rem 0.5rem;
		}
		position: relative;
		border-right: 1px solid $color-grey;
		border-left: 1px solid $color-grey;
		background-color: $color-white;
	}
}

.select {
	position: absolute;
	top: 56px;
	width: 100%;
	left: -1px;
	border: 1px solid $color-grey;
	border-top: none;
	border-radius: 0 0 12px 12px;
	background-color: $color-white;
	&-option {
		padding: 1rem;
		border-top: 1px solid $color-grey;
	}
}

.disabled {
	background-color: $color-light-grey;
	cursor: default;
}
</style>
