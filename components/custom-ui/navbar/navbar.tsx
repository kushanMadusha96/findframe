'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link';
import styles from './navbar.module.css'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react';
import { Bars3Icon, MagnifyingGlassIcon, XMarkIcon, HomeIcon } from '@heroicons/react/24/outline';
import { TbCameraSearch } from "react-icons/tb";
import { Avathar } from '../avatar';
import clsx from 'clsx';
import { Button } from "@/components/ui/button"
import { Skeleton } from '@radix-ui/themes';

interface SessionUser {
    role: string;
    img: string | null | undefined
}

export default function NavBar() {
    const { data: session } = useSession();
    const currentPathname = usePathname();
    const [searcInputhValue, setSearchInputValue] = useState<string>()
    const [displayList, setDisplayList] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [sessionUser, setSessionUser] = useState<SessionUser | null>(null);
    const [showSearch, setShowSearch] = useState(false)


    useEffect(() => {
        if (session) {
            const user = {
                role: session?.user?.role,
                img: session?.user?.image,
            };
            setSessionUser(user);
        }
        setIsLoading(false);
    }, [session]);

    useEffect(() => {
        if (session) {
            console.log(session)
        }
    }, [session])

    const handleMenuClick = () => {
        setDisplayList(!displayList);
    };

    const handleCrossClick = () => {
        setDisplayList(!displayList);
    };

    return (
        <nav className={styles.navBarContainer}>
            <div>
                {!showSearch &&
                    <div className={styles.navbar}>
                        <div className={styles.logoContainer}>
                            <span className={styles.findText}>find</span>
                            <TbCameraSearch className={styles.cameraSearchIcon} size={35} color='#FFC107' />
                            <span className={styles.frameText}>frame</span>
                        </div>
                        <div className={styles.searchContainer}>
                            <div>
                                <input
                                    type='search'
                                    name='searchbar'
                                    placeholder='Search Photographer...'
                                    className={styles.searchInput}
                                    value={searcInputhValue}
                                    onChange={(e) => setSearchInputValue(e.target.value)}
                                />

                                {searcInputhValue &&
                                    <div className={styles.grapperListContainer}>
                                        <div className={styles.grapperContainer}>
                                            <div>
                                                {/* <ProfileImage imgUrl={user} alt='sellerPic' br='50%' h={40} w={40} /> */}
                                            </div>
                                            <span className={styles.grapperName}>
                                                Kushan Madusha Basnayaka
                                            </span>
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className={styles.linkContainer}>
                            <Link href="/" className={currentPathname === '/' ? styles.activeLink : styles.link}>Home</Link>

                            <Skeleton loading={isLoading} style={{ borderRadius: 5 }}>
                                {
                                    sessionUser?.role === 'grapher' &&
                                    <Link href="/profile" className={currentPathname === '/profile' ? styles.activeLink : styles.link}>Profile</Link>
                                }
                            </Skeleton>

                            <Skeleton loading={isLoading} style={{ borderRadius: 5 }}>
                                {
                                    sessionUser?.role !== 'grapher' &&
                                    // !session &&
                                    <Link href={session ? "/becomePhotographer" : "/login"} className={currentPathname === '/becomePhotographer' ? styles.activeLink : styles.link}>Become A Photographer</Link>
                                }
                            </Skeleton>

                            <Link href="/idea" className={currentPathname === '/idea' ? styles.activeLink : styles.link}>Your Idea</Link>
                        </div>

                        <div className={styles.iconAndImageContainer}>
                            <div className={styles.searchIcon}>
                                <MagnifyingGlassIcon className="xs:h-4 xs:w-4 h-5 w-5" onClick={() => setShowSearch(true)} />
                            </div>

                            <Skeleton loading={isLoading} style={{ borderRadius: '100%' }}>
                                <div className={styles.signInIcons}>
                                    {!session &&
                                        <div className={styles.avatar}>
                                            < Avathar />
                                        </div>
                                    }
                                    {session &&
                                        <Link href="/login" className={`${currentPathname === '/login' ? styles.activeLink : styles.link} ${styles.btnSignIn}`}>Sign In</Link>
                                    }
                                </div>
                            </Skeleton>

                        </div>
                        <div className={styles.menuBtn}>
                            {displayList ? (
                                <XMarkIcon className={clsx("h-6 w-6", styles.menuIcon)} onClick={handleMenuClick} /> //menuicon
                            ) : (
                                <Bars3Icon className={clsx("h-6 w-6", styles.menuIcon)} onClick={handleCrossClick} />
                            )}
                        </div>
                    </div>
                }

                {/* <Button onClick={() => signOut()}>Log Out</Button> */}

                {showSearch &&
                    <div className={styles.smallSearchContainer}>
                        <div className={styles.searchIconAndCancelBtn}>
                            <input
                                type='search'
                                name='searchbar'
                                placeholder='Search Photographer...'
                                className={styles.searchInput}
                                value={searcInputhValue}
                                onChange={(e) => setSearchInputValue(e.target.value)}
                            />
                            <Button className="bg-[#FFC107] hover:bg-[#FFB300]" onClick={() => setShowSearch(false)}>Cancel</Button>
                        </div>

                        {searcInputhValue &&
                            <div className={styles.grapperListContainer}>
                                <div className={styles.grapperContainer}>
                                    <div>
                                        {/* <ProfileImage imgUrl={user} alt='sellerPic' br='50%' h={40} w={40} /> */}
                                    </div>
                                    <span className={styles.grapperName}>
                                        Kushan Madusha Basnayaka
                                    </span>
                                </div>
                            </div>
                        }

                    </div>
                }
            </div>

            {displayList &&
                <div className={styles.menuLictContainer}>
                    <Link href="/" className={currentPathname === '/' ? styles.activeMenuLink : styles.menuLink}>Home</Link>
                    <Skeleton loading={isLoading} style={{ borderRadius: 5, width: '90%', margin: 'auto' }}>
                        {
                            sessionUser?.role === 'grapher' &&
                            <Link href="/profile" className={currentPathname === '/profile' ? styles.activeMenuLink : styles.menuLink}>Profile</Link>
                        }
                    </Skeleton>

                    <Link href="/idea" className={currentPathname === '/idea' ? styles.activeMenuLink : styles.menuLink}>Your Idea</Link>

                    <Skeleton loading={isLoading} style={{ borderRadius: 5, width: '90%', margin: 'auto' }}>
                        {
                            sessionUser?.role !== 'grapher' && (
                                <Link href={session ?
                                    "/becomePhotographer" : "/login"} className={currentPathname === '/becomePhotographer' ? styles.activeMenuLink :
                                        styles.menuLink}>Become A Photographer</Link>
                            )
                        }
                    </Skeleton>
                </div>
            }
        </nav>
    )
}
