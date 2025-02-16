"use client"

import * as React from "react"
import {
  Moon,
  Sun,
  Users,
  Search,
  LogOut,
  LogIn,
  CreditCard,
  Database,
  ChevronDown,
  Check,
  Zap,
  Palette,
  Brain,
} from "lucide-react"
import { useTheme } from "next-themes"
import { ThemeToggle } from "@/components/theme-toggle"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Progress } from "@/components/ui/progress"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Total Revenue</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground">+20.1% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Subscriptions</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
              <circle cx="9" cy="7" r="4" />
              <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">+180.1% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Sales</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <rect width="20" height="14" x="2" y="5" rx="2" />
              <path d="M2 10h20" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </div>
        </div>
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">Active Now</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="h-4 w-4 text-muted-foreground"
            >
              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
            </svg>
          </div>
          <div className="p-6 pt-0">
            <div className="text-2xl font-bold">+573</div>
            <p className="text-xs text-muted-foreground">+201 since last hour</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

function DashboardLayout({ children }: { children: React.ReactNode }) {
  const [isCollapsed, setIsCollapsed] = React.useState(false)
  const { setTheme, theme } = useTheme()
  const [recentItems, setRecentItems] = React.useState<RecentItem[]>([])
  const [notifications, setNotifications] = React.useState<number>(3) // New state for notifications

  const addRecentItem = (item: QuickAccessItem) => {
    const itemExists = recentItems.some((recentItem) => recentItem.label === item.label)
    if (!itemExists) {
      const newRecentItem: RecentItem = {
        icon: item.icon,
        label: item.label,
        timestamp: new Date(),
      }
      setRecentItems((prevItems) => [newRecentItem, ...prevItems.slice(0, 2)])
    }
  }

  return (
    <div className="flex h-screen bg-background transition-colors duration-300 ease-in-out">
      <Sidebar
        isCollapsed={isCollapsed}
        setIsCollapsed={setIsCollapsed}
        recentItems={recentItems}
        addRecentItem={addRecentItem}
      />
      <main className="flex-1 overflow-y-auto p-8">
        <nav className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          {/* <ModeToggle /> */}
          <ThemeToggle/>
        </nav>
        {children}
      </main>
    </div>
  )
}

interface QuickAccessItem {
  icon: React.ElementType
  label: string
}

interface RecentItem extends QuickAccessItem {
  timestamp: Date
}

function Sidebar({
  isCollapsed,
  setIsCollapsed,
  recentItems,
  addRecentItem,
}: {
  isCollapsed: boolean
  setIsCollapsed: (value: boolean) => void
  recentItems: RecentItem[]
  addRecentItem: (item: QuickAccessItem) => void
}) {
  return (
    <aside
      className={cn(
        "flex flex-col h-screen bg-card text-card-foreground shadow-lg transition-all duration-300 ease-in-out",
        isCollapsed ? "w-20" : "w-64",
      )}
    >
      <div className="flex items-center justify-between p-4">
        <h2 className={cn("font-semibold", isCollapsed && "sr-only")}>Dashboard</h2>
        <Button variant="ghost" size="icon" onClick={() => setIsCollapsed(!isCollapsed)}>
          <ChevronDown className={cn("h-4 w-4 transition-transform", isCollapsed && "rotate-180")} />
        </Button>
      </div>
      <Separator />
      <ProfileSection isCollapsed={isCollapsed} />
      <Separator />
      <QuickAccessMenu isCollapsed={isCollapsed} addRecentItem={addRecentItem} />
      <Separator />
      <RecentsSection isCollapsed={isCollapsed} recentItems={recentItems} />
      <Separator />
      <SyncStatus isCollapsed={isCollapsed} />
    </aside>
  )
}

function ProfileSection({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-4 mb-4">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        {!isCollapsed && (
          <div>
            <h3 className="font-semibold">John Doe</h3>
            <p className="text-sm text-muted-foreground">john@example.com</p>
          </div>
        )}
      </div>
      {!isCollapsed && (
        <>
          <Button variant="outline" className="w-full mb-2">
            <Users className="mr-2 h-4 w-4" /> Other Accounts
          </Button>
          <Button variant="outline" className="w-full">
            <Zap className="mr-2 h-4 w-4" /> SkyNet Suggestions
          </Button>
        </>
      )}
    </div>
  )
}

function QuickAccessMenu({
  isCollapsed,
  addRecentItem,
}: { isCollapsed: boolean; addRecentItem: (item: QuickAccessItem) => void }) {
  const menuItems: QuickAccessItem[] = [
    { icon: Brain, label: "Artificial Intelligence" },
    { icon: Palette, label: "Designer" },
    { icon: Search, label: "Smart Search" },
    { icon: LogOut, label: "Sign Out" },
    { icon: LogIn, label: "Re-sign In" },
    { icon: CreditCard, label: "Accounts" },
    { icon: Database, label: "Data Transfer" },
  ]

  return (
    <nav className="flex-1 overflow-y-auto p-4">
      <h3 className={cn("font-semibold mb-2", isCollapsed && "sr-only")}>Quick Access</h3>
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <li>
                  <Button
                    variant="ghost"
                    className={cn("w-full justify-start", isCollapsed && "justify-center p-2")}
                    onClick={() => addRecentItem(item)}
                  >
                    <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                    {!isCollapsed && <span>{item.label}</span>}
                  </Button>
                </li>
              </TooltipTrigger>
              {isCollapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
            </Tooltip>
          </TooltipProvider>
        ))}
      </ul>
    </nav>
  )
}

function RecentsSection({ isCollapsed, recentItems }: { isCollapsed: boolean; recentItems: RecentItem[] }) {
  return (
    <div className="p-4">
      <h3 className={cn("font-semibold mb-2", isCollapsed && "sr-only")}>Recents</h3>
      <ul className="space-y-2">
        {recentItems.map((item, index) => (
          <TooltipProvider key={index}>
            <Tooltip>
              <TooltipTrigger asChild>
                <li className="flex items-center space-x-2">
                  <item.icon className="h-4 w-4 text-muted-foreground" />
                  {!isCollapsed && (
                    <>
                      <span className="flex-1 truncate">{item.label}</span>
                      <span className="text-xs text-muted-foreground">{formatRelativeTime(item.timestamp)}</span>
                    </>
                  )}
                </li>
              </TooltipTrigger>
              {isCollapsed && (
                <TooltipContent side="right">
                  <p>{item.label}</p>
                  <p className="text-xs text-muted-foreground">{formatRelativeTime(item.timestamp)}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        ))}
      </ul>
    </div>
  )
}

function SyncStatus({ isCollapsed }: { isCollapsed: boolean }) {
  return (
    <div className="p-4">
      <h3 className={cn("font-semibold mb-2", isCollapsed && "sr-only")}>Sync Status</h3>
      <div className="flex items-center space-x-2">
        <Progress value={100} className="flex-1" />
        {!isCollapsed && (
          <>
            <Check className="h-4 w-4 text-green-500" />
            <span className="text-sm">100% Completed</span>
          </>
        )}
      </div>
      {!isCollapsed && <p className="text-sm text-muted-foreground mt-2">Synchronization Successful</p>}
    </div>
  )
}

function Header({
  notifications,
  setNotifications,
}: {
  notifications: number
  setNotifications: React.Dispatch<React.SetStateAction<number>>
}) {
  return (
    <header className="sticky top-0 z-10 bg-background border-b p-4 flex items-center justify-between">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="flex items-center space-x-4">
        {/* <ModeToggle /> */}
        <ThemeToggle />
      </div>
    </header>
  )
}

function ModeToggle() {
  const { setTheme, theme } = useTheme()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={() => setTheme("light")}>Light</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("dark")}>Dark</DropdownMenuItem>
        <DropdownMenuItem onClick={() => setTheme("system")}>System</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function formatRelativeTime(date: Date): string {
  const now = new Date()
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000)

  if (diffInSeconds < 60) {
    return `${diffInSeconds} seconds ago`
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60)
    return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600)
    return `${hours} hour${hours > 1 ? "s" : ""} ago`
  } else {
    const days = Math.floor(diffInSeconds / 86400)
    return `${days} day${days > 1 ? "s" : ""} ago`
  }
}

