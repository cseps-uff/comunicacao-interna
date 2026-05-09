'use client';
import Link from "next/link";
import { usePathname } from 'next/navigation';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
export default function Header(){

    const pathname = usePathname();
    const atualpag = pathname.split('/').pop() || 'newslatter';
    const { setTheme, resolvedTheme } = useTheme();
    const [montado, setMontado] = useState(false);

    useEffect(() => {
        setMontado(true);
    }, []);

    const temaAtualEscuro = resolvedTheme === 'dark';
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
            <button className="botao-tema"
                onClick={() => setTheme(temaAtualEscuro ? 'light' : 'dark')}
                title="Alternar tema"
                >
                {temaAtualEscuro ? '☀️ Modo Claro' : '🌙 Modo Escuro'}
            </button>
        </header>
    );
}
