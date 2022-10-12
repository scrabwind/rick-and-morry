<script setup lang="ts">
  import { ref, toRefs, watch, watchEffect } from 'vue'
  import type { TableCharacter } from '../../types/DataTable/table.types'

  import requestApi from '../../helpers/requests'
  import {
    queryAll,
    queryAllCount,
    queryEpisode,
    queryFavorite
  } from '../../helpers/queries'

  import TableHeader from './TableHeader.vue'
  import TableRow from './TableRow.vue'
  import Pagination from './Pagination.vue'

  interface Props {
    search: string
    options: string
    page: number
    charActive: boolean
  }

  const props = defineProps<Props>()
  const { search, options, charActive } = toRefs(props)
  const characters = ref<TableCharacter[]>([])
  const charCount = ref<number>(1)
  const pageCount = ref<number>(1)
  const requestPage = ref<number>(1)
  const page = ref<number>(1)

  const categories: string[] = [
    'Photo',
    'Character ID',
    'Name',
    'Gender',
    'Species',
    'Last Episode',
    'Add To Favorites'
  ]
  const elementsPerPage = parseInt(import.meta.env.VITE_ELEMENTS_PER_PAGE)
  const apiPageSize = parseInt(import.meta.env.VITE_API_PAGE_SIZE)

  const nameOption = async (): Promise<void> => {
    requestPage.value = Math.ceil((page.value * elementsPerPage) / 20)
    const [data, countData] = await requestApi([
      queryAll(search.value, requestPage.value),
      queryAllCount(search.value, requestPage.value)
    ])
    charCount.value = countData.data.characters.info.count
    charCount.value % elementsPerPage == 0
      ? (pageCount.value = charCount.value / elementsPerPage)
      : (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
    const value = ((page.value - 1) * elementsPerPage) % apiPageSize
    if (page.value % 10 === 0) {
      const together = []
      const req2 = requestPage.value + 1
      const page2 = await requestApi([queryAll(search.value, req2)])
      together.push(...data.data.characters.results)
      together.push(...page2.characters.results)
      characters.value = together.slice(value, value + elementsPerPage)
      return
    }
    if ((page.value * elementsPerPage) % apiPageSize < 6) {
      const together = []
      const req2 = requestPage.value - 1
      const page2 = await requestApi([queryAll(search.value, req2)])
      together.push(...page2.characters.results)
      together.push(...data.data.characters.results)
      characters.value = together.slice(value, value + elementsPerPage)
      return
    }
    characters.value = data.data.characters.results.slice(
      value,
      value + elementsPerPage
    )
  }

  const episodeOption = async (): Promise<void> => {
    const value = (page.value - 1) * elementsPerPage

    const data = await requestApi([queryEpisode(search.value)])
    charCount.value = data.episodes.results[0].characters.length
    charCount.value % elementsPerPage == 0
      ? (pageCount.value = charCount.value / elementsPerPage)
      : (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
    characters.value = data.episodes.results[0].characters.slice(
      value,
      value + elementsPerPage
    )
  }

  const favoriteOption = async (): Promise<void> => {
    const storage = localStorage.getItem('favoriteList')
    if (!storage) return
    charCount.value = JSON.parse(storage).length
    charCount.value % elementsPerPage == 0
      ? (pageCount.value = charCount.value / elementsPerPage)
      : (pageCount.value = Math.floor(charCount.value / elementsPerPage) + 1)
    const value = (page.value - 1) * elementsPerPage
    const data = await requestApi([queryFavorite(storage)])
    characters.value = data.charactersByIds.slice(
      value,
      value + elementsPerPage
    )
  }

  const tabs = async (isCharActive: boolean): Promise<void> => {
    if (isCharActive) {
      if (options.value === 'Name') return nameOption()
      if (options.value === 'Episode') return episodeOption()
    }
    if (!isCharActive) return favoriteOption()
  }

  watchEffect(() => {
    characters.value = []
    charCount.value = 0
    pageCount.value = 0
    requestPage.value = 1
    page.value = page.value
    tabs(charActive.value)
  })
  watch([search, charActive], () => {
    page.value = 1
  })
</script>

<template>
  <table>
    <TableHeader
      class="table-header"
      :items="categories"
    />
    <tbody class="tbody">
      <TableRow
        v-for="character in characters"
        :character="character"
        :char-active="charActive"
      />
    </tbody>
  </table>
  <Pagination
    v-model="page"
    :pages="pageCount"
    :range-size="1"
  />
</template>
<style scoped lang="scss">
  .table {
    width: 100%;
    overflow-x: scroll;
  }
  .tbody {
    height: 524px;
  }
</style>
