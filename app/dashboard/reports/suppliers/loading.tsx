import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
        <div className="h-5 w-96 animate-pulse rounded-md bg-muted" />
      </div>

      {/* Metrics Cards Skeleton */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <Card key={i}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
              <div className="h-4 w-4 animate-pulse rounded-md bg-muted" />
            </CardHeader>
            <CardContent>
              <div className="h-7 w-20 animate-pulse rounded-md bg-muted" />
              <div className="mt-1 h-3 w-28 animate-pulse rounded-md bg-muted" />
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters Skeleton */}
      <div className="flex items-center gap-4">
        <div className="h-10 w-[180px] animate-pulse rounded-md bg-muted" />
        <div className="h-10 w-[200px] animate-pulse rounded-md bg-muted" />
        <div className="ml-auto h-10 w-[140px] animate-pulse rounded-md bg-muted" />
      </div>

      {/* Content Skeleton */}
      <Card>
        <CardHeader>
          <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
          <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-16 w-full animate-pulse rounded-md bg-muted" />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
