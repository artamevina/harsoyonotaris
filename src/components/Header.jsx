import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useAuth } from './AuthContext'
import LoginModal from './LoginModal'

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
                        <Link to="/" className="text-gray-300 hover:text-gold-400 transition">Beranda</Link>
                        <Link to="/about" className="text-gray-300 hover:text-gold-400 transition">Tentang Saya</Link>

                        <Link
                            to={"/services"}
                            className="text-gray-300 hover:text-gold-400 transition"
                        >
                            Layanan
                        </Link>

                        <button
                            onClick={() => navigateToSection('/about', 'contact')}
                            className="text-gray-300 hover:text-gold-400 transition"
                        >
                            Kontak
                        </button>

                        <Link to="/articles" className="text-gray-300 hover:text-gold-400 transition">Artikel</Link>
                        {user ? (
                            <div className="flex items-center space-x-4">
                                <button
                                    onClick={handleLogout}
                                    className="text-gray-300 hover:text-gold-400 transition"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setLoginModalOpen(true)}
                                className="text-gray-300 hover:text-gold-400 transition"
                            >
                                Login
                            </button>
                        )}
                    </div>
                    <div className="md:hidden flex items-center">
                        <button
                            className="mobile-menu-button p-2 focus:outline-none"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            <div className={`mobile-menu md:hidden bg-gray-900 shadow-lg transition-all duration-300 ease-in-out ${mobileMenuOpen ? 'block' : 'hidden'}`}>
                <Link
                    to="/"
                    className="block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Beranda
                </Link>
                <Link
                    to="/about"
                    className="block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Tentang Saya
                </Link>

                <Link
                    to={"/services"}
                    className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300"
                >
                    Layanan
                </Link>

                <button
                    onClick={() => navigateToSection('/about', 'contact')}
                    className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300"
                >
                    Kontak
                </button>

                <Link
                    to="/articles"
                    className="block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300"
                    onClick={() => setMobileMenuOpen(false)}
                >
                    Artikel
                </Link>
                {user ? (
                    <>
                        <button
                            onClick={() => {
                                handleLogout()
                                setMobileMenuOpen(false)
                            }}
                            className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300"
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <button
                        onClick={() => {
                            setLoginModalOpen(true)
                            setMobileMenuOpen(false)
                        }}
                        className="w-full text-left block py-3 px-4 text-sm hover:bg-gray-800 text-gray-300"
                    >
                        Login
                    </button>
                )}
            </div>

            <LoginModal isOpen={loginModalOpen} onClose={() => setLoginModalOpen(false)} />
        </header>
    )
}