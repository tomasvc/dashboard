import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { cn } from "@/components/utils/cn"

export interface ActivityLogItem {
  id: string | number
  user: {
    name: string
    avatar: string
  }
  description: string
  timestamp: string
}

interface ActivityLogProps {
  className?: string
  /**
   * Array of activities to render. If not provided a small demo list will be shown instead.
   */
  activities?: ActivityLogItem[]
}

/**
 * Display a chronological list of activities.
 *
 * This component is completely presentational – it does **not** fetch data on its own.
 * Pass the `activities` prop (sorted newest-first) or omit it to show a placeholder list.
 */
export function ActivityLog({ activities, className }: ActivityLogProps) {
  const data: ActivityLogItem[] = activities ?? [
    {
      id: 1,
      user: {
        name: "Jane Cooper",
        avatar: "/avatars/jane.jpg",
      },
      description: "created a new project \"Acme Redesign\"",
      timestamp: "2h ago",
    },
    {
      id: 2,
      user: {
        name: "Devon Lane",
        avatar: "/avatars/devon.jpg",
      },
      description: "completed task \"Build authentication flow\"",
      timestamp: "5h ago",
    },
    {
      id: 3,
      user: {
        name: "Eleanor Pena",
        avatar: "/avatars/eleanor.jpg",
      },
      description: "commented on issue #204",
      timestamp: "1d ago",
    },
  ]

  return (
    <Card className={cn(className)}>
      <CardHeader className="pb-4">
        <CardTitle>Activity Log</CardTitle>
      </CardHeader>
      <CardContent className="p-0">
        <ul className="divide-border divide-y">
          {data.map((item) => (
            <li key={item.id} className="flex items-start gap-3 px-6 py-4">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={item.user.avatar} alt={item.user.name} />
                <AvatarFallback className="rounded-lg">
                  {item.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 text-sm leading-5">
                <p>
                  <span className="font-medium">{item.user.name}</span> {item.description}
                </p>
                <span className="text-muted-foreground text-xs">{item.timestamp}</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
} 