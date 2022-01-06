type Episode = { episode: string }[] | string

export interface Character {
	image: string
	id: string
	name: string
	gender: string
	species: string
	episode: Episode
}

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
