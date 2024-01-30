export const weatherForecast = 'https://weatherapi-com.p.rapidapi.com/forecast.json?q='
export const searchLocation = 'https://weatherapi-com.p.rapidapi.com/search.json?q='

const options = {
	headers: {
		'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY,
		'X-RapidAPI-Host': import.meta.env.VITE_RAPIDAPI_HOST
	}
}

export async function fetcher(url: string) {
	const res = await fetch(url, options)
	const state = res.ok
	const response = await res.json()

	if (!state) {
		throw new Error(response.error.message)
	}
	
	return response
}
