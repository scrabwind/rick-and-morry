<script setup lang="ts">
import { computed } from 'vue'
import Page from './Page.vue'
import InlineSvg from 'vue-inline-svg'
import arrow from '../../assets/play_arrow_black_24dp.svg'
const props = defineProps<{
	pages: number
	rangeSize: number
	modelValue: number
}>()
const emit = defineEmits(['update:modelValue'])
const pagination = computed((): (number | null)[] => {
	const res = []
	const minPaginationElems = 5 + props.rangeSize * 2
	let rangeStart =
		props.pages <= minPaginationElems ? 1 : props.modelValue - props.rangeSize
	let rangeEnd =
		props.pages <= minPaginationElems
			? props.pages
			: props.modelValue + props.rangeSize
	rangeEnd = rangeEnd > props.pages ? props.pages : rangeEnd
	rangeStart = rangeStart < 1 ? 1 : rangeStart
	if (props.pages > minPaginationElems) {
		const isStartBoundaryReached = rangeStart - 1 < 3
		const isEndBoundaryReached = props.pages - rangeEnd < 3
		if (isStartBoundaryReached) {
			rangeEnd = minPaginationElems - 2
			for (let i = 1; i < rangeStart; i++) {
				res.push(i)
			}
		} else {
			res.push(1)
			res.push(null)
		}
		if (isEndBoundaryReached) {
			rangeStart = props.pages - (minPaginationElems - 3)
			for (let i = rangeStart; i <= props.pages; i++) {
				res.push(i)
			}
		} else {
			for (let i = rangeStart; i <= rangeEnd; i++) {
				res.push(i)
			}
			res.push(null)
			res.push(props.pages)
		}
	} else {
		for (let i = rangeStart; i <= rangeEnd; i++) {
			res.push(i)
		}
	}
	return res
})
const updatePageHandler = (params: number) => {
	emit('update:modelValue', params)
}
const isPrevControlsActive = computed((): boolean => {
	return props.modelValue > 1
})
const isNextControlsActive = computed((): boolean => {
	return props.modelValue < props.pages
})
const goToPrev = (): void => {
	if (isPrevControlsActive.value) {
		emit('update:modelValue', props.modelValue - 1)
	}
}
const goToNext = (): void => {
	if (isNextControlsActive.value) {
		emit('update:modelValue', props.modelValue + 1)
	}
}
</script>
<template>
	<ul class="pagination-container margin">
		<li
			class="button"
			@click="goToPrev"
			:class="{ disabled: !isPrevControlsActive }"
		>
			<inline-svg
				:src="arrow"
				class="arrow arrow-left"
				:class="{ 'arrow-active': isPrevControlsActive }"
			/>
		</li>
		<Page
			v-for="page in pagination"
			:page="page"
			:current="modelValue"
			@update="updatePageHandler"
		/>
		<li
			class="button"
			@click="goToNext"
			:class="{ disabled: !isNextControlsActive }"
		>
			<inline-svg
				:src="arrow"
				class="arrow"
				:class="{ 'arrow-active': isNextControlsActive }"
			/>
		</li>
	</ul>
</template>
<style scoped lang="scss">
.pagination-container {
	padding-top: 2.5rem;
	display: flex;
	list-style-type: none;
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

		.arrow {
			fill: #a9b1bd;
			justify-content: center;
			width: 1rem;
			height: 1rem;
			&-active {
				fill: $color-blue;
			}
			&-left {
				transform: rotate(180deg);
			}
		}
	}
	.disabled {
		cursor: default;
	}
}
</style>
