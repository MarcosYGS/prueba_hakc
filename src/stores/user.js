import { defineStore } from 'pinia'
import {createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithPopup,
    signInWithEmailAndPassword,
    signOut,
    GoogleAuthProvider,
    updateProfile,

} from "firebase/auth"

import { auth } from '../firebase.js'
import router from "../router/index.js";
// import {userDataStore} from '../stores/database'
// import { doc, getDoc, setDoc } from 'firebase/firestore/lite';
// import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


export const useUserStore = defineStore("userStore",
    {
        state: () => ({
            userData: null,
            loadingUser: false,
            loadingSession: false,
        }),
        actions: {
            async googleAuth(){
                try {
                    const provider = new  GoogleAuthProvider();
                    const result = await signInWithPopup(auth, provider);
                    const user= result.user;

                    this.userData ={
                        email: user.email,
                        password: "autentificado por google",
                        uid : user.uid,
                    };

                    router.push("/home");
                } catch (error) {
                    console.log(error.code)
                    return error.code
                }
            },
            async registerUser (email, password) {
                this.loadingUser =true;
                try {
                    const {user} = await createUserWithEmailAndPassword(
                        auth,
                        email,
                        password
                    );
                    this.userData ={
                        email: user.email,
                        password: user.password,
                        uid : user.uid,
                    };
                    console.log(this.userData);
                    router().push("/home")
                } catch (error) {
                    console.log(error.code);
                    return error.code
                }finally{
                    this.loadingUser =false;
                }
            },
            // async setUser(user){
            //     try {
            //         const docRef = doc(db,"users", user.uid);

            //     this.userData ={
            //         email: user.email,
            //         uid:user.uid,
            //         displayName: user.displayName,
            //         photoURL: user.photoURL}

            //     await setDoc(docRef, this.userData)
            //     } catch (error) {
            //         console.log(error)
            //     }


            // },
            async loginUser(email, password){
                this.loadingUser =true;
                try {
                    const {user} = await signInWithEmailAndPassword(auth, email, password);
                    //await this.setUser(user)
                    console.log(user);
                    this.userData = { email: user.email, uid: user.uid, displayName: user.displayName, photoURL: user.photoURL};
                    router.push("/home");
                } catch (error) {
                    console.log(error.code);
                    return error.code

                }finally{
                    this.loadingUser =false;
                }
            },
            // async updateUser(displayName, imagen){
            //     this.loadingUser =true;
            //     try {
            //         if (imagen) {
            //             console.log(imagen);
            //         const storageRef = ref(storage, `perfil/${this.userData.uid}`)
            //         await uploadBytes(storageRef, imagen.originFileObj)
            //         const photoURL= await getDownloadURL(storageRef)
            //         await updateProfile(auth.currentUser, {
            //             photoURL
            //         });

            //         await updateProfile(auth.currentUser, {
            //             displayName,
            //         });
            //         }

            //         this.setUser(auth.currentUser)
            //     } catch (error) {
            //         console.log(error.code);
            //         return error.code

            //     }finally{
            //         this.loadingUser =false;
            //     }
            // },
            async logoutUser(){
                //const database = userDataStore();

                //database.$reset();
                try {

                    router.push("/")
                    this.userData =null;
                    await signOut(auth);
                    console.log("salimos" + this.userData)
                } catch (error) {
                    console.log(error);
                }

            },
            currentUser(){
                return new Promise((resolve, reject) => {
                    const unsubscribe = onAuthStateChanged(auth, (user) => {

                        if (user){

                            // await this.setUser(user)
                            this.userData ={
                                email: user.email,
                                uid:user.uid,
                                displayName: user.displayName,
                                photoURL: user.photoURL};
                                console.log("hey")
                        } else {
                            this.userData =null;
                           // const dataDataStore =userDataStore();
                           // dataDataStore.$reset();
                        };
                        resolve(user)
                    }, e => reject(e));
                    unsubscribe()
                })
            },

        },
    })
