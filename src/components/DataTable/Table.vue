<script setup lang="ts">
import { Character, Response } from './table.types'

import { onBeforeMount, onMounted, ref, Suspense } from 'vue'
import TableHeader from './TableHeader.vue'
import TableRow from './TableRow.vue'
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
const characters = ref<Character[]>([])
onMounted(async () => {
	const data: Response = await request(
		'https://rickandmortyapi.com/graphql',
		query
	)
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
	<!-- <h1>{{ characters }}</h1> -->
	<TableRow
		class="table-row margin"
		v-for="character in characters"
		:character="character"
	/>
	<!-- <div class="table-items margin">
		<div>{{ getItems() }}</div>
	</div> -->
</template>

<style scoped lang="scss">
.table-header {
	display: grid;
	grid-template-columns: repeat(7, 1fr);
	height: 50px;
	background-color: rgba(#e5eaf4, 0.25);
	align-items: center;
}
</style>
