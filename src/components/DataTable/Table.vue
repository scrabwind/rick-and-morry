<script setup lang="ts">
import { Character, Response, CountResponse } from './table.types'

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
const charCount = ref<number>()
const pageCount = ref<number>()
onMounted(async () => {
	const elementsPerPage = parseInt(import.meta.env.VITE_ELEMENTS_PER_PAGE)
	const data: Response = await request(
		'https://rickandmortyapi.com/graphql',
		query
	)
	characters.value = data.characters.results.slice(0, elementsPerPage)

	const countData: CountResponse = await request(
		'https://rickandmortyapi.com/graphql',
		gql`
			query {
				characters {
					info {
						count
					}
				}
			}
		`
	)
	charCount.value = countData.characters.info.count
	charCount.value % elementsPerPage == 0
		? (pageCount.value = charCount.value / elementsPerPage)
		: (pageCount.value = charCount.value / elementsPerPage + 1)
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
	<TableHeader class="table-header" :items="categories" />
	<!-- <h1>{{ characters }}</h1> -->
	<TableRow v-for="character in characters" :character="character" />
	<!-- <div class="table-items margin">
		<div>{{ getItems() }}</div>
	</div> -->
</template>

<style scoped lang="scss"></style>
