import Link from "next/link";
export default function Header(){
    return(
        <header className="topbar">
            <div className="logo">
                <Link href="/">Comunica IEEE</Link>
            </div>
            <div className="user-profile">
                <div className="avatar">I</div>
            </div>
        </header>
    )
}