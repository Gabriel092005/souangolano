import { NavItem } from "../main-navigation/NavItem";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function SideBar() {
  return (
    <div className="fixed top-0 left-0 w-full border-none z-50 px-4 py-3 flex items-center justify-between shadow-md md:hidden">
      <Sheet>
        <SheetTrigger>
          <Menu className="w-6 h-6 text-zinc-800 dark:text-white" />
        </SheetTrigger>
        <SheetContent
          side="left"
          className="p-0 w-64 dark:bg-black border-none"
        >
          <NavItem />
        </SheetContent>

        {/* Remove o overlay */}
        <style>{`
          .sheet-overlay {
            background-color: transparent !important;
            pointer-events: none !important;
          }
        `}</style>
      </Sheet>
    </div>
  );
}
