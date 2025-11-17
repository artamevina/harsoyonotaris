import { useState } from 'react'
import { useAuth } from './AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faXmark,
    faCircleExclamation,
    faSpinner,
    faEnvelope,
    faLock,
    faCheckSquare,
    faSquare
} from '@fortawesome/free-solid-svg-icons'

export default function LoginModal({ isOpen, onClose, onSwitchToRegister }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [rememberMe, setRememberMe] = useState(false)
    const { signIn } = useAuth()

    const handleSubmit = async (e) => {
        e.preventDefault()
        setIsLoading(true)
        setError('')

        try {
            await signIn(email, password)
            if (rememberMe) {
                localStorage.setItem('isLoggedIn', 'true')
                localStorage.setItem('userEmail', email)
            }
            onClose()
        } catch (error) {
            let errorMessage = 'Login failed. Please try again.'

            if (error.code === 'auth/wrong-password') {
                errorMessage = 'Incorrect password. Please try again.'
            } else if (error.code === 'auth/user-not-found') {
                errorMessage = 'No account found with this email.'
            } else if (error.code === 'auth/invalid-email') {
                errorMessage = 'Please enter a valid email address.'
            }

            setError(errorMessage)
            localStorage.removeItem('isLoggedIn')
            localStorage.removeItem('userEmail')
        } finally {
            setIsLoading(false)
        }
    }

    if (!isOpen) return null

    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 backdrop-blur-sm">
            <div className="bg-gray-900 rounded-lg p-6 w-full max-w-md border border-gold-500 relative">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
                >
                    <FontAwesomeIcon icon={faXmark} className="h-6 w-6" />
                </button>

                <h2 className="text-2xl font-bold mb-4 text-white">Welcome Back</h2>
                <p className="text-gray-400 mb-6">Sign in to access your account</p>

                {error && (
                    <div className="mb-4 p-4 bg-red-900/50 border border-red-700 rounded-md flex items-start gap-3 animate-fade-in">
                        <FontAwesomeIcon icon={faCircleExclamation} className="h-5 w-5 text-red-400 mt-0.5 flex-shrink-0" />
                        <div>
                            <p className="text-red-300 font-medium">{error}</p>
                            {error.includes('password') && (
                                <p className="text-red-400 text-sm mt-1">
                                    Forgot your password?{' '}
                                    <button
                                        className="text-gold-400 hover:text-gold-300 underline"
                                        onClick={() => {
                                            setError('email atau password salah')
                                        }}
                                    >
                                        Reset it
                                    </button>
                                </p>
                            )}
                        </div>
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-300 mb-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faEnvelope} className="h-4 w-4" />
                            Email
                        </label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-1 ${error && error.includes('email')
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-700 focus:ring-gold-500'
                                }`}
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label className="block text-gray-300 mb-2 flex items-center gap-2">
                            <FontAwesomeIcon icon={faLock} className="h-4 w-4" />
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={`w-full px-3 py-2 border rounded-md bg-gray-800 text-white focus:outline-none focus:ring-1 ${error && error.includes('password')
                                ? 'border-red-500 focus:ring-red-500'
                                : 'border-gray-700 focus:ring-gold-500'
                                }`}
                            required
                        />
                    </div>
                    <div className="flex justify-between items-center mb-6">
                        <div className="flex items-center">
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className="flex items-center gap-2"
                            >
                                <FontAwesomeIcon
                                    icon={rememberMe ? faCheckSquare : faSquare}
                                    className={`h-4 w-4 ${rememberMe ? 'text-gold-500' : 'text-gray-400'}`}
                                />
                                <label className="text-sm text-gray-400 cursor-pointer">
                                    Remember me
                                </label>
                            </button>
                        </div>
                    </div>
                    <div className="flex justify-end gap-3">
                        <button
                            type="button"
                            onClick={() => {
                                setError('')
                                onClose()
                            }}
                            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition border border-gray-700 flex items-center gap-2"
                        >
                            <FontAwesomeIcon icon={faXmark} className="h-4 w-4" />
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`px-4 py-2 rounded-md transition ${isLoading
                                ? 'bg-gold-600 cursor-not-allowed'
                                : 'bg-gold-500 hover:bg-gold-400'
                                } text-gray-900 font-medium flex items-center justify-center min-w-[80px] gap-2`}
                        >
                            {isLoading ? (
                                <>
                                    <FontAwesomeIcon icon={faSpinner} className="animate-spin h-4 w-4" />
                                    Signing in...
                                </>
                            ) : (
                                <>
                                    Sign In
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}