import {
  Settings,
  Play,
  MoveLeft,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Sair } from "./Sair";

export function NavItem() {
  const location = useLocation();
  const isActive = (path: string): boolean =>
    location.pathname === path;

  const linkClass = (path: string) =>
    `flex items-center justify-start gap-1 w-full p-2 text-sm transition rounded-lg
     ${
       isActive(path)
         ? "bg-[#7a0000] text-yellow-300 font-bold"
         : "text-yellow-400 hover:text-yellow-300 hover:bg-[#8b0000]"
     }`;

  return (
    <div className="flex flex-col h-full justify-between p-5 bg-[#a10000] border-r border-yellow-600 dark:border-yellow-800">
      <nav className="flex flex-col gap-1">
        <Link to="/home" className={linkClass("/home")}>
          <Play className="h-5 w-5" />
          <span className="font-extrabold">JOGAR</span>
        </Link>

        <Link to="/config" className={linkClass("/config")}>
          <Settings className="h-5 w-5" />
          <span className="font-extrabold">DEFINIÇÕES</span>
        </Link>
      </nav>

      <div className="border-t border-yellow-600 max-w-full pt-4 mt-4">
        <Dialog>
          <DialogTrigger asChild>
            <Link
              to="/home"
              className="flex items-center justify-start gap-3 w-full p-2 text-sm text-yellow-400 hover:text-red-200 hover:bg-[#700000] transition"
            >
              <MoveLeft  className="h-5 w-5" />
              <span className="font-bold">Sair</span>
            </Link>
          </DialogTrigger>
          <Sair />
        </Dialog>
      </div>
    </div>
  );
}
