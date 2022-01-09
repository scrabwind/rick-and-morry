<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
	page: number | null
	current: number
}>()
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
		<span v-if="page === null" class="button">
			<div>...</div>
			<!-- <inline-svg class="Dots" :src="IconPaginationDots" /> -->
		</span>
		<button
			v-else
			class="button"
			type="button"
			:class="{ 'button-active': isActive }"
			@click="clickHandler"
		>
			{{ page }}
		</button>
	</li>
</template>
<style scoped lang="scss">
.button {
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
	&-active {
		background-color: #11b0c8;
		color: white;
		cursor: default;
	}
	&:disabled {
		cursor: default;
		.arrow {
			fill: #a9b1bd;
		}
	}
}
</style>
