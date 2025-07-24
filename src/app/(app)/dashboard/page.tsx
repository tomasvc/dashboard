import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Separator } from "@/components/ui/separator"
import {
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { createClient } from "@/client/server"
import { redirect } from "next/navigation"
import { ModeToggle } from "@/components/theme-switcher"
import { SectionCards } from "@/components/section-cards"
import { ActivityLog } from "@/components/activity-log"
import { MyTasks } from "@/components/my-tasks"
import { ChartAreaInteractive } from "@/components/chart-area-interactive"

export default async function Page() {
    const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }
  
  return (
    <>
        <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4 w-full">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Building Your Application
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <div className="ml-auto">
              <ModeToggle />
            </div>
          </div>
        </header>
        <div className="@container/main flex flex-1 flex-col gap-2 mb-6">
          <div className="flex flex-col gap-4 py-4 md:gap-6 md:py-1">
            <SectionCards />
          </div>
          {/* <div className="bg-muted/50 min-h-[100vh] flex-1 rounded-xl md:min-h-min mx-4 lg:mx-6" /> */}
          <div className="flex flex-col md:flex-row gap-4 mx-4 lg:mx-6 my-1">
            {/* <MetricChart title="Total Revenue" currentValue="100,000" className="w-full md:w-2/3" /> */}
            <div className="w-full md:w-2/3"> 
              <ChartAreaInteractive />
            </div>
            <ActivityLog className="w-full md:w-1/3" />
          </div>
          <div className="mx-4 lg:mx-6 my-1">
            <MyTasks />
          </div>
        </div>
    </>
  )
}
