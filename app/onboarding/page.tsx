"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ChevronLeft, ChevronRight, Check } from "lucide-react"
import { useRouter } from "next/navigation"
import { partners } from "@/lib/mock-data"

type Step = 1 | 2 | 3 | 4

export default function OnboardingPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState<Step>(1)
  const [goal, setGoal] = useState<string>("")
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const [nativeLanguage, setNativeLanguage] = useState<string>("")
  const [targetLanguage, setTargetLanguage] = useState<string>("")
  const [role, setRole] = useState<string>("learner")
  const [level, setLevel] = useState<string>("")
  const [selectedDays, setSelectedDays] = useState<string[]>([])
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null)

  const progress = (currentStep / 4) * 100

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep((currentStep + 1) as Step)
    } else {
      router.push("/home")
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep((currentStep - 1) as Step)
    }
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return goal && agreedToTerms
      case 2:
        return nativeLanguage && targetLanguage && role && level
      case 3:
        return selectedDays.length > 0
      case 4:
        return selectedSlot !== null
      default:
        return false
    }
  }

  const weekDays = [
    { id: "monday", label: "Monday" },
    { id: "tuesday", label: "Tuesday" },
    { id: "wednesday", label: "Wednesday" },
    { id: "thursday", label: "Thursday" },
    { id: "friday", label: "Friday" },
    { id: "saturday", label: "Saturday" },
    { id: "sunday", label: "Sunday" },
  ]

  const timeSlots = [
    { id: 1, day: "Monday", time: "10:00 AM", date: "Jan 15" },
    { id: 2, day: "Wednesday", time: "2:00 PM", date: "Jan 17" },
    { id: 3, day: "Friday", time: "6:00 PM", date: "Jan 19" },
  ]

  return (
    <div className="min-h-screen bg-background py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Progress Header */}
        <div className="mb-8 space-y-2">
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>Step {currentStep} of 4</span>
            <span>{Math.round(progress)}% complete</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Step 1: Intent & Goal */}
        {currentStep === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>What brings you here?</CardTitle>
              <CardDescription>Choose your primary learning goal</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <RadioGroup value={goal} onValueChange={setGoal}>
                <div className="space-y-3">
                  {[
                    {
                      value: "conversations",
                      label: "Hold 10-minute conversations",
                      desc: "Build speaking confidence",
                    },
                    {
                      value: "travel",
                      label: "Travel confidence",
                      desc: "Navigate everyday situations abroad",
                    },
                    {
                      value: "business",
                      label: "Work/business practice",
                      desc: "Professional communication skills",
                    },
                    {
                      value: "anxiety",
                      label: "Reduce speaking anxiety",
                      desc: "Practice in a structured, safe environment",
                    },
                  ].map((option) => (
                    <Label
                      key={option.value}
                      htmlFor={option.value}
                      className="flex items-start gap-3 p-4 border border-border rounded-lg cursor-pointer hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={option.value} id={option.value} className="mt-0.5" />
                      <div className="space-y-1">
                        <p className="font-medium text-foreground">{option.label}</p>
                        <p className="text-sm text-muted-foreground">{option.desc}</p>
                      </div>
                    </Label>
                  ))}
                </div>
              </RadioGroup>

              <div className="pt-4 border-t border-border">
                <div className="flex items-start gap-3">
                  <Checkbox
                    id="terms"
                    checked={agreedToTerms}
                    onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    className="mt-0.5"
                  />
                  <Label htmlFor="terms" className="text-sm leading-relaxed cursor-pointer">
                    I&apos;m here to practice languages respectfully. <strong>This is not a dating app.</strong> I
                    understand that off-topic behavior can lead to account removal.
                  </Label>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Languages & Role */}
        {currentStep === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Tell us about your languages</CardTitle>
              <CardDescription>This helps us match you with the right partners</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="native-language">Native language</Label>
                <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
                  <SelectTrigger id="native-language">
                    <SelectValue placeholder="Select your native language" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-language">Target language</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger id="target-language">
                    <SelectValue placeholder="Select language you want to learn" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="spanish">Spanish</SelectItem>
                    <SelectItem value="english">English</SelectItem>
                    <SelectItem value="french">French</SelectItem>
                    <SelectItem value="german">German</SelectItem>
                    <SelectItem value="mandarin">Mandarin</SelectItem>
                    <SelectItem value="japanese">Japanese</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="level">Your level in {targetLanguage || "target language"}</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="level">
                    <SelectValue placeholder="Select your level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="A1">A1 - Beginner</SelectItem>
                    <SelectItem value="A2">A2 - Elementary</SelectItem>
                    <SelectItem value="B1">B1 - Intermediate</SelectItem>
                    <SelectItem value="B2">B2 - Upper Intermediate</SelectItem>
                    <SelectItem value="C1">C1 - Advanced</SelectItem>
                    <SelectItem value="C2">C2 - Proficient</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label>Your role</Label>
                <RadioGroup value={role} onValueChange={setRole}>
                  <div className="space-y-2">
                    <Label
                      htmlFor="learner"
                      className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50"
                    >
                      <RadioGroupItem value="learner" id="learner" />
                      <div>
                        <p className="font-medium text-foreground">Learner</p>
                        <p className="text-sm text-muted-foreground">I want to practice my target language</p>
                      </div>
                    </Label>
                    <Label
                      htmlFor="helper"
                      className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50"
                    >
                      <RadioGroupItem value="helper" id="helper" />
                      <div>
                        <p className="font-medium text-foreground">Helper</p>
                        <p className="text-sm text-muted-foreground">I want to help others learn my language</p>
                      </div>
                    </Label>
                    <Label
                      htmlFor="both"
                      className="flex items-center gap-3 p-3 border border-border rounded-lg cursor-pointer hover:bg-muted/50"
                    >
                      <RadioGroupItem value="both" id="both" />
                      <div>
                        <p className="font-medium text-foreground">Both</p>
                        <p className="text-sm text-muted-foreground">I want to learn and help others</p>
                      </div>
                    </Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Step 3: Availability */}
        {currentStep === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>When are you available?</CardTitle>
              <CardDescription>Select at least one day when you can practice</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                {weekDays.map((day) => (
                  <div key={day.id} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                    <Checkbox
                      id={day.id}
                      checked={selectedDays.includes(day.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedDays([...selectedDays, day.id])
                        } else {
                          setSelectedDays(selectedDays.filter((d) => d !== day.id))
                        }
                      }}
                    />
                    <Label htmlFor={day.id} className="flex-1 cursor-pointer font-medium">
                      {day.label}
                    </Label>
                  </div>
                ))}
              </div>
              {selectedDays.length > 0 && (
                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-accent-foreground">
                    <Check className="inline h-4 w-4 mr-1" />
                    Great! You&apos;ve selected {selectedDays.length} day{selectedDays.length > 1 ? "s" : ""}.
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Step 4: Schedule First Session */}
        {currentStep === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Schedule your first session</CardTitle>
              <CardDescription>Choose a time slot and we&apos;ll match you with a partner</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-3">
                {timeSlots.map((slot) => (
                  <div
                    key={slot.id}
                    onClick={() => setSelectedSlot(slot.id)}
                    className={`p-4 border rounded-lg cursor-pointer transition-all ${
                      selectedSlot === slot.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50 hover:bg-muted/30"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          {slot.day}, {slot.date}
                        </p>
                        <p className="text-sm text-muted-foreground">{slot.time} • 25 minutes</p>
                      </div>
                      {selectedSlot === slot.id && <Check className="h-5 w-5 text-primary" />}
                    </div>
                  </div>
                ))}
              </div>

              {selectedSlot && (
                <div className="p-4 border border-border rounded-lg space-y-3">
                  <p className="text-sm font-medium text-foreground">Your partner</p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage src={partners[0].avatar || "/placeholder.svg"} alt={partners[0].name} />
                      <AvatarFallback>{partners[0].name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">{partners[0].name}</p>
                      <p className="text-sm text-muted-foreground">
                        Native: {partners[0].nativeLanguage} • Learning: {partners[0].targetLanguage}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {partners[0].badges.map((badge) => (
                      <Badge key={badge} variant="secondary" className="text-xs">
                        {badge}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              <div className="p-3 bg-muted rounded-lg">
                <p className="text-xs text-muted-foreground">
                  Fewer choices = less anxiety. We prioritize good matches over overwhelming options.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between mt-6">
          <Button variant="outline" onClick={handleBack} disabled={currentStep === 1}>
            <ChevronLeft className="h-4 w-4 mr-1" />
            Back
          </Button>
          <Button onClick={handleNext} disabled={!canProceed()}>
            {currentStep === 4 ? "Confirm first session" : "Continue"}
            {currentStep < 4 && <ChevronRight className="h-4 w-4 ml-1" />}
          </Button>
        </div>
      </div>
    </div>
  )
}
