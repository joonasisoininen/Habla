import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { ArrowLeft, Calendar, Clock, MessageSquare, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { sessions, partners, promptPacks } from "@/lib/mock-data"

export default function SessionPrepPage({ params }: { params: { id: string } }) {
  const session = sessions.find((s) => s.id === params.id)
  const partner = session ? partners.find((p) => p.id === session.partnerId) : null
  const promptPack = session ? promptPacks.find((p) => p.id === session.promptPackId) : null

  if (!session || !partner || !promptPack) {
    return <div>Session not found</div>
  }

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/home"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-6">
          <div>
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">Session preparation</h1>
            <p className="text-muted-foreground">Get ready for your upcoming session</p>
          </div>

          {/* Session Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Session details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4">
                <Avatar className="h-14 w-14">
                  <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                  <AvatarFallback>{partner.name[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="font-semibold text-foreground text-lg">{partner.name}</p>
                  <p className="text-sm text-muted-foreground">
                    Native: {partner.nativeLanguage} • Learning: {partner.targetLanguage}
                  </p>
                  <div className="flex gap-2 mt-2">
                    {partner.badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {new Date(session.dateTime).toLocaleDateString("en-US", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span className="text-muted-foreground">
                    {new Date(session.dateTime).toLocaleTimeString("en-US", {
                      hour: "numeric",
                      minute: "2-digit",
                    })}{" "}
                    • {session.duration} min
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Session Structure */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Today&apos;s structure</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {session.structure.map((phase, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-accent/10 flex items-center justify-center text-sm font-medium text-accent">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">{phase}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prompt Pack Preview */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                Prompt pack: {promptPack.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {promptPack.prompts.slice(0, 3).map((prompt, index) => (
                  <div key={index} className="p-3 bg-muted/50 rounded-lg text-sm text-foreground">
                    {index + 1}. {prompt}
                  </div>
                ))}
                <p className="text-xs text-muted-foreground pt-2">+ {promptPack.prompts.length - 3} more prompts</p>
              </div>
            </CardContent>
          </Card>

          {/* Etiquette Checklist */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5" />
                Etiquette checklist
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[
                  "Arrive on time (or 1-2 minutes early)",
                  "Be kind and patient with your partner",
                  "Save corrections for after speaking turns",
                  "Stay on topic—this is a learning session",
                  "Use the full session time for practice",
                ].map((item, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <Checkbox id={`check-${index}`} defaultChecked={false} className="mt-0.5" />
                    <Label
                      htmlFor={`check-${index}`}
                      className="text-sm text-foreground cursor-pointer leading-relaxed"
                    >
                      {item}
                    </Label>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Join Button */}
          <div className="flex gap-3">
            <Button asChild className="flex-1" size="lg">
              <Link href={`/session/${session.id}`}>Join session</Link>
            </Button>
          </div>
        </div>
      </main>
    </div>
  )
}
