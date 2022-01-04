<script setup lang="ts">
import { ref } from 'vue'

defineProps<{ msg: string; color: string }>()
</script>

<template>
	<img alt="Rick and Morty logo" src="../assets/logo.svg" />
</template>

<style scoped lang="scss"></style>
