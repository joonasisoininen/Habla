"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { DesktopNav } from "@/components/desktop-nav"
import { MobileNav } from "@/components/mobile-nav"
import { LearningBadge } from "@/components/learning-badge"
import { currentUser } from "@/lib/mock-data"

export default function SettingsPage() {
  const [name, setName] = useState(currentUser.name)
  const [nativeLanguage, setNativeLanguage] = useState(currentUser.nativeLanguage)
  const [targetLanguage, setTargetLanguage] = useState(currentUser.targetLanguage)
  const [level, setLevel] = useState(currentUser.level)
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [sessionReminders, setSessionReminders] = useState(true)
  const [progressUpdates, setProgressUpdates] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)

  return (
    <div className="min-h-screen bg-background pb-20 md:pb-8">
      <DesktopNav />

      <main className="container mx-auto px-4 py-6 md:py-8 max-w-4xl">
        <div className="space-y-6">
          {/* Header */}
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-semibold text-foreground">Settings</h1>
            <LearningBadge />
          </div>

          {/* Profile Settings */}
          <Card>
            <CardHeader>
              <CardTitle>Profile</CardTitle>
              <CardDescription>Update your personal information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="native-lang">Native language</Label>
                <Select value={nativeLanguage} onValueChange={setNativeLanguage}>
                  <SelectTrigger id="native-lang">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="target-lang">Target language</Label>
                <Select value={targetLanguage} onValueChange={setTargetLanguage}>
                  <SelectTrigger id="target-lang">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Spanish">Spanish</SelectItem>
                    <SelectItem value="English">English</SelectItem>
                    <SelectItem value="French">French</SelectItem>
                    <SelectItem value="German">German</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="level">Your level</Label>
                <Select value={level} onValueChange={setLevel}>
                  <SelectTrigger id="level">
                    <SelectValue />
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
              <Button>Save changes</Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle>Notifications</CardTitle>
              <CardDescription>Manage how you receive updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="email-notif">Email notifications</Label>
                  <p className="text-sm text-muted-foreground">Receive updates via email</p>
                </div>
                <Switch id="email-notif" checked={emailNotifications} onCheckedChange={setEmailNotifications} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="session-reminders">Session reminders</Label>
                  <p className="text-sm text-muted-foreground">Get reminded before your sessions</p>
                </div>
                <Switch id="session-reminders" checked={sessionReminders} onCheckedChange={setSessionReminders} />
              </div>
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="progress-updates">Progress updates</Label>
                  <p className="text-sm text-muted-foreground">Weekly summary of your progress</p>
                </div>
                <Switch id="progress-updates" checked={progressUpdates} onCheckedChange={setProgressUpdates} />
              </div>
            </CardContent>
          </Card>

          {/* Safety & Community */}
          <Card>
            <CardHeader>
              <CardTitle>Safety & community norms</CardTitle>
              <CardDescription>Understanding our guidelines</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-4 bg-muted/50 rounded-lg space-y-2 text-sm">
                <p className="font-medium text-foreground">LangConnect is a learning platform</p>
                <ul className="space-y-1 text-muted-foreground list-disc list-inside">
                  <li>All sessions are structured and purposeful</li>
                  <li>Off-topic behavior is not allowed</li>
                  <li>Respect your partners and stay focused on learning</li>
                  <li>Report any issues immediately</li>
                </ul>
              </div>
              <Button variant="outline" className="w-full bg-transparent">
                View full guidelines
              </Button>
            </CardContent>
          </Card>

          {/* Account Actions */}
          <Card>
            <CardHeader>
              <CardTitle>Account actions</CardTitle>
              <CardDescription>Manage your account</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <Button variant="outline" className="w-full bg-transparent">
                Log out
              </Button>
              <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
                <DialogTrigger asChild>
                  <Button variant="destructive" className="w-full">
                    Delete account
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Delete account?</DialogTitle>
                    <DialogDescription>
                      This action cannot be undone. All your data will be permanently deleted.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex gap-3 pt-4">
                    <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button variant="destructive" className="flex-1">
                      Delete permanently
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </div>
      </main>

      <MobileNav />
    </div>
  )
}
