<script setup lang="ts">
import { defineComponent, computed } from 'vue'
import Page from './Page.vue'
import InlineSvg from 'vue-inline-svg'
import arrow from '../../assets/play_arrow_black_24dp.svg'
// import IconPageFirst from '../assets/icons/page-first.svg'
// import IconPageLast from '../assets/icons/page-last.svg'
// import IconChevronLeft from '../assets/icons/chevron-left.svg'
// import IconChevronRight from '../assets/icons/chevron-right.svg'
// export default defineComponent({
// 	name: 'VPagination',
// 	components: {
// 		IconPageFirst,
// 		IconChevronLeft,
// 		IconChevronRight,
// 		IconPageLast,
// 		VPage,
// 	},
// 	props: {
// 		pages: {
// 			type: Number,
// 			default: 0,
// 		},
// 		rangeSize: {
// 			type: Number,
// 			default: 1,
// 		},
// 		modelValue: {
// 			type: Number,
// 			default: 0,
// 		},
// 		activeColor: {
// 			type: String,
// 			default: '#DCEDFF',
// 		},
// 		hideFirstButton: {
// 			type: Boolean,
// 			default: false,
// 		},
// 		hideLastButton: {
// 			type: Boolean,
// 			default: false,
// 		},
// 	},
// 	emits: ['update:modelValue'],
// 	setup(props, { emit }) {
// 		// pagination
// 		const pagination = computed((): (number | null)[] => {
// 			const res = []
// 			const minPaginationElems = 5 + rangeSize * 2
// 			let rangeStart = pages <= minPaginationElems ? 1 : modelValue - rangeSize
// 			let rangeEnd = pages <= minPaginationElems ? pages : modelValue + rangeSize
// 			rangeEnd = rangeEnd > pages ? pages : rangeEnd
// 			rangeStart = rangeStart < 1 ? 1 : rangeStart
// 			if (pages > minPaginationElems) {
// 				const isStartBoundaryReached = rangeStart - 1 < 3
// 				const isEndBoundaryReached = pages - rangeEnd < 3
// 				if (isStartBoundaryReached) {
// 					rangeEnd = minPaginationElems - 2
// 					for (let i = 1; i < rangeStart; i++) {
// 						res.push(i)
// 					}
// 				} else {
// 					res.push(1)
// 					res.push(null)
// 				}
// 				if (isEndBoundaryReached) {
// 					rangeStart = pages - (minPaginationElems - 3)
// 					for (let i = rangeStart; i <= pages; i++) {
// 						res.push(i)
// 					}
// 				} else {
// 					for (let i = rangeStart; i <= rangeEnd; i++) {
// 						res.push(i)
// 					}
// 					res.push(null)
// 					res.push(pages)
// 				}
// 			} else {
// 				for (let i = rangeStart; i <= rangeEnd; i++) {
// 					res.push(i)
// 				}
// 			}
// 			return res
// 		})
// 		function updatePageHandler(params: number) {
// 			emit('update:modelValue', params)
// 		}
// 		// controls
// 		const isPrevControlsActive = computed((): boolean => {
// 			return modelValue > 1
// 		})
// 		const isNextControlsActive = computed((): boolean => {
// 			return modelValue < pages
// 		})
// 		function goToFirst(): void {
// 			if (isPrevControlsActive.value) {
// 				emit('update:modelValue', 1)
// 			}
// 		}
// 		function goToPrev(): void {
// 			if (isPrevControlsActive.value) {
// 				emit('update:modelValue', modelValue - 1)
// 			}
// 		}
// 		function goToLast(): void {
// 			if (isNextControlsActive.value) {
// 				emit('update:modelValue', pages)
// 			}
// 		}
// 		function goToNext(): void {
// 			if (isNextControlsActive.value) {
// 				emit('update:modelValue', modelValue + 1)
// 			}
// 		}
// 		return {
// 			pagination,
// 			updatePageHandler,
// 			isPrevControlsActive,
// 			isNextControlsActive,
// 			goToFirst,
// 			goToLast,
// 			goToPrev,
// 			goToNext,
// 		}
// 	},
// })
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
	console.log(pagination.value)
	return res
})
function updatePageHandler(params: number) {
	emit('update:modelValue', params)
	console.log('update page', params)
}
const isPrevControlsActive = computed((): boolean => {
	return props.modelValue > 1
})
const isNextControlsActive = computed((): boolean => {
	return props.modelValue < props.pages
})
function goToPrev(): void {
	if (isPrevControlsActive.value) {
		emit('update:modelValue', props.modelValue - 1)
		console.log('go to prev', props.modelValue)
	}
}
function goToNext(): void {
	if (isNextControlsActive.value) {
		emit('update:modelValue', props.modelValue + 1)
		console.log('go to next', props.modelValue)
	}
}
</script>
<!-- <template>
	<ul class="Pagination">
		<li v-if="!hideFirstButton" class="PaginationControl">
			<icon-page-first
				class="Control"
				:class="{ 'Control-active': isPrevControlsActive }"
				@click="goToFirst"
			/>
		</li>
		<li class="PaginationControl">
			<inline-svg
				:src="arrow"
				class="Control"
				:class="{ 'Control-active': isNextControlsActive }"
			/>
			<icon-chevron-left
				class="Control"
				:class="{ 'Control-active': isPrevControlsActive }"
				@click="goToPrev"
			/>
		</li>
		<Page
			v-for="page in pagination"
			:key="`pagination-page-${page}`"
			:page="page"
			:current="modelValue"
			:active-color="activeColor"
			@update="updatePageHandler"
		/>
		<li class="PaginationControl">
			<inline-svg
				:src="arrow"
				class="Control"
				:class="{ 'Control-active': isNextControlsActive }"
			/>
			<icon-chevron-right
				class="Control"
				:class="{ 'Control-active': isNextControlsActive }"
				@click="goToNext"
			/>
		</li>
		<li v-if="!hideLastButton" class="PaginationControl">
			<icon-page-last
				class="Control"
				:class="{ 'Control-active': isNextControlsActive }"
				@click="goToLast"
			/>
		</li>
	</ul>
</template> -->
<template>
	<ul class="pagination-test margin">
		<!-- <li v-if="!hideFirstButton" class="PaginationControl">
			<icon-page-first
				class="Control"
				:class="{ 'Control-active': isPrevControlsActive }"
				@click="goToFirst"
			/>
		</li> -->
		<li
			class="pagination-button"
			@click="goToPrev"
			:class="{ disabled: !isPrevControlsActive }"
		>
			<inline-svg
				:src="arrow"
				class="arrow left"
				:class="{ 'active-control': isPrevControlsActive }"
			/>
			<!-- <icon-chevron-left
				class="Control"
				:class="{ 'Control-active': isPrevControlsActive }"
				@click="goToPrev"
			/> -->
		</li>
		<Page
			v-for="page in pagination"
			:key="`pagination-page-${page}`"
			:page="page"
			:current="modelValue"
			@update="updatePageHandler"
		/>
		<li
			class="pagination-button"
			@click="goToNext"
			:class="{ disabled: !isNextControlsActive }"
		>
			<inline-svg
				:src="arrow"
				class="arrow"
				:class="{ 'active-control': isNextControlsActive }"
			/>
			<!-- <icon-chevron-right
				class="Control"
				:class="{ 'Control-active': isNextControlsActive }"
				@click="goToNext"
			/> -->
		</li>
		<!-- <li v-if="!hideLastButton" class="PaginationControl">
			<icon-page-last
				class="Control"
				:class="{ 'Control-active': isNextControlsActive }"
				@click="goToLast"
			/>
		</li> -->
	</ul>
</template>
<style scoped lang="scss">
.Pagination {
	display: flex;
	flex-flow: row;
	flex-wrap: wrap;
	align-items: center;
	margin: 0;
	padding: 0;
	list-style-type: none;
	// width: 500px;
	// height: 500px;
	// background-color: red;
}
.PaginationControl {
	display: flex;
	align-items: center;
}
.Control {
	position: relative;
	display: block;
	width: 18px;
	height: 18px;
	margin: 0 2px;
	fill: grey;
	&-active {
		fill: black;
		cursor: pointer;
		transition: fill 0.2s ease-in-out;
		&:hover {
			fill: black;
			transition: fill 0.2s ease-in-out;
		}
	}
}

.pagination-test {
	padding-top: 2.5rem;
	display: flex;
	list-style-type: none;
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
	fill: #a9b1bd;
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
.active-control {
	fill: #11b0c8;
}
.disabled {
	cursor: default;
}
</style>
