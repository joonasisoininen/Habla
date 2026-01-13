"use client"

import { Suspense, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Flame, Clock, Target, Search } from "lucide-react"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LearningBadge } from "@/components/learning-badge"
import { currentUser, corrections, weeklyStats } from "@/lib/mock-data"

function ProgressContent() {
  const [searchQuery, setSearchQuery] = useState("")

  const filteredCorrections = corrections.filter((correction) =>
    correction.text.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <DesktopNav />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Progress</h1>
            <LearningBadge />
          </div>

          {/* Stats Cards */}
          <div className="grid sm:grid-cols-3 gap-4">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Flame className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">{currentUser.streak}</p>
                    <p className="text-sm text-muted-foreground">Day streak</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Target className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">{currentUser.totalSessions}</p>
                    <p className="text-sm text-muted-foreground">Total sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center gap-3 mb-2">
                  <div className="h-10 w-10 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-accent" />
                  </div>
                  <div>
                    <p className="text-2xl font-semibold text-foreground">{currentUser.totalMinutes}</p>
                    <p className="text-sm text-muted-foreground">Minutes spoken</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Weekly Chart */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">This week&apos;s practice</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={weeklyStats}>
                  <XAxis dataKey="day" stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <YAxis stroke="hsl(var(--muted-foreground))" fontSize={12} />
                  <Bar dataKey="minutes" fill="hsl(var(--accent))" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
              <div className="flex items-center justify-between mt-4 pt-4 border-t border-border">
                <div>
                  <p className="text-sm text-muted-foreground">Weekly average</p>
                  <p className="text-xl font-semibold text-foreground">
                    {Math.round(weeklyStats.reduce((acc, day) => acc + day.minutes, 0) / 7)} min/day
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Comfort score</p>
                  <p className="text-xl font-semibold text-foreground">8.2/10</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Goals */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Your goal</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="p-4 bg-muted/50 rounded-lg space-y-2">
                <p className="font-medium text-foreground">Hold 10-minute conversations</p>
                <p className="text-sm text-muted-foreground">
                  Build speaking confidence in {currentUser.targetLanguage}
                </p>
                <Badge variant="secondary" className="text-xs">
                  Level: {currentUser.level}
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Saved Corrections */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Saved corrections</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search corrections..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="space-y-3">
                {filteredCorrections.length > 0 ? (
                  filteredCorrections.map((correction) => (
                    <div key={correction.id} className="p-4 border border-border rounded-lg space-y-2">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm text-foreground flex-1">{correction.text}</p>
                        <Badge variant="secondary" className="text-xs">
                          {correction.tag}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {new Date(correction.timestamp).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          hour: "numeric",
                          minute: "2-digit",
                        })}
                      </p>
                    </div>
                  ))
                ) : (
                  <div className="py-8 text-center">
                    <p className="text-sm text-muted-foreground">
                      {searchQuery ? "No corrections found" : "No corrections saved yet"}
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}

export default function ProgressPage() {
  return (
    <Suspense fallback={null}>
      <ProgressContent />
    </Suspense>
  )
}
