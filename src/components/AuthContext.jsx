import { createContext, useContext, useState } from 'react'
import { supabase } from '../services/supabase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'
        const userEmail = localStorage.getItem('userEmail')
        return isLoggedIn ? { email: userEmail } : null
    })
    const [loading, setLoading] = useState(false)

    const signIn = async (email, password) => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .rpc('simple_login', {
                    email_text: email,
                    password_text: password
                })
                .single()

            if (error) throw error
            if (!data) throw new Error('Email atau password salah')

            setUser(data)
            return data
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signUp = async (name, email, password) => {
        setLoading(true)
        try {
            const { data, error } = await supabase
                .from('simple_users')
                .insert([{ name, email, password }])
                .single()

            if (error) throw error

            setUser(data)
            return data
        } catch (error) {
            throw error
        } finally {
            setLoading(false)
        }
    }

    const signOut = () => {
        localStorage.removeItem('isLoggedIn')
        localStorage.removeItem('userEmail')
    }

    const value = {
        user,
        loading,
        signIn,
        signUp,
        signOut
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}