// src/app/page.tsx
import { prisma } from "@/lib/prisma"

// This function runs ON THE SERVER before the page loads
async function getCourses() {
  try {
    const courses = await prisma.course.findMany({
      where: { isPublished: true },
      orderBy: { createdAt: "desc" },
    })
    return courses
  } catch (error) {
    console.error("Failed to fetch courses:", error)
    return []
  }
}

export default async function Home() {
  const courses = await getCourses()

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
            🎓 EdTech MVP
          </h1>
          <p className="text-lg text-gray-600">
            Browse courses • Enroll via WhatsApp • Learn from YouTube
          </p>
        </div>

        {/* Course List */}
        <div className="space-y-4">
          {courses.length === 0 ? (
            <p className="text-center text-gray-500 py-8">
              No published courses yet. Check back soon!
            </p>
          ) : (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-sm border border-gray-200 p-5 hover:shadow-md transition"
              >
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {course.title}
                </h2>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {course.description}
                </p>
                
                {/* Placeholder button - we'll make this functional in Step 10 */}
                <button
                  disabled
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg opacity-70 cursor-not-allowed"
                >
                  Enroll via WhatsApp (Soon)
                </button>
              </div>
            ))
          )}
        </div>

        {/* Footer status */}
        <p className="mt-8 text-center text-sm text-gray-500">
          ✅ Connected to Neon • {courses.length} course(s) loaded
        </p>
      </div>
    </main>
  );
}