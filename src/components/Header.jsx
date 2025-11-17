import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import LoginModal from './LoginModal'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faBars,
    faTimes,
    faHome,
    faUser,
    faCogs,
    faEnvelope,
    faFileAlt,
    faSignInAlt,
    faSignOutAlt
} from '@fortawesome/free-solid-svg-icons'

export default function Header() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    const [loginModalOpen, setLoginModalOpen] = useState(false)
    const { user, signOut } = useAuth()
    const navigate = useNavigate()

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId)
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' })
        }
        setMobileMenuOpen(false)
    }

    const navigateToSection = (path, sectionId) => {
        if (window.location.pathname === path) {
            scrollToSection(sectionId)
        } else {
            navigate(path)
            setTimeout(() => {
                scrollToSection(sectionId)
            }, 100)
        }
    }

    const handleLogout = async () => {
        try {
            await signOut()
            navigate('/')
            window.location.reload()
            setMobileMenuOpen(false)
        } catch (error) {
            console.error('Error logging out:', error)
        }
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (mobileMenuOpen && !event.target.closest('.mobile-menu') && !event.target.closest('.mobile-menu-button')) {
                setMobileMenuOpen(false)
            }
        }

        document.addEventListener('click', handleClickOutside)
        return () => {
            document.removeEventListener('click', handleClickOutside)
        }
    }, [mobileMenuOpen])

    return (
        <header className="bg-black shadow-sm fixed w-full z-10">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-16">
                    <div className="flex items-center">
                        <Link to={"/"} className="flex items-center" onClick={() => setMobileMenuOpen(false)}>
                            <span className="text-xl font-semibold text-white">
                                Harsoyo
                            </span>
                            <span className="ml-2 text-sm bg-gray-800 text-gold-500 px-2 py-1 rounded border border-gold-500">
                                Notaris & PPAT Tegal
                            </span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link to="/" className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2">
                            <FontAwesomeIcon icon={faHome} className="h-4 w-4" />
                            Beranda
                        </Link>
                        <Link to="/about" className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2">
                            <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                            Tentang Saya
                        </Link>

                        <Link
                            to={"/services"}
                            className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faCogs} className="h-4 w-4" />
                            Layanan
                        </Link>

                        <button
                            onClick={() => navigateToSection('/about', 'contact')}
                            className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                            Kontak
                        </button>

                        <Link to="/articles" className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2">
                            <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4" />
                            Artikel
                        </Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2"
                                >
                                    <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setLoginModalOpen(true)}
                                className="text-gray-300 hover:text-gold-400 transition flex items-center gap-2"
                            >
                                <FontAwesomeIcon icon={faSignInAlt} className="h-4 w-4" />
                                Login
                            </button>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            className="mobile-menu-button p-2 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <FontAwesomeIcon
                                icon={mobileMenuOpen ? faTimes : faBars}
                                className="h-6 w-6 text-white"
                            />
                        </button>
                    </div>
                </div>
            </div>

            <div className={`mobile-menu md:hidden bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                <Link
                    to="/"
                    className="block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300 flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <FontAwesomeIcon icon={faHome} className="h-4 w-4" />
                    Beranda
                </Link>
                <Link
                    to="/about"
                    className="block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300 flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <FontAwesomeIcon icon={faUser} className="h-4 w-4" />
                    Tentang Saya
                </Link>

                <Link
                    to={"/services"}
                    className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300 flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <FontAwesomeIcon icon={faCogs} className="h-4 w-4" />
                    Layanan
                </Link>

                <button
                    onClick={() => {
                        navigateToSection('/about', 'contact')
                        setMobileMenuOpen(false)
                    }}
                    className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300 flex items-center gap-3"
                >
                    <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                    Kontak
                </button>

                <Link
                    to="/articles"
                    className="block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300 flex items-center gap-3"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    <FontAwesomeIcon icon={faFileAlt} className="h-4 w-4" />
                    Artikel
                </Link>
                {user ? (
                    <>
                        <button
                            onClick={() => {
                                handleLogout()
                                setMobileMenuOpen(false)
                            }}
                            className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300 flex items-center gap-3"
                        >
                            <FontAwesomeIcon icon={faSignOutAlt} className="h-4 w-4" />
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            setLoginModalOpen(true)
                            setMobileMenuOpen(false)
                        }}
                        className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300 flex items-center gap-3"
                    >
                        <FontAwesomeIcon icon={faSignInAlt} className="h-4 w-4" />
                        Login
                    </button>
                )}
            </div>

            <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </header>
    )
}