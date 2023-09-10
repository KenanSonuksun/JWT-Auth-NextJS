'use client';

import axios, { AxiosError } from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

interface UserResponse {
    user: string | null;
    error: AxiosError | null;
}

export default function DashboardLayout({
    children,
}:{
    children : React.ReactNode;
}){

    const { push } = useRouter();
    const [isSuccess, setIsSuccess] = useState<boolean>(false);

    useEffect(()=>{
        (async ()=>{
            const {user,error} = await getUser();

            if(error){
                push("/");
                return;
            }

            setIsSuccess(true);
        })();
    },[push]);

    if(!isSuccess){
        return <p>Loading...</p>;
    }

    return (
        <main>
          <header>
            <Link href='/dashboard'>
              Dashboard
            </Link>
            <Link href='/dashboard/settings'>
              Settings
            </Link>
          </header>
          {children}
        </main>
      );
}


async function getUser(): Promise<UserResponse>{
    try{
        const {data} = await axios.get("/api/auth/me");

        return {
            user:data,
            error:null,
        };
    }catch(e){
        const error = e as AxiosError;

        return {
            user : null,
            error,
        }
    }
}