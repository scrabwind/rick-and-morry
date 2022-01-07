<script setup lang="ts">
import type { Character, Response, CountResponse } from './table.types'

import {
	computed,
	onBeforeMount,
	onBeforeUpdate,
	onMounted,
	onUpdated,
	ref,
	Suspense,
	toRefs,
	watch,
	watchEffect,
	watchPostEffect,
	watchSyncEffect,
} from 'vue'
import TableHeader from './TableHeader.vue'
import TableRow from './TableRow.vue'
import { GraphQLClient, gql, request } from 'graphql-request'
import Pagination from './Pagination.vue'

const elementsPerPage = import.meta.env.VITE_ELEMENTS_PER_PAGE

const props = defineProps<{ search: string }>()
const { search } = toRefs(props)
const characters = ref<Character[]>([])
const charCount = ref<number>(0)
const pageCount = ref<number>(0)

// onMounted(async () => {
// 	const query = gql`
// 	query {
// 		characters(filter: { name: "${search.value}" }) {
// 			results {
// 				image
// 				id
// 				name
// 				gender
// 				species
// 				episode {
// 					episode
// 				}
// 			}
// 		}
// 	}
// `
// 	const elementsPerPage = import.meta.env.VITE_ELEMENTS_PER_PAGE
// 	const data: Response = await request(
// 		'https://rickandmortyapi.com/graphql',
// 		query
// 	)
// 	characters.value = data.characters.results.slice(0, elementsPerPage)

// 	const countData: CountResponse = await request(
// 		'https://rickandmortyapi.com/graphql',
// 		gql`
// 			query {
// 				characters(filter: { name: "${search.value}" }) {
// 					info {
// 						count
// 					}
// 				}
// 			}
// 		`
// 	)
// 	charCount.value = countData.characters.info.count
// 	charCount.value % elementsPerPage == 0
// 		? (pageCount.value = charCount.value / elementsPerPage)
// 		: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
// })

// const query = gql`
// 		query {
// 			characters(filter: { name: "${search.value}" }) {
// 				results {
// 					image
// 					id
// 					name
// 					gender
// 					species
// 					episode {
// 						episode
// 					}
// 				}
// 			}
// 		}
// 	`

// onBeforeUpdate(() => {

// })

watchEffect(async () => {
	characters.value = []
	charCount.value = 0
	pageCount.value = 0
	const query = gql`
		query {
			characters(filter: { name: "${search.value}" }) {
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
	const data: Response = await request(
		'https://rickandmortyapi.com/graphql',
		query
	)
	// .then(data => {
	// 	characters.value = data.characters.results.slice(0, elementsPerPage)
	// })
	characters.value = data.characters.results.slice(0, elementsPerPage)

	request(
		'https://rickandmortyapi.com/graphql',
		gql`
		query {
			characters(filter: { name: "${search.value}" }) {
				info {
					count
				}
			}
		}
	`
	).then(countData => {
		charCount.value = countData.characters.info.count
		charCount.value % elementsPerPage == 0
			? (pageCount.value = charCount.value / elementsPerPage)
			: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
	})
})

// const characterRefs = ref([])
// const setCharacterRef = el => {
// 	el ? characterRefs.value.push(el) : el
// }

// watch(search, async () => {
// 	const query = gql`
// 		query {
// 			characters(filter: { name: "${search.value}" }) {
// 				results {
// 					image
// 					id
// 					name
// 					gender
// 					species
// 					episode {
// 						episode
// 					}
// 				}
// 			}
// 		}
// 	`
// 	const data = await request('https://rickandmortyapi.com/graphql', query)
// 	// .then(data => {
// 	// 	characters.value = data.characters.results.slice(0, elementsPerPage)
// 	// })
// 	characters.value = data.characters.results.slice(0, elementsPerPage)
// })

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
	<Pagination :pageCount="pageCount" />
	<!-- <div class="table-items margin">
		<div>{{ getItems() }}</div>
	</div> -->
</template>

<style scoped lang="scss"></style>
