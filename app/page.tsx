import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Link from "next/link"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <div className="mr-4 hidden md:flex">
            <Link href="/" className="mr-6 flex items-center space-x-2">
              <span className="hidden font-bold sm:inline-block">InvoiceAI Dashboard</span>
            </Link>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-2">
            <nav className="flex items-center space-x-2">
              <Link href="/login">
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Manage Your Invoices with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    A powerful dashboard to manage and analyze your AI-extracted invoice data. Get insights, generate
                    reports, and manage your financial documents with ease.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/login">
                    <Button size="lg" className="gap-1.5">
                      Get Started
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="relative h-[350px] w-full overflow-hidden rounded-xl border bg-muted/50 md:h-[450px] lg:h-[500px]">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-background p-4 md:p-8">
                    <div className="flex h-full flex-col items-center justify-center space-y-4 rounded-lg border bg-background/90 p-6 shadow-lg backdrop-blur">
                      <div className="space-y-2 text-center">
                        <h2 className="text-2xl font-bold">AI-Powered Invoice Management</h2>
                        <p className="text-muted-foreground">
                          Extract data from invoices automatically and manage it all in one place.
                        </p>
                      </div>
                      <div className="grid w-full gap-4">
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">Automatic Data Extraction</p>
                            <p className="text-xs text-muted-foreground">From images to structured data</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">Comprehensive Reporting</p>
                            <p className="text-xs text-muted-foreground">Analyze your financial data</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 rounded-lg border p-4">
                          <div className="h-12 w-12 rounded-full bg-primary/20"></div>
                          <div className="flex-1 space-y-1">
                            <p className="text-sm font-medium">Secure Access</p>
                            <p className="text-xs text-muted-foreground">Protected by authentication</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © 2024 InvoiceAI Dashboard. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}

