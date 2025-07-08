import { Info, Play, Send, Settings } from "lucide-react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export function Menu() {
  return (
    <motion.div
      className="flex h-screen ml-8"
      initial={{ x: "-100%", opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="lg:flex lg:flex-col lg:flex-1 lg:ml-40 lg:p-4 flex flex-col flex-1 -ml-16 mt-9 p-4">
        <div className="flex items-center flex-col justify-center pt-10">
          <strong className="bg-gradient-to-r text-3xl from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            SOU ANGOLANO
          </strong>
          <span className="bg-gradient-to-r text-3xl from-yellow-400 to-yellow-600 bg-clip-text text-transparent">
            CONHEÇO ANGOLA
          </span>

          <div className="flex flex-col justify-center mt-8 gap-4">
            <LinkButton to="/home" icon={<Play size={27}/>} label="JOGAR" />
            <LinkButton to="/" icon={<Send size={17} />} label="CONVITE" />
            <LinkButton to="/" icon={<Settings size={27} />} label="CONFIG" />
            <LinkButton to="/" icon={<Info size={27} />} label="ACERCA" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// Reutilizável botão estilizado
function LinkButton({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  return (
    <Link
      to={to}
      className="inline-block px-6 py-2 text-sm w-40 font-bold text-red-600 rounded-lg shadow-md bg-gradient-to-r from-yellow-400 via-yellow-500 to-yellow-600 hover:brightness-110 transition"
    >
      <div className="flex items-center gap-2">
        {icon}
        {label}
      </div>
    </Link>
  );
}
