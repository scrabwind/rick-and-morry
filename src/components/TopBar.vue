<script setup lang="ts">
export interface Emits {
	(event: 'activeChar', msg: boolean): void
}

import { ref, watchEffect } from 'vue'

const isCharActive = ref<boolean>(true)
const emit = defineEmits<Emits>()
watchEffect(() => {
	emit('activeChar', isCharActive.value)
})
</script>

<template>
	<div class="top-bar">
		<div
			@click="() => (isCharActive = true)"
			class="button"
			:class="isCharActive ? 'active' : 'hover'"
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
	padding: 2rem 2rem 2rem 8.75rem;
	@media (max-width: 1320px) {
		padding-left: 1rem;
	}
}
.button {
	cursor: pointer;
	padding: 0;
	margin: 0 5rem 0 0;
}

.active {
	color: $color-blue;
	border-bottom: 3px solid $color-blue;
}

.hover:hover {
	border-bottom: 3px solid $color-grey;
}
</style>
