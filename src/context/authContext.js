import React, { createContext, useEffect, useState } from 'react';
import { auth, db } from '../config/firebaseConfig';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null); 
    
    const [fichaExercicios, setFichaExercicios] = useState([]);

    useEffect(() => {
        onAuthStateChanged(auth, (usuario) => {
            if(usuario){
                setUser({
                    email: usuario.email,
                    id: usuario.uid
                });
            } else {
                setUser(null);                
            }
        });
    }, []);

    const setFicha = (valor) => {
        setFichaExercicios(prev => [...prev, valor]);
    }

    const deleteExercicio = (id) => {
        let novaFicha = fichaExercicios.filter((item) => item.id != id);

        setFichaExercicios(novaFicha);
    };

    const mudaSets = (sets, id) => {
        let lista = fichaExercicios;
        lista.forEach((item) => {
            if(item.id == id){
                item.sets = sets
            }
        });

        setFichaExercicios(lista);        
    }

    const mudaKgEReps = (idExercicio, idSet, kg, reps) => {
        let lista = fichaExercicios;

        lista.forEach((item) => {
            if(item.id == idExercicio){
                item.sets.forEach((set) => {
                    if(set.set == idSet){
                        set.kg = kg;
                        set.reps = reps;
                    }
                });
            }
        });

        setFichaExercicios(lista);
    };


    const cadastro = async (email, senha, nome) => {
        try {
            const u = await createUserWithEmailAndPassword(auth, email, senha);
            
            await setDoc(doc(db, 'usuario', u.user.uid), {
                nome
            });
        } catch (error) {
            console.error(error);
        }
        
    };

    const login = async (email, senha) => {
        try {
            const u = await signInWithEmailAndPassword(auth, email, senha);

            setUser({
                email: u.user.email,
                id: u.user.uid
            });   
            
        } catch (error) {
            console.error(error);
            
        }
    }

    const logout = async () => {
        await signOut(auth);

        setUser(null);
    };

    return (
        <AuthContext.Provider value={{signed: !!user, user, fichaExercicios, setFichaExercicios, setFicha, deleteExercicio, mudaSets, mudaKgEReps, cadastro, login, logout}}>
            { children }
        </AuthContext.Provider>
    );
};

export default AuthProvider;