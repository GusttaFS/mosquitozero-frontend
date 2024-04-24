import { useContext } from 'react';
import Link from 'next/link';
import styles from './styles.module.scss';

import { VscAccount } from "react-icons/vsc";
import { FiLogOut } from 'react-icons/fi';

import { AuthContext, signOut } from '@/src/contexts/AuthContext';

export function Header() {
    const { user } = useContext(AuthContext);
    const firstName = user?.name.split(" ")[0];

    return (
        <header className={styles.container}>
            <div className={styles.content}>
                <Link href="/" className={styles.pefilLink}>
                    <VscAccount />
                    <p>{firstName}</p>
                </Link>

                <nav className={styles.menu}>
                    <button onClick={signOut}>
                        Sair
                        <FiLogOut />
                    </button>
                </nav>
            </div>
        </header>
    );
}