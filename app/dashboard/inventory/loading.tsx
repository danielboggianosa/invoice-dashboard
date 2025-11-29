import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-96 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Statistics Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-4 animate-pulse rounded-md bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-7 w-16 animate-pulse rounded-md bg-muted" />
              <div className="mt-1 h-3 w-32 animate-pulse rounded-md bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Table Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and filters */}
            <div className="flex gap-2">
              <div className="h-9 flex-1 animate-pulse rounded-md bg-muted" />
              <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
              <div className="h-9 w-32 animate-pulse rounded-md bg-muted" />
            </div>

            {/* Table rows */}
            <div className="space-y-2">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-12 w-24 animate-pulse rounded-md bg-muted" />
                  <div className="h-12 flex-1 animate-pulse rounded-md bg-muted" />
                  <div className="h-12 w-32 animate-pulse rounded-md bg-muted" />
                  <div className="h-12 w-24 animate-pulse rounded-md bg-muted" />
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
