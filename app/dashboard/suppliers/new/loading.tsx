import { Card, CardContent, CardHeader } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-2">
          <div className="h-9 w-64 animate-pulse rounded-md bg-muted" />
          <div className="h-5 w-80 animate-pulse rounded-md bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="h-10 w-24 animate-pulse rounded-md bg-muted" />
          <div className="h-10 w-32 animate-pulse rounded-md bg-muted" />
        </div>
      </div>

      {/* Tabs Skeleton */}
      <div className="space-y-4">
        <div className="flex gap-2">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-10 w-32 animate-pulse rounded-md bg-muted" />
          ))}
        </div>

        {/* Form Skeleton */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <div className="h-5 w-5 animate-pulse rounded-md bg-muted" />
              <div className="h-6 w-48 animate-pulse rounded-md bg-muted" />
            </div>
            <div className="h-4 w-64 animate-pulse rounded-md bg-muted" />
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="space-y-2">
                  <div className="h-4 w-24 animate-pulse rounded-md bg-muted" />
                  <div className="h-10 w-full animate-pulse rounded-md bg-muted" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
