'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
export default function Header(){
    const pathname = usePathname();
    const atualpag = pathname.split('/').pop();
    return(
        <header className="topbar">
            <div className="logo">
                <Link href="/">Comunica IEEE</Link>
            </div>
            <div className="topbar">
                {atualpag}
            </div>
            <div className="user-profile">
                <div className="avatar">I</div>
            </div>
        </header>
    )
}
