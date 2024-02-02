import { Astro } from '@/interfaces/astro'
import { Current } from '@/interfaces/current'
import { Day } from '@/interfaces/day'
import { SearchCity } from '@/interfaces/search'

export type WeatherData = {
  location: SearchCity,
  current: Current,
  forecast: {
    forecastday: Array<{
      date: string,
      day: Day,
      astro: Astro & {
        moon_phase: string,
      }
    }> 
  }
}