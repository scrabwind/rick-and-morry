<script setup lang="ts">
import { ref } from 'vue'

// defineProps<{ msg: string; color: string }>()
</script>

<template>
	<div class="container">
		<img alt="Rick and Morty logo" src="../assets/logo.svg" />
		<div class="test"></div>
	</div>
</template>

<style scoped lang="scss">
// img {
// 	width: 50px;
// 	height: 30px;
// }
.container {
	display: flex;
	padding: 2rem;
	border-bottom: 1px solid #e5eaf4;
	align-items: center;
}
.test {
	width: 500px;
	height: 50px;
	border: 1px solid #a9b1bd;
	border-radius: 12px;
	margin-left: 5rem;
}
</style>
