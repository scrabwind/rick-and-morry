<script setup lang="ts">
defineProps<{ items: string[] }>()
</script>

<template>
	<thead class="table-header margin">
		<tr v-for="item in items">
			{{
				item
			}}
		</tr>
	</thead>
</template>

<style scoped lang="scss">
.table-header {
	display: grid;
	grid-template-columns: repeat(7, calc(74rem / 7));
	height: 50px;
	background-color: $header-color;
	align-items: center;
}
</style>
