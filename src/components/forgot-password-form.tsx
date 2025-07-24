"use client"

import { cn } from "@/components/utils/cn"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function ForgotPasswordForm({
  className,
  onBackToLogin,
  onSwitchMode,
  ...props
}: React.ComponentProps<"div"> & { onBackToLogin?: () => void, onSwitchMode?: () => void }) {
  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we’ll send you a link to reset your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid gap-6">
              <div className="grid gap-3">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                />
              </div>
              <Button type="submit" className="w-full">
                Send reset link
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
      <div className="text-center text-sm">
        Remembered your password?{" "}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault()
            onSwitchMode?.()
          }}
          className="underline underline-offset-4"
        >
          Back to log in
        </a>
      </div>
    </div>
  )
} 