<script setup lang="ts">
import { ref } from 'vue'
// const buttonHandling = (event: MouseEvent) => {
// 	console.log(event.)
// }
const isCharActive = ref<boolean>(true)
const isFavActive = ref<boolean>(false)
// defineProps<{ msg: string; color: string }>()
</script>

<template>
	<div class="top-bar">
		<div
			@click="() => ((isCharActive = true), (isFavActive = false))"
			:class="isCharActive ? 'button active' : 'button hover'"
		>
			All characters
		</div>
		<div
			class="button"
			@click="() => ((isFavActive = true), (isCharActive = false))"
			:class="isFavActive ? 'button active' : 'button hover'"
		>
			Favorite
		</div>
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
}
.button {
	cursor: pointer;
	padding: 0;
	// width: 75px;
	// height: 25px;
	margin: 0 5rem 0 0;
}

.active {
	color: #11b0c8;
	border-bottom: 3px solid #11b0c8;
}

.hover:hover {
	border-bottom: 3px solid #a9b1bd;
}
</style>
