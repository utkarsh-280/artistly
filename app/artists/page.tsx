"use client"

import { useState, useEffect, useMemo } from "react"
import { useSearchParams } from "next/navigation"
import ArtistCard from "@/components/ArtistCard"
import FilterBlock from "@/components/FilterBlock"
import artists from "@/data/artists.json"

interface Artist {
  id: string
  name: string
  category: string[]
  bio: string
  priceRange: string
  location: string
  languages: string[]
  image: string
  rating: number
}

export default function ArtistsPage() {
  const searchParams = useSearchParams()

  // Read ?category=queryParam from the URL (if present)
  const queryCategory = searchParams.get("category") ?? ""

  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedLocation, setSelectedLocation] = useState("")
  const [selectedPriceRange, setSelectedPriceRange] = useState("")

  // Sync state with the URL query param once (and whenever it changes)
  // The guard prevents an infinite re-render loop by only updating
  // when the selected value is actually different.
  useEffect(() => {
    if (!queryCategory) return

    setSelectedCategories((prev) => {
      if (prev.length === 1 && prev[0] === queryCategory) {
        return prev // nothing to change → no extra render
      }
      return [queryCategory]
    })
  }, [queryCategory])

  // Extract unique values for filters
  const categories = useMemo(() => {
    const allCategories = artists.flatMap((artist) => artist.category)
    return [...new Set(allCategories)]
  }, [])

  const locations = useMemo(() => {
    return [...new Set(artists.map((artist) => artist.location))]
  }, [])

  const priceRanges = useMemo(() => {
    return [...new Set(artists.map((artist) => artist.priceRange))]
  }, [])

  // Filter artists based on selected filters
  const filteredArtists = useMemo(() => {
    return artists.filter((artist: Artist) => {
      const categoryMatch =
        selectedCategories.length === 0 || selectedCategories.some((cat) => artist.category.includes(cat))

      const locationMatch = !selectedLocation || artist.location === selectedLocation

      const priceMatch = !selectedPriceRange || artist.priceRange === selectedPriceRange

      return categoryMatch && locationMatch && priceMatch
    })
  }, [selectedCategories, selectedLocation, selectedPriceRange])

  const clearFilters = () => {
    setSelectedCategories([])
    setSelectedLocation("")
    setSelectedPriceRange("")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Browse Artists</h1>
          <p className="text-gray-600">Discover talented performers for your next event</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky top-4">
              <FilterBlock
                categories={categories}
                locations={locations}
                priceRanges={priceRanges}
                selectedCategories={selectedCategories}
                selectedLocation={selectedLocation}
                selectedPriceRange={selectedPriceRange}
                onCategoryChange={setSelectedCategories}
                onLocationChange={setSelectedLocation}
                onPriceRangeChange={setSelectedPriceRange}
                onClearFilters={clearFilters}
              />
            </div>
          </div>

          {/* Artists Grid */}
          <div className="lg:w-3/4">
            <div className="mb-4 flex justify-between items-center">
              <p className="text-gray-600">
                {filteredArtists.length} artist{filteredArtists.length !== 1 ? "s" : ""} found
              </p>
            </div>

            {filteredArtists.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredArtists.map((artist) => (
                  <ArtistCard key={artist.id} artist={artist} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No artists found matching your criteria.</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
