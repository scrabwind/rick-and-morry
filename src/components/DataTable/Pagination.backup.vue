<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from 'vue-inline-svg'
import arrow from '../../assets/play_arrow_black_24dp.svg'

const { pageCount, charCount } =
	defineProps<{ pageCount: number; charCount: number }>()

const perPage = import.meta.env.VITE_ELEMENTS_PER_PAGE

const test = ref<number>(1)
</script>

<template>
	<div class="pagination margin">
		<button class="pagination-button" disabled>
			<inline-svg class="arrow left" :src="arrow" />
		</button>
		<button class="pagination-button">1</button>
		<button class="pagination-button">2</button>
		<button class="pagination-button">3</button>
		<button class="pagination-button">4</button>
		<button class="pagination-button" disabled>...</button>
		<button class="pagination-button">{{ pageCount }}</button>
		<button class="pagination-button">
			<inline-svg class="arrow" :src="arrow" />
		</button>
	</div>
</template>

<style scoped lang="scss">
.pagination {
	padding-top: 2.5rem;
	display: flex;
}
.pagination-button {
	width: 2.5rem;
	height: 2.5rem;
	margin-right: 0.5rem;
	background-color: transparent;
	border: 1px solid #a9b1bd;
	box-sizing: border-box;
	border-radius: 4px;
	display: flex;
	align-items: center;
	justify-content: center;
	cursor: pointer;
}
.arrow {
	justify-content: center;
	width: 1rem;
	height: 1rem;
	fill: #11b0c8;
}

.left {
	transform: rotate(180deg);
}

.pagination-button:disabled {
	cursor: auto;
	.arrow {
		fill: #a9b1bd;
	}
}
</style>
