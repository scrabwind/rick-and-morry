<script setup lang="ts">
import { watch } from 'fs'
import { ref, toRefs, watchEffect } from 'vue'
const isCharActive = ref<boolean>(true)
const emit = defineEmits(['activeChar'])
watchEffect(() => {
	emit('activeChar', isCharActive.value)
})
</script>

<template>
	<div class="top-bar">
		<div
			@click="() => (isCharActive = true)"
			:class="isCharActive ? 'button active' : 'button hover'"
		>
			All characters
		</div>
		<div
			class="button"
			@click="() => (isCharActive = false)"
			:class="!isCharActive ? 'button active' : 'button hover'"
		>
			Favorite
		</div>
	</div>
</template>

<style scoped lang="scss">
.top-bar {
	display: flex;
	padding: 2rem;
}
.button {
	cursor: pointer;
	padding: 0;
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
