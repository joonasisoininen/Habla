"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { ThumbsUp, ThumbsDown, Meh, Smile, Frown, Flame, Clock, MessageSquare } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function FeedbackPage({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [helpful, setHelpful] = useState<string>("")
  const [comfort, setComfort] = useState<string>("")
  const [wouldTalkAgain, setWouldTalkAgain] = useState<string>("")
  const [showIssues, setShowIssues] = useState(false)
  const [issueType, setIssueType] = useState<string>("")
  const [issueDetails, setIssueDetails] = useState<string>("")

  const handleSubmit = () => {
    router.push("/home")
  }

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl md:text-3xl font-semibold text-foreground mb-2">How did it go?</h1>
          <p className="text-muted-foreground">Your feedback helps us improve your experience</p>
        </div>

        {/* Progress Summary */}
        <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-transparent">
          <CardHeader>
            <CardTitle className="text-lg">Your progress today</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Clock className="h-5 w-5 text-accent" />
                  <p className="text-2xl font-semibold text-foreground">25</p>
                </div>
                <p className="text-sm text-muted-foreground">Minutes spoken</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <MessageSquare className="h-5 w-5 text-accent" />
                  <p className="text-2xl font-semibold text-foreground">3</p>
                </div>
                <p className="text-sm text-muted-foreground">Corrections saved</p>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <Flame className="h-5 w-5 text-accent" />
                  <p className="text-2xl font-semibold text-foreground">8</p>
                </div>
                <p className="text-sm text-muted-foreground">Day streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Helpful Rating */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Did this help your learning?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4 justify-center">
              <button
                onClick={() => setHelpful("yes")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                  helpful === "yes" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
              >
                <ThumbsUp className={`h-8 w-8 ${helpful === "yes" ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm font-medium">Yes</span>
              </button>
              <button
                onClick={() => setHelpful("no")}
                className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                  helpful === "no" ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                }`}
              >
                <ThumbsDown className={`h-8 w-8 ${helpful === "no" ? "text-primary" : "text-muted-foreground"}`} />
                <span className="text-sm font-medium">No</span>
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Comfort Level */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">How comfortable did you feel?</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-3 justify-center">
              {[
                { value: "uncomfortable", icon: Frown, label: "Uncomfortable" },
                { value: "okay", icon: Meh, label: "Okay" },
                { value: "comfortable", icon: Smile, label: "Comfortable" },
              ].map((option) => (
                <button
                  key={option.value}
                  onClick={() => setComfort(option.value)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-lg border transition-all ${
                    comfort === option.value ? "border-primary bg-primary/5" : "border-border hover:bg-muted/50"
                  }`}
                >
                  <option.icon
                    className={`h-8 w-8 ${comfort === option.value ? "text-primary" : "text-muted-foreground"}`}
                  />
                  <span className="text-sm font-medium">{option.label}</span>
                </button>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Would Talk Again */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Would you talk to this partner again?</CardTitle>
          </CardHeader>
          <CardContent>
            <RadioGroup value={wouldTalkAgain} onValueChange={setWouldTalkAgain}>
              <div className="space-y-2">
                <Label
                  htmlFor="yes"
                  className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  <RadioGroupItem value="yes" id="yes" />
                  <span className="font-medium">Yes, they were great!</span>
                </Label>
                <Label
                  htmlFor="no"
                  className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50"
                >
                  <RadioGroupItem value="no" id="no" />
                  <span className="font-medium">No, I&apos;d prefer someone else</span>
                </Label>
              </div>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* Issues Section */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Any issues?</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full bg-transparent" onClick={() => setShowIssues(!showIssues)}>
              {showIssues ? "Hide report form" : "Report an issue"}
            </Button>

            {showIssues && (
              <div className="space-y-4 pt-4 border-t border-border">
                <RadioGroup value={issueType} onValueChange={setIssueType}>
                  <div className="space-y-2">
                    {["Harassment", "Off-topic/flirting", "No-show", "Technical issues", "Other"].map((issue) => (
                      <Label
                        key={issue}
                        htmlFor={issue}
                        className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50"
                      >
                        <RadioGroupItem value={issue.toLowerCase()} id={issue} />
                        <span>{issue}</span>
                      </Label>
                    ))}
                  </div>
                </RadioGroup>
                {issueType && (
                  <div className="space-y-2">
                    <Label htmlFor="details">Additional details (optional)</Label>
                    <Textarea
                      id="details"
                      value={issueDetails}
                      onChange={(e) => setIssueDetails(e.target.value)}
                      placeholder="Tell us more about what happened..."
                      rows={4}
                    />
                  </div>
                )}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          <Button size="lg" onClick={handleSubmit}>
            Schedule next session
          </Button>
          <Button size="lg" variant="outline" asChild className="bg-transparent">
            <Link href="/home">Back to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
