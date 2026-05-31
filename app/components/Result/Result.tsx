'use client'

import {Suspense, useEffect, useState} from "react";
import {supabase} from "../db";
import { useSearchParams } from "next/navigation";
import Search from "../SearchBar/Search";


type user = {
  id: number
  word: string
  def: string
  api:string
  etymology: string
  nature: string
  sino: string[]
  kont: string[]

}

function Result() {
  const [word, setWord] = useState<user[]>([])
  const [loding, setLoding] = useState(true)
    
    const searchpara = useSearchParams();
    const search = searchpara.get('search') || '';
    
    // loading data 
    useEffect(()=> { const dab = async ()=>{
      const { data, error } = await supabase.from('words').select('*')
      if (error) console.error(error)
      else setWord(data)
      setLoding(false)  
    }
    dab()
    }, []);
    
    const n = search.charAt(0).toUpperCase() + search.slice(1).toLowerCase()
  const fil = word.filter(wd =>wd.word === n)
          
  return (
    <div className="min-h-screen flex flex-col">
      {/* Search bar avek back button nan menm liy */}
      <div className="flex items-center w-full px-4 mb-6 mt-4 gap-2">
        <div className="shrink-0">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
            <span className="hidden sm:inline">Retounen</span>
          </button>
        </div>
        <div className="flex-1 flex justify-center">
          <Search word={search} />
        </div>
      </div>
      {/* Sa sipoze vinn on 2x2 grid*/}
      <div className="px-4">
        {/* Definisyon */}
        <div className="bg-white rounded-lg shadow p-4 mb-4">
          <h2 className="font-bold text-xl mb-3">Definisyon:</h2>
          <div className="text-lg">
            {loding ? (
              <p>Chajman...</p>
            ) : fil.length > 0 ? (
              <ul className="md:text-lg text-sm">
                {fil.map((user) => (
                  <li key={user.id}>
                    <div className="font-bold bg-clo pl-2 mb-2">{user.word}</div>
                    <div className="text-gray-700 font-bold mb-2"> APi: <span className="ml">{user.api}</span></div>
                    <div className="text-gray-900 mb-4 flex flex-col"><span className="font-bold">Etimoloji:</span> {user.etymology}</div>
                    <div className="text-gray-900 font-bold "><span className="ml">{user.nature}</span></div>
                    <div className="text-gray-900 mb-4">{user.def}</div>
                    <h1 className="bg-clo h-1 mt-2 mb-2">_</h1>
                    <div><span className="font-bold">Sinonim:</span> {user.sino.map((sino:any) => (
                      <a href={`/results?search=${sino}`} className="hover:text-blue-500 cursor-pointer">{sino}, </a>
                    ))}</div>
                    <h1 className="bg-clo h-1 mt-2 mb-2">_</h1>
                    <div><span className="font-bold">Kont: </span>{user.kont.map((kont:any) => (
                       <a href={`/results?search=${kont}`} className="hover:text-blue-500 cursor-pointer">{kont}, </a>
                    ))}</div>
                  </li>
                ))}
              </ul>
            ) : search ? (
              <p className="text-center p-4">Mo sa pa nan diksyone nou. Ou kapab ajoute l!</p>
            ) : null}
          </div>
        </div>
        {/* Mo disponib */}
        <div className="bg-white rounded-lg shadow p-4">
          <h2 className="font-bold text-xl mb-3 bg-clo pl-2">Mo disponib:</h2>
          <ul className="columns-2 md:columns-3 lg:columns-4">
            {word.map((user) => (
              <li key={user.id}>
                <a href={`/results?search=${user.word}`} className="hover:text-blue-500 cursor-pointer">
                  {user.word}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
export default function Page(){
  return (
    <Suspense fallback={<div className="text-center">Chajman...</div>}>
      <Result/>
    </Suspense>
  )
}