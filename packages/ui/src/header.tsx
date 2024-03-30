import { BellRing } from 'lucide-react'
import React from 'react'

export default function Header() {
    return (
        <div className=" h-15 border-b flex justify-between items-center text-lg font-semibold px-10 py-2">
            <div>
                Dashboard
            </div>
            <div className="border rounded-full p-2">
            <BellRing size={15} />
            </div>
        </div>
    )
}