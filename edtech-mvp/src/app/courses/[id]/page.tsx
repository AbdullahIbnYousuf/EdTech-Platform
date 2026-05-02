// src/app/courses/[id]/page.tsx
import { prisma } from "@/lib/prisma"
import { notFound } from "next/navigation"

// This runs on the server. params.id comes from the URL: /courses/ABC123
export default async function CoursePage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  // Await params (required in Next.js 15+)
  const { id } = await params

  // Fetch the specific course from Neon
  const course = await prisma.course.findUnique({
    where: { id },
  })

  // If course doesn't exist or isn't published → show 404
  if (!course || !course.isPublished) {
    notFound()
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Back Button */}
        <a
          href="/"
          className="inline-flex items-center text-sm text-blue-600 hover:underline mb-6"
        >
          ← Back to all courses
        </a>

        {/* Course Header */}
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          {course.title}
        </h1>
        <p className="text-lg text-gray-600 mb-6">
          {course.description}
        </p>

        {/* YouTube Embed (Unlisted Playlist) */}
        <div className="aspect-video bg-black rounded-xl overflow-hidden mb-6">
          <iframe
            src={`https://www.youtube.com/embed/videoseries?list=${course.youtubePlaylistId}`}
            title={course.title}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </div>

        {/* Enrollment CTA (Visual only for now) */}
        <button
          disabled
          className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg opacity-80 cursor-not-allowed"
        >
          📱 Request Enrollment via WhatsApp (Soon)
        </button>

        <p className="mt-3 text-sm text-gray-500">
          ✅ Course ID: {course.id.slice(0, 8)}... • Loaded from Neon
        </p>
      </div>
    </main>
  )
}