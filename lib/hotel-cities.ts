export interface City {
  value: string
  label: string
  country: string
  type: "national" | "international"
}

export const NATIONAL_CITIES: City[] = [
  { value: "mumbai", label: "Mumbai", country: "India", type: "national" },
  { value: "delhi", label: "New Delhi", country: "India", type: "national" },
  { value: "bangalore", label: "Bangalore", country: "India", type: "national" },
  { value: "hyderabad", label: "Hyderabad", country: "India", type: "national" },
  { value: "chennai", label: "Chennai", country: "India", type: "national" },
  { value: "kolkata", label: "Kolkata", country: "India", type: "national" },
  { value: "pune", label: "Pune", country: "India", type: "national" },
  { value: "ahmedabad", label: "Ahmedabad", country: "India", type: "national" },
  { value: "jaipur", label: "Jaipur", country: "India", type: "national" },
  { value: "surat", label: "Surat", country: "India", type: "national" },
  { value: "lucknow", label: "Lucknow", country: "India", type: "national" },
  { value: "kanpur", label: "Kanpur", country: "India", type: "national" },
  { value: "nagpur", label: "Nagpur", country: "India", type: "national" },
  { value: "indore", label: "Indore", country: "India", type: "national" },
  { value: "thane", label: "Thane", country: "India", type: "national" },
  { value: "bhopal", label: "Bhopal", country: "India", type: "national" },
  { value: "visakhapatnam", label: "Visakhapatnam", country: "India", type: "national" },
  { value: "patna", label: "Patna", country: "India", type: "national" },
  { value: "vadodara", label: "Vadodara", country: "India", type: "national" },
  { value: "ghaziabad", label: "Ghaziabad", country: "India", type: "national" },
  { value: "ludhiana", label: "Ludhiana", country: "India", type: "national" },
  { value: "agra", label: "Agra", country: "India", type: "national" },
  { value: "nashik", label: "Nashik", country: "India", type: "national" },
  { value: "faridabad", label: "Faridabad", country: "India", type: "national" },
  { value: "meerut", label: "Meerut", country: "India", type: "national" },
  { value: "rajkot", label: "Rajkot", country: "India", type: "national" },
  { value: "varanasi", label: "Varanasi", country: "India", type: "national" },
  { value: "srinagar", label: "Srinagar", country: "India", type: "national" },
  { value: "amritsar", label: "Amritsar", country: "India", type: "national" },
  { value: "chandigarh", label: "Chandigarh", country: "India", type: "national" },
  { value: "goa", label: "Goa", country: "India", type: "national" },
  { value: "kochi", label: "Kochi", country: "India", type: "national" },
  { value: "mysore", label: "Mysore", country: "India", type: "national" },
  { value: "udaipur", label: "Udaipur", country: "India", type: "national" },
  { value: "jodhpur", label: "Jodhpur", country: "India", type: "national" },
  { value: "shimla", label: "Shimla", country: "India", type: "national" },
  { value: "manali", label: "Manali", country: "India", type: "national" },
  { value: "ooty", label: "Ooty", country: "India", type: "national" },
  { value: "darjeeling", label: "Darjeeling", country: "India", type: "national" },
]

export const INTERNATIONAL_CITIES: City[] = [
  // Middle East
  { value: "dubai", label: "Dubai", country: "UAE", type: "international" },
  { value: "abu-dhabi", label: "Abu Dhabi", country: "UAE", type: "international" },
  { value: "doha", label: "Doha", country: "Qatar", type: "international" },
  { value: "riyadh", label: "Riyadh", country: "Saudi Arabia", type: "international" },
  { value: "jeddah", label: "Jeddah", country: "Saudi Arabia", type: "international" },
  { value: "muscat", label: "Muscat", country: "Oman", type: "international" },
  { value: "kuwait-city", label: "Kuwait City", country: "Kuwait", type: "international" },
  { value: "manama", label: "Manama", country: "Bahrain", type: "international" },
  
  // Asia Pacific
  { value: "singapore", label: "Singapore", country: "Singapore", type: "international" },
  { value: "bangkok", label: "Bangkok", country: "Thailand", type: "international" },
  { value: "phuket", label: "Phuket", country: "Thailand", type: "international" },
  { value: "kuala-lumpur", label: "Kuala Lumpur", country: "Malaysia", type: "international" },
  { value: "jakarta", label: "Jakarta", country: "Indonesia", type: "international" },
  { value: "bali", label: "Bali", country: "Indonesia", type: "international" },
  { value: "manila", label: "Manila", country: "Philippines", type: "international" },
  { value: "hong-kong", label: "Hong Kong", country: "Hong Kong", type: "international" },
  { value: "tokyo", label: "Tokyo", country: "Japan", type: "international" },
  { value: "osaka", label: "Osaka", country: "Japan", type: "international" },
  { value: "seoul", label: "Seoul", country: "South Korea", type: "international" },
  { value: "beijing", label: "Beijing", country: "China", type: "international" },
  { value: "shanghai", label: "Shanghai", country: "China", type: "international" },
  { value: "sydney", label: "Sydney", country: "Australia", type: "international" },
  { value: "melbourne", label: "Melbourne", country: "Australia", type: "international" },
  { value: "auckland", label: "Auckland", country: "New Zealand", type: "international" },
  
  // Europe
  { value: "london", label: "London", country: "UK", type: "international" },
  { value: "paris", label: "Paris", country: "France", type: "international" },
  { value: "frankfurt", label: "Frankfurt", country: "Germany", type: "international" },
  { value: "berlin", label: "Berlin", country: "Germany", type: "international" },
  { value: "munich", label: "Munich", country: "Germany", type: "international" },
  { value: "rome", label: "Rome", country: "Italy", type: "international" },
  { value: "milan", label: "Milan", country: "Italy", type: "international" },
  { value: "venice", label: "Venice", country: "Italy", type: "international" },
  { value: "madrid", label: "Madrid", country: "Spain", type: "international" },
  { value: "barcelona", label: "Barcelona", country: "Spain", type: "international" },
  { value: "amsterdam", label: "Amsterdam", country: "Netherlands", type: "international" },
  { value: "brussels", label: "Brussels", country: "Belgium", type: "international" },
  { value: "vienna", label: "Vienna", country: "Austria", type: "international" },
  { value: "zurich", label: "Zurich", country: "Switzerland", type: "international" },
  { value: "geneva", label: "Geneva", country: "Switzerland", type: "international" },
  { value: "stockholm", label: "Stockholm", country: "Sweden", type: "international" },
  { value: "copenhagen", label: "Copenhagen", country: "Denmark", type: "international" },
  { value: "oslo", label: "Oslo", country: "Norway", type: "international" },
  { value: "dublin", label: "Dublin", country: "Ireland", type: "international" },
  { value: "lisbon", label: "Lisbon", country: "Portugal", type: "international" },
  { value: "athens", label: "Athens", country: "Greece", type: "international" },
  { value: "istanbul", label: "Istanbul", country: "Turkey", type: "international" },
  { value: "prague", label: "Prague", country: "Czech Republic", type: "international" },
  { value: "warsaw", label: "Warsaw", country: "Poland", type: "international" },
  { value: "budapest", label: "Budapest", country: "Hungary", type: "international" },
  
  // Americas
  { value: "new-york", label: "New York", country: "USA", type: "international" },
  { value: "los-angeles", label: "Los Angeles", country: "USA", type: "international" },
  { value: "san-francisco", label: "San Francisco", country: "USA", type: "international" },
  { value: "chicago", label: "Chicago", country: "USA", type: "international" },
  { value: "miami", label: "Miami", country: "USA", type: "international" },
  { value: "las-vegas", label: "Las Vegas", country: "USA", type: "international" },
  { value: "toronto", label: "Toronto", country: "Canada", type: "international" },
  { value: "vancouver", label: "Vancouver", country: "Canada", type: "international" },
  { value: "mexico-city", label: "Mexico City", country: "Mexico", type: "international" },
  { value: "sao-paulo", label: "São Paulo", country: "Brazil", type: "international" },
  { value: "rio-de-janeiro", label: "Rio de Janeiro", country: "Brazil", type: "international" },
  { value: "buenos-aires", label: "Buenos Aires", country: "Argentina", type: "international" },
  
  // Africa
  { value: "cairo", label: "Cairo", country: "Egypt", type: "international" },
  { value: "johannesburg", label: "Johannesburg", country: "South Africa", type: "international" },
  { value: "cape-town", label: "Cape Town", country: "South Africa", type: "international" },
  { value: "nairobi", label: "Nairobi", country: "Kenya", type: "international" },
]

export const ALL_CITIES = [...NATIONAL_CITIES, ...INTERNATIONAL_CITIES]

export const getCitiesByType = (type: "national" | "international"): City[] => {
  return type === "national" ? NATIONAL_CITIES : INTERNATIONAL_CITIES
}

