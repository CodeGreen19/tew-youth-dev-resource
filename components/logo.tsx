import { Package } from 'lucide-react'
import Link from 'next/link'

export function Logo() {
    return (
        <div className='flex items-center justify-center'>
            <Link href={"/"}>
                <div className=' text-3xl font-bold flex items-center gap-1'><Package className='size-7' /> <span>Tewy</span></div>
            </Link>
        </div>
    )
}
