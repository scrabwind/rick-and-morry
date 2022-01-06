<script setup lang="ts">
import { ref } from 'vue'
import InlineSvg from 'vue-inline-svg'
import arrow from '../../assets/play_arrow_black_24dp.svg'
import search from '../../assets/search_black_24dp.svg'

// defineProps<{ msg: string; color: string }>()
</script>

<template>
	<div>
		<span>Search By</span>
		<button class="button">
			<div>Name</div>
			<inline-svg :src="arrow" class="svg" />
		</button>
		<div>
			<input class="input" />
			<inline-svg :src="search" class="svg" />
		</div>
	</div>
</template>

<style scoped lang="scss">
.button,
.input {
	border: transparent;
	background-color: transparent;
}
.svg {
	fill: #a9b1bd;
}
</style>
