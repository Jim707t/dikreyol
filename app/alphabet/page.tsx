'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../components/db";

// 32 grafèm ofisyèl òtograf kreyòl ayisyen an (IPN, 1979)
const ALPHABET = ['A', 'An', 'B', 'Ch', 'D', 'E', 'È', 'En', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'Ng', 'O', 'Ò', 'On', 'Ou', 'Oun', 'P', 'R', 'S', 'T', 'Ui', 'V', 'W', 'Y', 'Z'];

type Word = {
  id: number;
  word: string;
  def: string | null;
  nature: string | null;
};

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function AlphabetPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState<string | null>(null);

  useEffect(() => {
    const fetchWords = async () => {
      const { data, error } = await supabase
        .from('words')
        .select('id, word, def, nature')
        .eq('approved', true)
        .order('word', { ascending: true });

      if (error) console.error(error);
      else setWords(data || []);
      setLoading(false);
    };
    fetchWords();
  }, []);

  const filteredWords = selectedLetter
    ? words.filter((w) => {
        const target = selectedLetter.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
        // È and Ò must keep their accents distinct from E and O
        if (selectedLetter === 'È' || selectedLetter === 'Ò') {
          return w.word.toLowerCase().startsWith(selectedLetter.toLowerCase());
        }
        if (selectedLetter === 'E' || selectedLetter === 'O') {
          return (
            w.word.toLowerCase().startsWith(selectedLetter.toLowerCase()) &&
            !['è', 'ò'].includes(w.word.charAt(0).toLowerCase())
          );
        }
        return normalize(w.word).startsWith(target);
      })
    : [];

  return (
    <div className="flex-1 px-4 sm:px-6 py-10">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-redht font-semibold mb-3">
            Lèt pa lèt
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
            Alfabè Kreyòl Ayisyen an
          </h1>
          <p className="text-ink-soft max-w-2xl mx-auto leading-relaxed">
            Òtograf ofisyèl kreyòl la genyen 32 grafèm: chak son gen yon sèl
            fason pou li ekri, e chak lèt li menm jan toujou. Chwazi yon lèt
            pou wè tout mo ki kòmanse avè l.{" "}
            <Link href="/istwa" className="text-blueht hover:text-redht transition-colors font-medium">
              Li istwa lang lan →
            </Link>
          </p>
        </div>

        {/* Alphabet Grid */}
        <div className="bg-white border border-mist rounded-2xl shadow-sm p-6 mb-6">
          <div className="grid grid-cols-4 sm:grid-cols-8 gap-2 sm:gap-3">
            {ALPHABET.map((letter) => (
              <button
                key={letter}
                onClick={() => setSelectedLetter(selectedLetter === letter ? null : letter)}
                className={`py-3 rounded-xl font-display font-bold text-lg sm:text-xl transition-all ${
                  selectedLetter === letter
                    ? 'bg-blueht text-white shadow-md scale-105'
                    : 'bg-paper border border-mist hover:border-blueht hover:text-blueht'
                }`}
              >
                {letter}
              </button>
            ))}
          </div>
        </div>

        {/* Filtered Words */}
        {selectedLetter && (
          <div className="bg-white border border-mist rounded-2xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-display font-bold text-xl">
                Mo ki kòmanse ak « {selectedLetter} »{" "}
                <span className="text-ink-soft font-normal text-base">
                  ({filteredWords.length})
                </span>
              </h2>
              <button
                onClick={() => setSelectedLetter(null)}
                className="text-sm text-redht hover:text-blueht font-medium transition-colors"
              >
                Efase
              </button>
            </div>

            {loading ? (
              <p className="text-center text-ink-soft italic py-6">Chajman…</p>
            ) : filteredWords.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredWords.map((word) => (
                  <Link
                    key={word.id}
                    href={`/mo/${encodeURIComponent(word.word)}`}
                    className="group p-4 rounded-xl bg-paper border border-mist hover:border-blueht transition-colors"
                  >
                    <div className="flex items-baseline gap-2">
                      <span className="font-display font-bold group-hover:text-blueht transition-colors">
                        {word.word}
                      </span>
                      {word.nature && (
                        <span className="text-[10px] uppercase tracking-wide text-redht font-semibold">
                          {word.nature}
                        </span>
                      )}
                    </div>
                    {word.def && (
                      <p className="text-sm text-ink-soft mt-1 line-clamp-2">{word.def}</p>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <p className="text-center text-ink-soft py-6">
                Poko gen mo ki kòmanse ak « {selectedLetter} » nan diksyonè a.{" "}
                <a href="https://add.diksyonekreyol.org" className="text-redht hover:text-blueht font-medium">
                  Ajoute youn!
                </a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
