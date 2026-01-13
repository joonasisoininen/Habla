"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Mic, Video, ChevronRight, Save, AlertCircle, PhoneOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { sessions, partners, promptPacks } from "@/lib/mock-data"
import { useToast } from "@/hooks/use-toast"
import { Toaster } from "@/components/ui/toaster"

export default function SessionRoomPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0)
  const [currentPhase, setCurrentPhase] = useState(0)
  const [timeRemaining, setTimeRemaining] = useState(1500) // 25 minutes in seconds
  const [isEndDialogOpen, setIsEndDialogOpen] = useState(false)
  const [savedCorrections, setSavedCorrections] = useState<string[]>([])

  const session = sessions.find((s) => s.id === params.id)
  const partner = session ? partners.find((p) => p.id === session.partnerId) : null
  const promptPack = session ? promptPacks.find((p) => p.id === session.promptPackId) : null

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    // Show phase transition at specific times
    const phaseTimer = setTimeout(() => {
      if (timeRemaining === 1200) {
        // 20 min left (5 min elapsed)
        setCurrentPhase(1)
      } else if (timeRemaining === 900) {
        // 15 min left (10 min elapsed)
        setCurrentPhase(2)
        toast({
          title: "Switching roles in 30s",
          description: "Get ready to switch language roles",
        })
      } else if (timeRemaining === 600) {
        // 10 min left (15 min elapsed)
        setCurrentPhase(3)
      }
    }, 100)

    return () => {
      clearInterval(timer)
      clearTimeout(phaseTimer)
    }
  }, [timeRemaining, toast])

  if (!session || !partner || !promptPack) {
    return <div>Session not found</div>
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleNextPrompt = () => {
    if (currentPromptIndex < promptPack.prompts.length - 1) {
      setCurrentPromptIndex(currentPromptIndex + 1)
    }
  }

  const handleSaveCorrection = () => {
    setSavedCorrections([...savedCorrections, `Correction ${savedCorrections.length + 1}`])
    toast({
      title: "Correction saved",
      description: "You can review it after the session",
    })
  }

  const handleEndSession = () => {
    setIsEndDialogOpen(false)
    router.push(`/session/${session.id}/feedback`)
  }

  return (
    <div className="min-h-screen bg-background">
      <Toaster />

      {/* Top Bar */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="text-sm">
                {session.structure[currentPhase]}
              </Badge>
              <div className="text-sm text-muted-foreground">Timer: {formatTime(timeRemaining)}</div>
            </div>
            <Dialog open={isEndDialogOpen} onOpenChange={setIsEndDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="destructive" size="sm">
                  <PhoneOff className="h-4 w-4 mr-2" />
                  End session
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>End session?</DialogTitle>
                  <DialogDescription>Are you sure you want to end this session early?</DialogDescription>
                </DialogHeader>
                <div className="flex gap-3 pt-4">
                  <Button variant="outline" onClick={() => setIsEndDialogOpen(false)} className="flex-1">
                    Cancel
                  </Button>
                  <Button variant="destructive" onClick={handleEndSession} className="flex-1">
                    End session
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Panels */}
          <div className="lg:col-span-2 space-y-4">
            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={partner.avatar || "/placeholder.svg"} alt={partner.name} />
                    <AvatarFallback className="text-2xl">{partner.name[0]}</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">{partner.name}</p>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mic className="h-4 w-4 text-primary" />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-muted/30">
              <CardContent className="p-6">
                <div className="aspect-video bg-muted rounded-lg flex items-center justify-center mb-3">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src="/placeholder.svg?height=96&width=96" alt="You" />
                    <AvatarFallback className="text-2xl">You</AvatarFallback>
                  </Avatar>
                </div>
                <div className="flex items-center justify-between">
                  <p className="font-medium text-foreground">You</p>
                  <div className="flex gap-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Mic className="h-4 w-4 text-primary" />
                    </div>
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <Video className="h-4 w-4 text-primary" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Prompt Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Current prompt</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-foreground leading-relaxed">{promptPack.prompts[currentPromptIndex]}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    onClick={handleNextPrompt}
                    disabled={currentPromptIndex === promptPack.prompts.length - 1}
                    className="flex-1"
                  >
                    Next prompt
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button onClick={handleSaveCorrection} variant="outline" className="w-full bg-transparent">
                    <Save className="h-4 w-4 mr-2" />
                    Save correction
                  </Button>
                  <Button variant="outline" className="w-full bg-transparent">
                    <AlertCircle className="h-4 w-4 mr-2" />
                    Mark as difficult
                  </Button>
                </div>
                <div className="pt-4 border-t border-border">
                  <p className="text-xs text-muted-foreground mb-2">Corrections saved: {savedCorrections.length}</p>
                  <div className="space-y-1 max-h-32 overflow-y-auto">
                    {savedCorrections.map((correction, index) => (
                      <div key={index} className="text-xs p-2 bg-muted rounded text-foreground">
                        {correction}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
