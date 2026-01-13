"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Clock, Plus } from "lucide-react"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LearningBadge } from "@/components/learning-badge"
import { sessions, partners } from "@/lib/mock-data"

export default function SchedulePage() {
  const [filterDay, setFilterDay] = useState<string>("all")
  const [filterRole, setFilterRole] = useState<string>("all")
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const upcomingSessions = sessions.filter((s) => s.status === "upcoming")

  const availableSlots = [
    { id: 1, day: "Monday", date: "Jan 15", time: "10:00 AM", partnerId: "partner-1" },
    { id: 2, day: "Monday", date: "Jan 15", time: "2:00 PM", partnerId: "partner-2" },
    { id: 3, day: "Tuesday", date: "Jan 16", time: "6:00 PM", partnerId: "partner-3" },
    { id: 4, day: "Wednesday", date: "Jan 17", time: "10:00 AM", partnerId: "partner-1" },
    { id: 5, day: "Thursday", date: "Jan 18", time: "4:00 PM", partnerId: "partner-2" },
    { id: 6, day: "Friday", date: "Jan 19", time: "6:00 PM", partnerId: "partner-3" },
  ]

  const handleBookSession = () => {
    setIsDialogOpen(false)
    setSelectedSlot(null)
  }

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <DesktopNav />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Schedule</h1>
            <LearningBadge />
          </div>

          {/* Filters */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col sm:flex-row gap-3">
                <Select value={filterDay} onValueChange={setFilterDay}>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Filter by day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All days</SelectItem>
                    <SelectItem value="weekday">Weekdays</SelectItem>
                    <SelectItem value="weekend">Weekends</SelectItem>
                  </SelectContent>
                </Select>
                <Select value={filterRole} onValueChange={setFilterRole}>
                  <SelectTrigger className="w-full sm:w-[200px]">
                    <SelectValue placeholder="Role balance" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All roles</SelectItem>
                    <SelectItem value="learn">Learn more</SelectItem>
                    <SelectItem value="help">Help more</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Sessions */}
          {upcomingSessions.length > 0 && (
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">Your upcoming sessions</h2>
              {upcomingSessions.map((session) => {
                const partner = partners.find((p) => p.id === session.partnerId)
                if (!partner) return null

                return (
                  <Card key={session.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-center gap-4">
                        <Avatar className="h-12 w-12">
                          <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                          <AvatarFallback>{partner.name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{partner.name}</p>
                          <p className="text-sm text-muted-foreground">
                            {new Date(session.dateTime).toLocaleDateString("en-US", {
                              weekday: "long",
                              month: "short",
                              day: "numeric",
                            })}{" "}
                            at{" "}
                            {new Date(session.dateTime).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "2-digit",
                            })}
                          </p>
                          <div className="flex gap-2 mt-2">
                            {partner.badges.slice(0, 2).map((badge) => (
                              <Badge key={badge} variant="secondary" className="text-xs">
                                {badge}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Button variant="outline" size="sm" asChild>
                          <a href={`/session/${session.id}/prep`}>View</a>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          )}

          {/* Available Slots */}
          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-foreground">Available time slots</h2>
            <p className="text-sm text-muted-foreground">
              Fewer choices = less anxiety. We prioritize good matches over overwhelming options.
            </p>

            <div className="grid gap-3">
              {availableSlots.map((slot) => {
                const partner = partners.find((p) => p.id === slot.partnerId)
                if (!partner) return null

                return (
                  <Dialog key={slot.id} open={isDialogOpen && selectedSlot === slot.id} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                      <Card
                        className="cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => {
                          setSelectedSlot(slot.id)
                          setIsDialogOpen(true)
                        }}
                      >
                        <CardContent className="pt-6">
                          <div className="flex items-center justify-between gap-4">
                            <div className="flex items-center gap-4 flex-1">
                              <Avatar className="h-10 w-10">
                                <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                                <AvatarFallback>{partner.name[0]}</AvatarFallback>
                              </Avatar>
                              <div className="flex-1">
                                <p className="font-medium text-foreground">{partner.name}</p>
                                <div className="flex items-center gap-3 text-sm text-muted-foreground mt-1">
                                  <span className="flex items-center gap-1">
                                    <Calendar className="h-3 w-3" />
                                    {slot.day}, {slot.date}
                                  </span>
                                  <span className="flex items-center gap-1">
                                    <Clock className="h-3 w-3" />
                                    {slot.time}
                                  </span>
                                </div>
                              </div>
                            </div>
                            <Button size="sm" variant="outline">
                              <Plus className="h-4 w-4 mr-1" />
                              Book
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Confirm session booking</DialogTitle>
                        <DialogDescription>You&apos;re about to book a 25-minute guided session</DialogDescription>
                      </DialogHeader>
                      <div className="space-y-4 py-4">
                        <div className="flex items-center gap-3">
                          <Avatar className="h-12 w-12">
                            <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                            <AvatarFallback>{partner.name[0]}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="font-semibold text-foreground">{partner.name}</p>
                            <p className="text-sm text-muted-foreground">
                              Native: {partner.nativeLanguage} • Learning: {partner.targetLanguage}
                            </p>
                          </div>
                        </div>
                        <div className="p-4 bg-muted rounded-lg space-y-2">
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Date & Time</span>
                            <span className="font-medium text-foreground">
                              {slot.day}, {slot.date} at {slot.time}
                            </span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Duration</span>
                            <span className="font-medium text-foreground">25 minutes</span>
                          </div>
                          <div className="flex items-center justify-between text-sm">
                            <span className="text-muted-foreground">Format</span>
                            <span className="font-medium text-foreground">Guided with prompts</span>
                          </div>
                        </div>
                        <div className="p-3 bg-accent/10 rounded-lg">
                          <p className="text-xs text-accent-foreground">
                            This session follows our structured format: 5min warm-up, 10min target language, 5min
                            switch, 5min wrap-up.
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-3">
                        <Button variant="outline" onClick={() => setIsDialogOpen(false)} className="flex-1">
                          Cancel
                        </Button>
                        <Button onClick={handleBookSession} className="flex-1">
                          Confirm booking
                        </Button>
                      </div>
                    </DialogContent>
                  </Dialog>
                )
              })}
            </div>
          </div>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
