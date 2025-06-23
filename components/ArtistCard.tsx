import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MapPin, Star } from "lucide-react"

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

interface ArtistCardProps {
  artist: Artist
}

export default function ArtistCard({ artist }: ArtistCardProps) {
  return (
    <Card className="h-full flex flex-col hover:shadow-lg transition-shadow">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image
            src={artist.image || "/placeholder.svg"}
            alt={artist.name}
            fill
            className="object-cover rounded-t-lg"
          />
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">{artist.name}</h3>
          <div className="flex items-center text-sm text-gray-600">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400 mr-1" />
            {artist.rating}
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mb-3">
          {artist.category.map((cat) => (
            <Badge key={cat} variant="secondary" className="text-xs">
              {cat}
            </Badge>
          ))}
        </div>

        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{artist.bio}</p>

        <div className="flex items-center text-sm text-gray-500 mb-2">
          <MapPin className="h-4 w-4 mr-1" />
          {artist.location}
        </div>

        <div className="text-lg font-semibold text-purple-600">{artist.priceRange}</div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button className="w-full bg-purple-600 hover:bg-purple-700">Ask for Quote</Button>
      </CardFooter>
    </Card>
  )
}
