<script setup lang="ts">
import { onBeforeMount, onMounted, ref, Suspense } from 'vue'
import TableHeader from './TableHeader.vue'
import TableItem from './TableItem.vue'
import { GraphQLClient, gql, request } from 'graphql-request'

const query = gql`
	query {
		characters {
			results {
				image
				id
				name
				gender
				species
				episode {
					episode
				}
			}
		}
	}
`
const characters = ref([])
onMounted(async () => {
	const data = await request('https://rickandmortyapi.com/graphql', query)
	characters.value = data.characters.results
})
const categories: string[] = [
	'Photo',
	'Character ID',
	'Name',
	'Gender',
	'Species',
	'Last Episode',
	'Add To Favorites',
]
</script>

<template>
	<TableHeader class="table-header margin" :items="categories" />
	<h1>{{ characters }}</h1>
	<TableItem class="table-items margin" v-for="character in characters">{{
		character
	}}</TableItem>
	<!-- <div class="table-items margin">
		<div>{{ getItems() }}</div>
	</div> -->
</template>

<style scoped lang="scss">
.table-header {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	height: 50px;
	background-color: #e5eaf4;
}

.table-items {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	grid-template-rows: repeat(7, 1fr);
}
</style>
