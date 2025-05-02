import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";
import {Link} from "react-router";
import {PanelBottom, Origami, Home, HandCoins, Presentation, LogOut, MapPinned} from "lucide-react";
import {Tooltip, TooltipContent, TooltipProvider, TooltipTrigger} from "@/components/ui/tooltip.tsx";

export function Sidebar() {
    return (
        <div className={"flex w-full flex-col bg-muted/40"}>

            <aside className={"fixed inset-y-0 left-0 z-10 hidden w-14 border-r bg-background sm:flex flex-col"}>
                <nav className={"flex flex-col items-center gap-4 px-2 py-5"}>
                    <TooltipProvider>
                        <Link to={"/dashboard"}
                              className={
                                  "flex h-9 w-9 shrink-0 items-center justify-center bg-primary text-primary-foreground rounded-full"
                              }
                        >
                            <Origami className={"h-5 w-5 transition-all"}/>
                            <span className={"sr-only"}>Bird Project Logo</span>
                        </Link>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to={"/dashboard"}
                                      className={
                                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                      }
                                >
                                    <Home className={"h-5 w-5"}/>
                                    <span className={"sr-only"}>Home</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side={"right"}>
                                Home
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to={"/campaign"}
                                      className={
                                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                      }
                                >
                                    <Presentation className={"h-5 w-5"}/>
                                    <span className={"sr-only"}>Campaign</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side={"right"}>
                                Campaign
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to={"/financial"}
                                      className={
                                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                      }
                                >
                                    <HandCoins className={"h-5 w-5"}/>
                                    <span className={"sr-only"}>Financial</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side={"right"}>
                                Financial
                            </TooltipContent>
                        </Tooltip>

                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to={"/map"}
                                      className={
                                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                      }
                                >
                                    <MapPinned className={"h-5 w-5"}/>
                                    <span className={"sr-only"}>Map</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side={"right"}>
                                Map
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>

                <nav className={"mt-auto flex flex-col items-center gap-4 px-2 py-5"}>
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Link to={"/"}
                                      className={
                                          "flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground"
                                      }
                                >
                                    <LogOut className={"h-5 w-5"}/>
                                    <span className={"sr-only"}>Log Out</span>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent side={"right"}>
                                Log Out
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                </nav>
            </aside>

            <div className={"sm:hidden flex flex-col sm:gap-4 sm:pl-14"}>
                <header
                    className={"sticky top-0 z-30 flex h-14 items-center px-4 border-b bg-background gap-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6"}
                >
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button size={"icon"} variant={"outline"} className={"sm:hidden"}>
                                <PanelBottom className={"w-5 h-5"}/>
                                <span className={"sr-only"}>Open / Close menu</span>
                            </Button>
                        </SheetTrigger>

                        <SheetContent side={"left"} className={"sm:max-w-x"}>
                            <nav className={"grid gap-6 text-lg font-medium"}>
                                <Link to={"/dashboard"}
                                      className={
                                          "flex h-10 w-10 bg-primary rounded-full text-lg items-center justify-center text-primary-foreground md:text-base gap-2"}
                                >
                                    <Origami className={"h-5 w-5 transition-all"}/>
                                    <span className={"sr-only"}>Bird Project Logo</span>
                                </Link>

                                <Link to={"/dashboard"}
                                      className={
                                          "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"}
                                >
                                    <Home className={"h-5 w-5 transition-all"}/>
                                    Home
                                </Link>

                                <Link to={"/campaign"}
                                      className={
                                          "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"}
                                >
                                    <Presentation className={"h-5 w-5 transition-all"}/>
                                    Campaign
                                </Link>

                                <Link to={"/financial"}
                                      className={
                                          "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"}
                                >
                                    <HandCoins className={"h-5 w-5 transition-all"}/>
                                    Financial
                                </Link>

                                <Link to={"/map"}
                                      className={
                                          "flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"}
                                >
                                    <MapPinned className={"h-5 w-5 transition-all"}/>
                                    Map
                                </Link>

                            </nav>
                        </SheetContent>
                    </Sheet>
                    <h2>Menu</h2>
                </header>
            </div>
        </div>
    )
}
