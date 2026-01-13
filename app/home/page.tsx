import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, Flame, MessageSquare } from "lucide-react"
import Link from "next/link"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LearningBadge } from "@/components/learning-badge"
import { currentUser, sessions, partners } from "@/lib/mock-data"

export default function HomePage() {
  const nextSession = sessions.find((s) => s.status === "upcoming")
  const partner = nextSession ? partners.find((p) => p.id === nextSession.partnerId) : null

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <DesktopNav />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Welcome Header */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Welcome back, {currentUser.name}</h1>
            <LearningBadge />
          </div>

          {/* Next Session Card */}
          {nextSession && partner ? (
            <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  Next session
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                    <AvatarFallback>{partner.name[0]}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground">{partner.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(nextSession.dateTime).toLocaleDateString("en-US", {
                        weekday: "long",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at{" "}
                      {new Date(nextSession.dateTime).toLocaleTimeString("en-US", {
                        hour: "numeric",
                        minute: "2-digit",
                      })}
                    </p>
                    <div className="flex gap-2 mt-2">
                      <Badge variant="secondary" className="text-xs">
                        {nextSession.duration} min
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        Guided
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3">
                  <Button asChild className="flex-1">
                    <Link href={`/session/${nextSession.id}/prep`}>Prepare</Link>
                  </Button>
                  <Button asChild variant="outline" className="flex-1 bg-transparent">
                    <Link href={`/session/${nextSession.id}`}>Join</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card>
              <CardContent className="py-8 text-center space-y-4">
                <Calendar className="h-12 w-12 text-muted-foreground mx-auto" />
                <div>
                  <p className="font-medium text-foreground mb-1">No upcoming sessions</p>
                  <p className="text-sm text-muted-foreground">Schedule your next practice session</p>
                </div>
                <Button asChild>
                  <Link href="/schedule">Schedule session</Link>
                </Button>
              </CardContent>
            </Card>
          )}

          {/* This Week Progress */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This week</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-foreground">3</p>
                  <p className="text-sm text-muted-foreground">Sessions completed</p>
                </div>
                <div className="space-y-2">
                  <p className="text-2xl font-semibold text-foreground">75</p>
                  <p className="text-sm text-muted-foreground">Minutes spoken</p>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-1">
                    <Flame className="h-5 w-5 text-accent" />
                    <p className="text-2xl font-semibold text-foreground">{currentUser.streak}</p>
                  </div>
                  <p className="text-sm text-muted-foreground">Day streak</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recommended Next Step */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Recommended next step</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-5 w-5 text-accent" />
                </div>
                <div className="flex-1">
                  <p className="font-medium text-foreground mb-1">Review your saved corrections</p>
                  <p className="text-sm text-muted-foreground">
                    You have 2 corrections from your last session. Review them to reinforce learning.
                  </p>
                </div>
              </div>
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/progress">View corrections</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
