import { ReactNode } from "react";
export const LinkButton = ({children, onclick}: {children: ReactNode, onclick: () => void }) => {
    return <div className="px-2 py-2 cursor-pointer hover:bg-[#ebe9df] font-normal text-sm rounded"
    onClick={onclick}>    
        {children}
    </div>
}