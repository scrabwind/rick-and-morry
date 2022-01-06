<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{ items: string[] }>()
</script>

<template>
	<thead class="table-header margin">
		<div v-for="item in items">{{ item }}</div>
	</thead>
</template>

<style scoped lang="scss">
.table-header {
	display: grid;
	grid-template-columns: repeat(7, calc(74rem / 7));
	height: 50px;
	background-color: rgba(#e5eaf4, 0.25);
	align-items: center;
}
</style>
