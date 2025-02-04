import {Sheet, SheetTrigger} from "@/components/ui/sheet.tsx";
import {Button} from "@/components/ui/button.tsx";

export function Sidebar() {
    return (
        <div className={"flex w-full flex-col bg-muted/40"}>
            <div className={"flex flex-col"}>
                <header>
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button>
                                <span>Abrir</span>
                            </Button>
                        </SheetTrigger>
                    </Sheet>
                </header>
            </div>
        </div>
    )
}