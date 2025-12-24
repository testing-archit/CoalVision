import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ReactNode } from 'react';
import { ref, get, query, orderByChild, equalTo } from 'firebase/database';
import { database } from '../services/firebase';
import type { User } from '../types';

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    error: string | null;
    login: (name: string, password: string) => Promise<boolean>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Check for saved user in localStorage
        const savedUser = localStorage.getItem('coalvision_user');
        if (savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (e) {
                localStorage.removeItem('coalvision_user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (name: string, password: string): Promise<boolean> => {
        setIsLoading(true);
        setError(null);

        try {
            const usersRef = ref(database, 'dataform');
            const userQuery = query(usersRef, orderByChild('name'), equalTo(name));
            const snapshot = await get(userQuery);

            if (snapshot.exists()) {
                let foundUser: User | null = null;

                snapshot.forEach((childSnapshot) => {
                    const userData = childSnapshot.val();
                    if (userData.pass === password) {
                        foundUser = {
                            name: userData.name,
                            enrollId: userData.enrollId,
                            position: userData.position,
                            site: userData.site,
                            status: userData.status
                        };
                    }
                });

                if (foundUser) {
                    setUser(foundUser);
                    localStorage.setItem('coalvision_user', JSON.stringify(foundUser));
                    setIsLoading(false);
                    return true;
                } else {
                    setError('Invalid password');
                    setIsLoading(false);
                    return false;
                }
            } else {
                setError('User not found');
                setIsLoading(false);
                return false;
            }
        } catch (err) {
            console.error('Login error:', err);
            setError('An error occurred during login');
            setIsLoading(false);
            return false;
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('coalvision_user');
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, error, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
