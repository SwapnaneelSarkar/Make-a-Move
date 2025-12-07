"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Loader2, ArrowRight, ArrowLeft, Shield, Users, UserCheck, Building2, CreditCard, MessageSquare, FileCheck } from "lucide-react"
import { toast } from "sonner"
import { useAppStore } from "@/lib/store"
import { MOCK_USERS, type Role } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
})

type LoginStep = "category" | "role" | "credentials"

type RoleCategory = "admin" | "agent"

interface RoleOption {
  role: Role
  name: string
  description: string
  icon: any
  email: string
  password: string
}

const ADMIN_ROLES: RoleOption[] = [
  {
    role: "SUPER_ADMIN",
    name: "Super Admin",
    description: "Full system access and control",
    icon: Shield,
    email: "superadmin@example.com",
    password: "admin123",
  },
  {
    role: "KYC_COMPLIANCE_TEAM",
    name: "KYC Team",
    description: "Document verification and compliance",
    icon: FileCheck,
    email: "kyc@example.com",
    password: "kyc123",
  },
  {
    role: "FINANCE_TEAM",
    name: "Finance Team",
    description: "Wallet, payments, and financial operations",
    icon: CreditCard,
    email: "finance@example.com",
    password: "finance123",
  },
  {
    role: "SUPPORT_TEAM",
    name: "Support Team",
    description: "Dispute resolution and customer support",
    icon: MessageSquare,
    email: "support@example.com",
    password: "support123",
  },
]

const AGENT_ROLES: RoleOption[] = [
  {
    role: "AGENCY_ADMIN",
    name: "Agency Admin",
    description: "Manage agency and agents",
    icon: Building2,
    email: "agencyadmin@example.com",
    password: "agency123",
  },
  {
    role: "AGENT",
    name: "Agent",
    description: "Create and manage bookings",
    icon: UserCheck,
    email: "agent@example.com",
    password: "agent123",
  },
  {
    role: "SUB_AGENT",
    name: "Sub Agent",
    description: "Limited booking access",
    icon: Users,
    email: "subagent@example.com",
    password: "agent123",
  },
]

export default function LoginPage() {
  const router = useRouter()
  const [step, setStep] = useState<LoginStep>("category")
  const [category, setCategory] = useState<RoleCategory | null>(null)
  const [selectedRole, setSelectedRole] = useState<RoleOption | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const setCurrentUser = useAppStore((state) => state.setCurrentUser)

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const handleCategorySelect = (cat: RoleCategory) => {
    setCategory(cat)
    setStep("role")
  }

  const handleRoleSelect = (roleOption: RoleOption) => {
    setSelectedRole(roleOption)
    form.setValue("email", roleOption.email)
    form.setValue("password", "")
    setStep("credentials")
  }

  const handleBack = () => {
    if (step === "credentials") {
      setStep("role")
      setSelectedRole(null)
      form.reset()
    } else if (step === "role") {
      setStep("category")
      setCategory(null)
    }
  }

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    if (!selectedRole) return

    setIsLoading(true)

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500))

    // Check if password matches selected role
    const isValid = values.password === selectedRole.password && values.email === selectedRole.email

    if (isValid) {
      const user = MOCK_USERS.find((u) => u.role === selectedRole.role)
      if (user) {
        setCurrentUser(user)
        localStorage.setItem("session_user", JSON.stringify(user))
        toast.success(`Welcome back, ${user.name}!`, {
          description: `Logged in as ${selectedRole.name}`,
        })
        // Redirect booking roles (AGENCY_ADMIN, AGENT, SUB_AGENT) directly to flights page
        const bookingRoles = ["AGENCY_ADMIN", "AGENT", "SUB_AGENT"]
        if (bookingRoles.includes(user.role)) {
          router.push("/dashboard/flights")
        } else {
          router.push("/dashboard")
        }
      }
    } else {
      toast.error("Invalid credentials", {
        description: "Please check your email and password.",
      })
    }

    setIsLoading(false)
  }

  const currentRoles = category === "admin" ? ADMIN_ROLES : category === "agent" ? AGENT_ROLES : []

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left Side - Visual */}
      <div className="hidden lg:flex flex-col justify-between bg-primary p-12 text-primary-foreground relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-20 mix-blend-overlay"></div>
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-2xl font-serif font-bold">
            <div className="size-8 rounded-full bg-accent flex items-center justify-center">
              <span className="text-accent-foreground text-sm">TL</span>
            </div>
            Make a Move
          </div>
        </div>

        <div className="relative z-10 max-w-lg">
          <h1 className="text-5xl font-serif font-bold mb-6 leading-tight">
            The Future of <br />
            <span className="text-accent">Corporate Travel</span>
          </h1>
          <p className="text-lg text-primary-foreground/80 mb-8 leading-relaxed">
            Manage bookings, approvals, and expenses in one seamless platform. Experience the new standard in B2B travel
            management.
          </p>

          <div className="grid grid-cols-2 gap-6">
            <div className="glass p-4 rounded-lg bg-white/10 border-white/20 backdrop-blur-md">
              <h3 className="font-bold text-xl mb-1">24/7</h3>
              <p className="text-sm opacity-80">Global Support</p>
            </div>
            <div className="glass p-4 rounded-lg bg-white/10 border-white/20 backdrop-blur-md">
              <h3 className="font-bold text-xl mb-1">100%</h3>
              <p className="text-sm opacity-80">Policy Compliance</p>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm opacity-60">© 2025 Make a Move Inc. All rights reserved.</div>
      </div>

      {/* Right Side - Login Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <Card className="w-full max-w-md border-none shadow-none bg-transparent">
          {step === "category" && (
            <>
              <CardHeader className="space-y-1 px-0">
                <CardTitle className="text-3xl font-serif">Welcome to Make a Move</CardTitle>
                <CardDescription className="text-base">Select your login category to continue</CardDescription>
              </CardHeader>
              <CardContent className="px-0 space-y-4 mt-6">
                <Button
                  onClick={() => handleCategorySelect("admin")}
                  className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                >
                  <Shield className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold text-lg">Admin</div>
                    <div className="text-xs opacity-90">Super Admin, KYC, Finance, Support</div>
                  </div>
                </Button>

                <Button
                  onClick={() => handleCategorySelect("agent")}
                  className="w-full h-20 flex flex-col items-center justify-center gap-2 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                >
                  <Users className="h-6 w-6" />
                  <div className="text-center">
                    <div className="font-semibold text-lg">Agent</div>
                    <div className="text-xs opacity-90">Agency Admin, Agent, Sub Agent</div>
                  </div>
                </Button>
              </CardContent>
            </>
          )}

          {step === "role" && (
            <>
              <CardHeader className="space-y-1 px-0">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-serif">
                      {category === "admin" ? "Admin Roles" : "Agent Roles"}
                    </CardTitle>
                    <CardDescription className="text-sm">Select your role to continue</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-0 space-y-3 mt-4">
                {currentRoles.map((roleOption) => {
                  const Icon = roleOption.icon
                  return (
                    <Button
                      key={roleOption.role}
                      onClick={() => handleRoleSelect(roleOption)}
                      variant="outline"
                      className="w-full h-auto p-4 flex items-center gap-4 hover:bg-accent hover:border-primary transition-all"
                    >
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 text-left">
                        <div className="font-semibold">{roleOption.name}</div>
                        <div className="text-xs text-muted-foreground">{roleOption.description}</div>
                      </div>
                      <ArrowRight className="h-4 w-4 text-muted-foreground" />
                    </Button>
                  )
                })}
              </CardContent>
            </>
          )}

          {step === "credentials" && selectedRole && (
            <>
              <CardHeader className="space-y-1 px-0">
                <div className="flex items-center gap-2 mb-2">
                  <Button variant="ghost" size="icon" onClick={handleBack} className="h-8 w-8">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <div className="flex-1">
                    <CardTitle className="text-2xl font-serif">Login as {selectedRole.name}</CardTitle>
                    <CardDescription className="text-sm">Enter your credentials to continue</CardDescription>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="px-0">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="name@company.com"
                              className="h-12 bg-white/50 border-input/50 focus:bg-white transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="password"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Password</FormLabel>
                          <FormControl>
                            <Input
                              type="password"
                              placeholder="••••••••"
                              className="h-12 bg-white/50 border-input/50 focus:bg-white transition-all"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button type="submit" className="w-full h-12 text-base group" disabled={isLoading}>
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Signing in...
                        </>
                      ) : (
                        <>
                          Sign In
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </Button>

                    <div className="relative my-6">
                      <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t" />
                      </div>
                      <div className="relative flex justify-center text-xs uppercase">
                        <span className="bg-background px-2 text-muted-foreground">Demo Credentials</span>
                      </div>
                    </div>

                    <div className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-border/50">
                      <div className="font-medium mb-1">Quick Login:</div>
                      <div className="space-y-1">
                        <div>
                          <span className="font-mono">{selectedRole.email}</span>
                        </div>
                        <div>
                          Password: <span className="font-mono">{selectedRole.password}</span>
                        </div>
                      </div>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
