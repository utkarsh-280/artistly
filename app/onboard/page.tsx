import ArtistForm from "@/components/ArtistForm"

export default function OnboardPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Join Artistly as a Performer</h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Ready to showcase your talent? Fill out the form below to join our platform and start getting booked for
            amazing events.
          </p>
        </div>

        <ArtistForm />
      </div>
    </div>
  )
}
