import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, MessageSquare, TrendingUp, Shield, Users, Clock } from "lucide-react"
import Link from "next/link"

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 md:py-6">
          <div className="flex items-center justify-between">
            <h1 className="text-xl md:text-2xl font-semibold text-foreground">Habla</h1>
            <Link href="/home">
              <Button variant="outline" size="sm">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-16 md:py-24">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-foreground tracking-tight text-balance">
            Structured language practice with real people
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground text-pretty max-w-2xl mx-auto">
            Scheduled sessions with guided prompts. No random DMs. Not a dating app.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Link href="/onboarding">
              <Button size="lg" className="w-full sm:w-auto">
                Get started
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent" asChild>
              <a href="#how-it-works">How it works</a>
            </Button>
          </div>
        </div>
      </section>

      {/* How it Works Section */}
      <section id="how-it-works" className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground">How it works</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <Card className="border-border">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Calendar className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">1. Schedule</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Book a 25-minute session at a time that works for you. We match you with compatible partners based
                    on languages and goals.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <MessageSquare className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">2. Guided call</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Follow our structured format with conversation prompts. Clear phases keep you on track and reduce
                    awkwardness.
                  </p>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-12 w-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h4 className="text-xl font-semibold text-foreground">3. Track progress</h4>
                  <p className="text-muted-foreground leading-relaxed">
                    Save corrections during calls and review them later. See your streak, total minutes, and speaking
                    confidence grow.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Why Structured Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h3 className="text-3xl md:text-4xl font-semibold text-center mb-12 text-foreground">Why structured?</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="border-border">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Reduces awkwardness</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        No more "what should we talk about?" moments. Our prompts keep the conversation flowing
                        naturally.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card className="border-border">
                <CardContent className="pt-6 space-y-3">
                  <div className="flex items-start gap-3">
                    <Users className="h-5 w-5 text-accent mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-foreground mb-2">Improves consistency</h4>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Scheduled sessions with reliable partners mean you actually practice regularly instead of
                        procrastinating.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Safety & Norms Section */}
      <section className="bg-muted/30 py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-6">
            <Shield className="h-12 w-12 text-accent mx-auto" />
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground">Safety & community norms</h3>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Habla is a learning platform, not a social network. Every session is structured and purposeful. Users who
              violate our community guidelines by flirting, harassing, or going off-topic can be reported and will be
              removed.
            </p>
            <div className="grid sm:grid-cols-3 gap-4 pt-6 text-sm">
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="font-medium text-foreground">Respectful</p>
                <p className="text-muted-foreground mt-1">Kind, patient interactions</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="font-medium text-foreground">Structured</p>
                <p className="text-muted-foreground mt-1">Guided sessions, no chat</p>
              </div>
              <div className="bg-card rounded-lg p-4 border border-border">
                <p className="font-medium text-foreground">Reportable</p>
                <p className="text-muted-foreground mt-1">Clear reporting process</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center space-y-6">
            <h3 className="text-3xl md:text-4xl font-semibold text-foreground text-balance">
              Ready to improve your language skills?
            </h3>
            <Link href="/onboarding">
              <Button size="lg">Start your first session</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>&copy; 2025 Habla. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#" className="hover:text-foreground transition-colors">
                About
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Privacy
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Terms
              </a>
              <a href="#" className="hover:text-foreground transition-colors">
                Help
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
