import jwtDecode, { JwtPayload } from 'jwt-decode';
import { useRouter } from 'next/router';
import React, { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { useLoginMutation, User } from '../graphql/graphql';

export interface authData {
    currentUser: User | null;
    logIn(email: string, password: string): Promise<void>;
    logOut(): any;
    isLoggedIn(): boolean;
}

export const AuthContext = React.createContext<authData | null>(null);

export const useAuth = () => useContext(AuthContext) as authData;

const AuthProvider = ({ children }: any) => {
    const router = useRouter();
    const [loginMutation] = useLoginMutation();
    const tokenKey = process.env.NEXT_PUBLIC_AUTH_KEY || 'Authorization';

    const decodeUserPayload = (token: string): User => {
        const payload = jwtDecode<JwtPayload>(token);
        const user = payload as User;
        return user;
    };

    const [currentUser, setCurrentUser] = useState<User | null>(() => {
        if (typeof window === 'undefined') return null;
        const token = localStorage.getItem(tokenKey);
        if (token === null) return null;

        const user = decodeUserPayload(token);
        return user;
    });

    const logIn = async (email: string, password: string): Promise<void> => {
        try {
            const { data } = await loginMutation({
                variables: { loginEmail: email, loginPassword: password },
            });
            console.log(data);
            if (!data?.login) return;

            const accessToken = data.login.accessToken;
            localStorage.setItem(tokenKey, `Bearer ${accessToken}`);

            const user = decodeUserPayload(accessToken);
            setCurrentUser(user);

            toast.success('Sesión Iniciada');

            switch (user.name) {
                case 'Chef':
                    router.push('/chef');
                    break;

                case 'Manager':
                    router.push('/manager');
                    break;

                case 'Cashier':
                    router.push('/cashier');
                    break;

                default:
                    toast.error('Tipo de Usuario Desconocido');
                    break;
            }
        } catch (err) {
            toast.error('Error al Iniciar Sesion');
            console.error(err);
        }
    };

    const logOut = () => {
        localStorage.removeItem(tokenKey);
        setCurrentUser(null);
        router.push('/');
    };

    const isLoggedIn = (): boolean => !!localStorage.getItem(tokenKey);

    const value: authData = {
        currentUser,
        logIn,
        logOut,
        isLoggedIn,
    };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
