<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ items: string[] }>()
</script>

<template>
	<div>
		<div v-for="item in items">{{ item }}</div>
	</div>
</template>

<style scoped lang="scss"></style>
