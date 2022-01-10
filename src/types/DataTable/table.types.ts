import type { Character } from '../Common/common.types'

export interface TableCharacter extends Character {}

export interface Response {
	characters: {
		results: Character[]
	}
}

export interface CountResponse {
	characters: {
		info: {
			count: number
		}
	}
}
