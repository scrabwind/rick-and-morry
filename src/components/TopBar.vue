<script setup lang="ts">
import { ref } from 'vue'
const test = () => {
	alert('h1')
}
// defineProps<{ msg: string; color: string }>()
</script>

<template>
	<div class="top-bar">
		<button @click="test">All characters</button>
		<button>Favorite</button>
	</div>
</template>

<style scoped lang="scss">
// img {
// 	width: 50px;
// 	height: 30px;
// }
.top-bar {
	display: flex;
	padding: 2rem;
	border-bottom: 1px solid #e5eaf4;
}
button {
	cursor: pointer;
	padding: 0;
	// width: 75px;
	// height: 25px;
	margin: 0 2.5rem 0 2.5rem;
	background-color: transparent;
	border-color: transparent;
	color: inherit;
}
</style>
