<script setup lang="ts">
import type { Character, RowCharcter } from './table.types'
import { onMounted, ref, onBeforeMount } from 'vue'

import InlineSvg from 'vue-inline-svg'
import star from '../../assets/star_black_24dp.svg'
import male from '../../assets/male_black_24dp.svg'
import female from '../../assets/female_black_24dp.svg'
import genderless from '../../assets/clear_black_24dp.svg'
import unknown from '../../assets/clear_black_24dp.svg'

const { character } =
	defineProps<{ character: Character; charActive: boolean }>()

const filteredCharacter = ref<RowCharcter>({ ...character, isChecked: false })
const genderIcon = ref<string>('')

onBeforeMount(() => {
	const episode = Object.values(character.episode).at(-1)
	filteredCharacter.value.episode = episode.episode
	const gender = filteredCharacter.value.gender

	if (gender === 'Male') genderIcon.value = male
	else if (gender === 'Female') genderIcon.value = female
	else if (gender === 'Genderless') genderIcon.value = genderless
	else if (gender === 'unknown') genderIcon.value = unknown
	const storageList = localStorage.getItem('favoriteList')
	if (storageList) {
		const list = JSON.parse(storageList)
		list.includes(filteredCharacter.value.id)
			? (filteredCharacter.value.isChecked = true)
			: (filteredCharacter.value.isChecked = false)
	}
})

const done = () => {
	filteredCharacter.value.isChecked = !filteredCharacter.value.isChecked
	console.log(localStorage.getItem('favoriteList'))
}

const favoriteHandler = (id: string) => {
	// isChecked = !isChecked
	// colors.value = colors.value.reverse()
	const storageList = localStorage.getItem('favoriteList')
	let list: string[] = []
	// ADD TO STORAGE
	if (!storageList) {
		list.push(id)
		localStorage.setItem('favoriteList', JSON.stringify(list))
		done()
		return
	}
	if (storageList && JSON.parse(storageList).includes(id)) {
		list = JSON.parse(storageList)
		const index = list.indexOf(id)
		if (index !== -1) {
			list.splice(index, 1)
		}
		localStorage.setItem('favoriteList', JSON.stringify(list))
		done()
		return
	}
	if (storageList && !JSON.parse(storageList).includes(id)) {
		list = JSON.parse(storageList)
		list.push(id)
		localStorage.setItem('favoriteList', JSON.stringify(list))
		done()
		return
	}
}

const hideFavorite = (charActive: boolean, isChecked: boolean) => {
	if (charActive) return true
	if (!charActive && isChecked) return true
	return false
}
const getGenderIcon = (gender: string) => {
	return ''
}
</script>

<template>
	<tr
		class="table-row margin"
		v-if="hideFavorite(charActive, filteredCharacter.isChecked)"
	>
		<!-- <div v-for="(item, name, index) in filteredCharacter">
			<img v-if="index == 0" :src="item" />
			<div v-else>{{ item }}</div>
			<div v-for="value in item">{{ value }}</div>
		</div> -->
		<td>
			<img :src="filteredCharacter.image" class="photo" />
		</td>
		<td>{{ filteredCharacter.id }}</td>
		<td>{{ filteredCharacter.name }}</td>
		<td class="gender">
			<inline-svg :src="genderIcon" class="gender-svg" />{{
				filteredCharacter.gender
			}}
		</td>
		<td>{{ filteredCharacter.species }}</td>
		<td>{{ filteredCharacter.episode }}</td>
		<td
			:class="filteredCharacter.isChecked ? 'favorite checked' : 'favorite'"
			@click="() => favoriteHandler(filteredCharacter.id)"
		>
			<inline-svg
				:src="star"
				:class="filteredCharacter.isChecked ? 'checked-svg' : 'favorite-svg'"
			/>
		</td>
	</tr>
</template>

<style scoped lang="scss">
.table-row {
	display: grid;
	grid-template-columns: repeat(7, calc(74rem / 7));
	align-items: center;
	border-bottom: 1px solid #e5eaf4;
}
.photo {
	display: block;
	height: 68px;
	width: 43px;
	object-fit: cover;
	padding: 0.5rem 0;
}

.gender {
	display: flex;
	align-items: center;
	.gender-svg {
		fill: #a9b1bd;
		width: 1.5rem;
		height: 1.5rem;
	}
}

.favorite {
	user-select: none;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 2.5rem;
	height: 43px;
	width: 43px;
	border: 2px solid #11b0c8;
	border-radius: 8px;
	background-color: white;
	cursor: pointer;
	.favorite-svg {
		width: 1.25rem;
		height: 1.25rem;
		fill: #11b0c8;
	}
}
.checked {
	background-color: #11b0c8;
}
.checked-svg {
	width: 1.25rem;
	height: 1.25rem;
	fill: white;
}
</style>
