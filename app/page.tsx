"use client";

import axios, { AxiosError } from 'axios';
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React from 'react'

export default async function Home() {


  const {push} = useRouter();
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const payload = {
      username : event.currentTarget.username.value,
      password: event.currentTarget.password.value,
    }

    try{
      const {data} = await axios.post("/api/auth/login",payload);

      alert(JSON.stringify(data));
      push("/dashboard")
    }catch(e){
      const error = e as AxiosError;

      alert(JSON.stringify(error.message));
    }
  }
  
  return (
    <main>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <div>
          <label htmlFor="username">User Name</label>
          <input type="text" id='username' name='username' required className='border rounded border-black'/>
        </div>

        <div>
          <label htmlFor="password">Password</label>
          <input type="password" id='password' name='password' required className='border rounded border-black'/>
        </div>

        <button type='submit' className='p-2 bg-orange-600 text-white w-fit rounded'>
          Submit
        </button>
      </form>
    </main>
  )
}