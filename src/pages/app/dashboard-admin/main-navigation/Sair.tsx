import { Button } from "@/components/ui/button";
import { DialogContent } from "@/components/ui/dialog";


export function Sair(){
    return(
         <DialogContent className="bg-red-700 border-none">
             <span className="text-yellow-500">Tens Certeza que desejas sair?</span>
             <div className="gap-2 flex">
               <Button>Sim</Button>
               <Button>Não</Button>
             </div>
         </DialogContent>
    )
}