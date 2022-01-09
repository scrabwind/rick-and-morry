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
const apiPageSize = import.meta.env.VITE_API_PAGE_SIZE

const props = defineProps<{
	search: string
	options: string
	page: number
	charActive: boolean
}>()
const { search, options, charActive } = toRefs(props)
const characters = ref<Character[]>([])
const charCount = ref<number>(1)
const pageCount = ref<number>(1)
const requestPage = ref<number>(1)

const page = ref<number>(1)

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

// watchEffect(async () => {
// 	characters.value = []
// 	charCount.value = 0
// 	pageCount.value = 0
// 	requestPage.value = 1
// 	if (options.value === 'Name') {
// 		const countData = await request(
// 			'https://rickandmortyapi.com/graphql',
// 			gql`
// 		query {
// 			characters(filter: { name: "${search.value}" }) {
// 				info {
// 					count
// 				}
// 			}
// 		}
// 	`
// 		)
// 		charCount.value = countData.characters.info.count
// 		charCount.value % elementsPerPage == 0
// 			? (pageCount.value = charCount.value / elementsPerPage)
// 			: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)

// 		const queryName = gql`
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
// 		const data = await request('https://rickandmortyapi.com/graphql', queryName)
// 		characters.value = data.characters.results.slice(0, elementsPerPage)
// 	} else if (options.value === 'Episode') {
// 		const queryEpisode = gql`
// 			query {
// 				episodes(filter: { episode: "${search.value}" }) {
// 					results {
// 						characters {
// 							image
// 							id
// 							name
// 							gender
// 							species
// 							episode {
// 								episode
// 							}
// 						}
// 					}
// 				}
// 			}
// 		`
// 		const data = await request(
// 			'https://rickandmortyapi.com/graphql',
// 			queryEpisode
// 		)
// 		characters.value = data.episodes.results[0].characters.slice(
// 			0,
// 			elementsPerPage
// 		)

// 		const countData = await request(
// 			'https://rickandmortyapi.com/graphql',
// 			gql`
// 				query {
// 					episodes(filter: { episode: "${search.value}" }) {
// 						info {
// 							count
// 						}
// 					}
// 				}
// 			`
// 		)
// 		charCount.value = countData.episodes.info.count
// 		charCount.value % elementsPerPage == 0
// 			? (pageCount.value = charCount.value / elementsPerPage)
// 			: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
// 	}

// 	// .then(data => {
// 	// 	characters.value = data.characters.results.slice(0, elementsPerPage)
// 	// })
// })

const query = (search, page) => {
	return gql`
		query {
			characters(filter: { name: "${search}" } page: ${page}) {
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
}

const queryEpisode = search => {
	if (!search) search = 'S01E01'
	return gql`
			query {
				episodes(filter: { episode: "${search}" }) {
					results {
						characters {
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
			}
		`
}

watchEffect(async () => {
	characters.value = []
	charCount.value = 0
	pageCount.value = 0
	requestPage.value = 1
	page.value = page.value
	if (props.charActive) {
		if (options.value === 'Name') {
			requestPage.value = Math.ceil((page.value * elementsPerPage) / 20)
			const countData = await request(
				'https://rickandmortyapi.com/graphql',
				gql`
			query {
				characters(filter: { name: "${search.value}" } page: ${requestPage.value}) {
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
				: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)

			// const queryName = gql`
			// 	query {
			// 		characters(filter: { name: "${search.value}" } page: ${requestPage.value}) {
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
			const data = await request(
				'https://rickandmortyapi.com/graphql',
				query(search.value, requestPage.value)
			)
			const value = ((page.value - 1) * elementsPerPage) % apiPageSize
			console.log(requestPage.value)
			if (page.value % 10 === 0) {
				let together = []
				const req2 = requestPage.value + 1
				console.log(req2)
				const page2 = await request(
					'https://rickandmortyapi.com/graphql',
					query(search.value, req2)
				)
				console.log(page2)
				together.push(...data.characters.results)
				together.push(...page2.characters.results)
				console.log(together)
				characters.value = together.slice(value, value + parseInt(elementsPerPage))
			} else if ((page.value * elementsPerPage) % apiPageSize < 6) {
				let together = []
				const req2 = requestPage.value - 1
				console.log(req2)
				const page2 = await request(
					'https://rickandmortyapi.com/graphql',
					query(search.value, req2)
				)
				console.log(page2)
				together.push(...page2.characters.results)
				together.push(...data.characters.results)
				console.log(together)
				characters.value = together.slice(value, value + parseInt(elementsPerPage))
				// characters.value = together.slice(16, 22)
			} else {
				characters.value = data.characters.results.slice(
					value,
					value + parseInt(elementsPerPage)
				)

				console.log(data.characters.results)
			}
		} else if (options.value === 'Episode') {
			const value = (page.value - 1) * elementsPerPage

			const data = await request(
				'https://rickandmortyapi.com/graphql',
				queryEpisode(search.value)
			)
			charCount.value = data.episodes.results[0].characters.length
			charCount.value % elementsPerPage == 0
				? (pageCount.value = charCount.value / elementsPerPage)
				: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
			characters.value = data.episodes.results[0].characters.slice(
				value,
				value + parseInt(elementsPerPage)
			)
			console.log('CHARACTERS' + characters.value)
		}
	}
	if (!charActive.value) {
		const storage = localStorage.getItem('favoriteList')
		if (!storage) return
		// const parsed: string[] = JSON.parse(storage)
		charCount.value = JSON.parse(storage).length

		charCount.value % elementsPerPage == 0
			? (pageCount.value = charCount.value / elementsPerPage)
			: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
		const value = (page.value - 1) * elementsPerPage
		const data = await request(
			'https://rickandmortyapi.com/graphql',
			gql`
				query {
					charactersByIds(ids: ${storage}) {
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
			`
		)
		characters.value = data.charactersByIds.slice(value, value + elementsPerPage)
	}
})
watch([search, charActive], () => {
	page.value = 1
})
// watch(charActive, async () => {
// 	characters.value = []

// })
// watch([search, page], async (newValues, prevValues) => {
// 	characters.value = []
// 	charCount.value = 0
// 	pageCount.value = 0
// 	requestPage.value = 1
// 	// if (options.value === 'Name') {
// 	const countData = await request(
// 		'https://rickandmortyapi.com/graphql',
// 		gql`
// 		query {
// 			characters(filter: { name: "${search.value}" } page: ${requestPage.value}) {
// 				info {
// 					count
// 				}
// 			}
// 		}
// 	`
// 	)
// 	charCount.value = countData.characters.info.count
// 	charCount.value % elementsPerPage == 0
// 		? (pageCount.value = charCount.value / elementsPerPage)
// 		: (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)

// 	const queryName = gql`
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
// 	const data = await request('https://rickandmortyapi.com/graphql', queryName)
// 	characters.value = data.characters.results.slice(
// 		(page.value - 1) * elementsPerPage,
// 		elementsPerPage * page.value
// 	)
// })
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
	<TableRow
		v-for="character in characters"
		:character="character"
		:char-active="charActive"
	/>
	<Pagination :pages="pageCount" :rangeSize="1" v-model="page" />
	<!-- <div class="table-items margin">
		<div>{{ getItems() }}</div>
	</div> -->
</template>

<style scoped lang="scss"></style>
