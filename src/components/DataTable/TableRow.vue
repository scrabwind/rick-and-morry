<script setup lang="ts">
// import { defineProps } from 'vue'
import { Character } from './table.types'

import image from '../../assets/favorite.svg'
const filterEpisodes = (character: Character) => {
	const episode = Object.values(character.episode).at(-1)
	character.episode = episode.episode
	return character
}
let { character } = defineProps<{ character: Character }>()
const filteredCharacter = filterEpisodes(character)
// console.log(filteredCharacter)
// character = filterEpisodes(character)
</script>

<template>
	<div class="table-row margin">
		<!-- <div v-for="(item, name, index) in filteredCharacter">
			<img v-if="index == 0" :src="item" />
			<div v-else>{{ item }}</div>
			<div v-for="value in item">{{ value }}</div>
		</div> -->
		<img :src="filteredCharacter.image" class="photo" />
		<div>{{ filteredCharacter.id }}</div>
		<div>{{ filteredCharacter.name }}</div>
		<div>{{ filteredCharacter.gender }}</div>
		<div>{{ filteredCharacter.species }}</div>
		<div>{{ filteredCharacter.episode }}</div>
		<img :src="image" />
	</div>
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
</style>
