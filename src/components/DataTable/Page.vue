<script setup lang="ts">
import { defineComponent, computed, ref } from 'vue'
import InlineSvg from 'vue-inline-svg'
// import IconPaginationDots from '../../assets/icons/pagination-dots.svg'

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
<!-- <template>
	<li>
		<span v-if="page === null" class="DotsHolder">
			<div class="Dots">...</div>
			<inline-svg class="Dots" :src="IconPaginationDots" />
		</span>
		<button
			class="Page "
			type="button"
			:aria-label="`Go to page ${page}`"
			:class="{ 'Page-active': isActive }"
			:style="`background-color: ${isActive ? 'red' : 'transparent'};`"
			@click="clickHandler"
		>
			{{ page }}
		</button>
	</li>
</template> -->
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
.Page {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22px;
	height: 22px;
	margin: 0 2px;
	color: black;
	background-color: transparent;
	font-size: 14px;
	border-radius: 3px;
	box-sizing: border-box;
	border-color: transparent;
	cursor: pointer;
	outline: 0;
	user-select: none;
	&:hover {
		border: 1px solid grey;
	}
	&-active {
		color: grey;
		border: 1px solid grey;
	}
	background-color: red;
}
.DotsHolder {
	display: flex;
	align-items: center;
	justify-content: center;
	width: 22px;
	height: 22px;
	margin: 0 2px;
	box-sizing: border-box;
}
.Dots {
	width: 8px;
	height: 4px;
	fill: grey;
}

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
}
</style>
