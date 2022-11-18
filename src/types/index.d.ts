export type Neighborhood = {
  code: number,
  name: string,
  city: string,
  state: string,
  area: number
}

export type Establishment = {
  code: number,
  name: string,
  category: string,
  priceRange: number,
  address: string,
  city: string,
  state: string,
  neighborhoodCode: number
}

export type SearchEstablishment = {
  name: string
}

export type Population = {
  neighborhoodCode: number,
  population: number
}

export type EventFlow = {
  code: string,
  datetime: Date,
  establishmentCode: number
}

export type Day = {
  morning: number,
  afternoon: number,
  night: number
}
