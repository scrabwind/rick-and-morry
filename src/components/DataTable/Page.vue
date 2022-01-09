<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps({
	page: {
		type: Number,
		default: null,
	},
	current: {
		type: Number,
		default: 0,
	},
	activeColor: {
		type: String,
		default: 'black',
	},
})
const emit = defineEmits(['update'])
const isActive = computed(() => {
	return props.page === props.current
})
function clickHandler() {
	emit('update', props.page)
}
</script>
<template>
	<li>
		<span v-if="page === null" class="pagination-button">
			<div>...</div>
			<!-- <inline-svg class="Dots" :src="IconPaginationDots" /> -->
		</span>
		<button
			v-else
			class="pagination-button"
			type="button"
			:aria-label="`Go to page ${page}`"
			:class="{ 'active-page': isActive }"
			@click="clickHandler"
		>
			{{ page }}
		</button>
	</li>
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
	user-select: none;
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
.active-page {
	background-color: #11b0c8;
	color: white;
	cursor: default;
}
</style>
