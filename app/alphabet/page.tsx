'use client'

import { useEffect, useState } from "react";
import { supabase } from "../components/db";
import BackButton from "../components/BackButton/BackButton";

const ALPHABET = ['A', 'An', 'B', 'Ch', 'D', 'E', 'È', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'Ò', 'Ou', 'P', 'R', 'S', 'T', 'U', 'V', 'W', 'Y', 'Z'];

type Word = {
  id: number;
  word: string;
  def: string;
  sino: string;
  kont: string;
  approved: boolean;
}

export default function AlphabetPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);
  const [filteredWords, setFilteredWords] = useState<Word[]>([]);

  useEffect(() => {
    const fetchWords = async () => {
      const { data, error } = await supabase
        .from('words')
        .select('*')
        .eq('approved', true); // Only fetch approved words
      
      if (error) console.error(error);
      else setWords(data || []);
      setLoading(false);
    };
    fetchWords();
  }, []);

  const handleLetterClick = (letter: string) => {
    setSelectedLetter(letter);
    const filtered = words.filter(word => {
      const firstLetter = word.word.slice(0, letter.length);
      return firstLetter.toLowerCase() === letter.toLowerCase();
    });
    setFilteredWords(filtered);
  };

  const resetFilter = () => {
    setSelectedLetter(null);
    setFilteredWords([]);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        {/* Back Button */}
        <div className="mb-4">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Alfabè Kreyòl Ayisyen</h1>
          <div className="bg-white rounded-lg shadow p-6 mb-6">
            <h2 className="font-bold text-xl mb-3">Istwa Kout:</h2>
            <p className="text-sm md:text-base leading-relaxed">
              Kreyòl Ayisyen devlope sou zile Ayiti (ki te rele Sen Domeng anvan) pandan 17yèm–18yèm syèk yo, nan peryòd kolonyal fransè a. Esklav Afriken yo ki soti nan plizyè orijin etnik ak lengwistik te bezwen yon fason komen pou kominike ak moun ki pale fransè ak youn ak lòt. Apre yon tan, yon nouvo lang te parèt, ki konbine sitou vokabilè fransè ak enfliyans enpòtan ki soti nan lang Afrik Lwès ak Santral, ansanm ak eleman nan Taíno, Panyòl, ak Pòtigè.
            </p>
            <p className="text-sm md:text-base leading-relaxed mt-3">
              Nan ane 1700 yo, Kreyòl Ayisyen te vin lang prensipal ki te itilize nan tout koloni an. Apre Ayiti te vin yon nasyon endepandan an 1804, lang lan kontinye pale pa majorite popilasyon an.
            </p>
            <p className="text-sm md:text-base leading-relaxed mt-3">
              An 1987, Konstitisyon Ayisyen an ofisyèlman rekonèt Kreyòl Ayisyen kòm youn nan de lang nasyonal Ayiti yo, ansanm ak fransè. Jodi a, Kreyòl Ayisyen pale pa plis pase 12 milyon moun epi li itilize nan edikasyon, medya, gouvènman, literati, ak kominikasyon chak jou.
            </p>
          </div>
        </div>

        {/* Alphabet Grid */}
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="font-bold text-xl mb-4">Chwazi yon lèt:</h2>
          <div className="grid grid-cols-4 md:grid-cols-7 gap-2 md:gap-3">
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => handleLetterClick(letter)}
                className={`p-4 rounded-lg font-bold text-lg md:text-xl border-2 transition-all hover:scale-105 ${
                  selectedLetter === letter
                    ? 'bg-blue-500 text-white border-blue-600'
                    : 'bg-gray-100 hover:bg-gray-200 border-gray-300'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Words Display */}
        {selectedLetter && (
          <div className="bg-white rounded-lg shadow p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-bold text-xl">
                Mo ki kòmanse ak &quot;{selectedLetter}&quot; ({filteredWords.length})
              </h2>
              <button
                onClick={resetFilter}
                className="text-blue-500 hover:text-blue-700 font-semibold"
              >
                Efase
              </button>
            </div>
            
            {loading ? (
              <p className="text-center">Chajman...</p>
            ) : filteredWords.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {filteredWords.map((word) => (
                  <a
                    key={word.id}
                    href={`/results?search=${word.word}`}
                    className="p-3 bg-gray-50 rounded hover:bg-blue-50 hover:text-blue-600 transition-colors border border-gray-200"
                  >
                    {word.word}
                  </a>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-500">
                Pa gen mo ki kòmanse ak lèt &quot;{selectedLetter}&quot; nan diksyonè a.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
