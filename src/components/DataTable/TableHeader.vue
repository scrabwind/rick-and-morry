<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ items: string[] }>()
</script>

<template>
	<thead>
		<div v-for="item in items">{{ item }}</div>
	</thead>
</template>

<style scoped lang="scss"></style>
