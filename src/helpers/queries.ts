import { gql } from 'graphql-request'

const queryAll = (search: string, page: number): string => {
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

const queryAllCount = (search: string, requestPage: number): string => {
	return gql`
			query {
				characters(filter: { name: "${search}" } page: ${requestPage}) {
					info {
						count
					}
				}
			}
		`
}

const queryEpisode = (search: string): string => {
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

const queryFavorite = (storage: string): string => {
	return gql`
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
}
export { queryAll, queryAllCount, queryEpisode, queryFavorite }
