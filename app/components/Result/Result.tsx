'use client'

import {Suspense, useEffect, useState} from "react";
import {supabase} from "../db";
import { useSearchParams } from "next/navigation";
import Search from "../SearchBar/Search";
import BackButton from "../BackButton/BackButton";


type user = {
  id: number
  word: string
  def: string
  api:string
  etymology: string
  nature: string
  exemple: string[]
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
  
  // Display 12 random words excluding the searched word
  const otherWords = word.filter(w => w.word !== n);
  const displayWords = otherWords.sort(() => 0.5 - Math.random()).slice(0, 12);
          
  return (
    <div className="min-h-screen flex flex-col">
      {/* Search bar avek back button nan menm liy */}
      <div className="flex items-center w-full px-4 mb-6 mt-4 gap-2">
        <div className="shrink-0">
          <BackButton />
        </div>
        <div className="flex-1 flex justify-center">
          <Search word={search} />
        </div>
      </div>
      {/* Sa sipoze vinn on 2x2 grid*/}
      <div className="px-4">
        {/* Definisyon */}
        <div className="bg-white rounded-lg shadow p-4 mb-4 border">
          <h2 className="font-bold text-xl mb-3">Definisyon:</h2>
          <div className="text-lg">
            {loding ? (
              <p>Chajman...</p>
            ) : fil.length > 0 ? (
              <ul className="md:text-lg text-sm">
                {fil.map((user) => (
                  <li key={user.id} className="bg-clo rounded-2xl">
                    <div className="font-bold  pl-5 mb-2">{user.word}</div>
                    <div className=" bg-white p-4 rounded-2xl">
                      <div className="text-gray-700 font-bold mb-2"> APi: <span className="ml">{user.api}</span></div>
                    <div className="text-gray-900 mb-4 flex flex-col"><span className="font-bold">Etimoloji:</span> {user.etymology}</div>
                    <div className="text-gray-900 font-bold "><span className="ml">{user.nature}</span></div>
                    <div className="text-gray-900 mb-4">{user.def}</div>
                    <span className="ml text-gray-900 font-bold ">Exemple</span>
                    <div>{user.exemple.map((ex:string,index:any) => (
                      <div key={index}><span className="font-medium">{index+1}</span>-{ex},</div>
                    ))}</div>
                    <h1 className="bg-clo h-1 mt-2 mb-2 rounded-xl">_</h1>
                    <div><span className="font-bold">Sinonim:</span> {user.sino.map((sino:string) => (
                      <a href={`/results?search=${sino}`}key={sino} className="hover:text-blue-500 cursor-pointer">{sino}, </a>
                    ))}</div>
                    <h1 className="bg-clo h-1 mt-2 mb-2 rounded-xl">_</h1>
                    <div><span className="font-bold">Kont: </span>{user.kont.map((kont:string) => (
                      <a href={`/results?search=${kont}`} key={kont} className="hover:text-blue-500 cursor-pointer">{kont}, </a>
                    ))}</div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : search ? (
              <p className="text-center p-4">Mo sa pa nan diksyone nou. Ou kapab ajoute l!</p>
            ) : null}
          </div>
        </div>
        {/* Lot Mot */}
        <div className="bg-white rounded-lg shadow p-4 border-0.5">
          <div className="bg-clo rounded-2xl">
            <h2 className="font-bold text-xl mb-2 pl-5">Lot Mot:</h2>
          <ul className="columns-2 md:columns-3 lg:columns-4 rounded-xl bg-white">
            {displayWords.map((user) => (
              <li key={user.id} className="">
                <a href={`/results?search=${user.word}`} className="hover:text-blue-500 cursor-pointer">
                  {user.word}
                </a>
              </li>
            ))}
          </ul> 
          </div>
            {/*button next - commented out until prev/next functions are implemented
          <div className="text-center italic ">
          {comb-1 > 0 ?<button className="mr-2 hover:text-[#6FE6FC]" onClick={prev}>avan</button>:null}
          {comb-1 > 0 ?(<button className="mr-2 h-6 w-6 rounded-lg border-1 border-sky-200">{comb-1}</button>): null}
          
          <button className="mr-2 h-6 w-6 rounded-lg font-bold bg-clo">{comb} </button>
          {role < word.length ?<button className="mr-2 h-6 w-6 rounded-lg border-1 border-sky-200 "> {comb+1} </button>:null}
          {role < word.length ?<button onClick={next} className="hover:text-[#6FE6FC]">
           suivan
          </button>: null}
           </div>
          */}
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
