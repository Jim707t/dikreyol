'use client'

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { sendGAEvent } from "@next/third-parties/google";
import { supabase } from "../db";
import Search from "../SearchBar/Search";
import Entry, { WordEntry, WordChip } from "../Entry/Entry";

// Compare words ignoring case and accents so "lanmou", "Lanmou", "lanmoú" all match
const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().trim();

function Result() {
  const [words, setWords] = useState<WordEntry[]>([]);
  const [loading, setLoading] = useState(true);

  const searchParams = useSearchParams();
  const search = searchParams.get('search') || '';

  useEffect(() => {
    const fetchWords = async () => {
      const { data, error } = await supabase
        .from('words')
        .select('*')
        .eq('approved', true);
      if (error) console.error(error);
      else setWords(data || []);
      setLoading(false);
    };
    fetchWords();
  }, []);

  const matches = words.filter((w) => normalize(w.word) === normalize(search));

  // Analytics: which words people look up, and which ones we're missing
  useEffect(() => {
    if (loading || !search) return;
    if (matches.length > 0) {
      sendGAEvent("event", "word_view", { word: matches[0].word });
    } else {
      sendGAEvent("event", "word_not_found", { word: search });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, search]);

  // When nothing matches, suggest words that start with (or contain) the query
  const suggestions =
    matches.length === 0 && search
      ? words
          .filter((w) => {
            const q = normalize(search);
            return normalize(w.word).startsWith(q) || normalize(w.word).includes(q);
          })
          .slice(0, 8)
      : [];

  // A small sample of other words to keep exploring
  const otherWords = words
    .filter((w) => normalize(w.word) !== normalize(search))
    .sort(() => 0.5 - Math.random())
    .slice(0, 12);

  return (
    <div className="flex-1 w-full">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Search word={search} />

        <div className="mt-8 space-y-6">
          {loading ? (
            <div className="bg-white border border-mist rounded-2xl p-8 text-center text-ink-soft italic">
              Chajman…
            </div>
          ) : matches.length > 0 ? (
            matches.map((entry) => <Entry key={entry.id} entry={entry} />)
          ) : search ? (
            <div className="bg-white border border-mist rounded-2xl p-8 text-center">
              <p className="font-display text-2xl font-bold mb-2">
                « {search} » poko nan diksyonè a
              </p>
              <p className="text-ink-soft mb-4">
                Ou ka ede kominote a — soumèt mo sa a pou nou ajoute li!
              </p>
              <a
                href="https://add.diksyonekreyol.org"
                className="inline-block px-5 py-2.5 rounded-full bg-redht text-white text-sm font-medium hover:bg-[#a90d2a] transition-colors"
              >
                Ajoute mo sa a
              </a>

              {suggestions.length > 0 && (
                <div className="mt-8 text-left">
                  <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-3 text-center">
                    Petèt ou t ap chèche…
                  </h2>
                  <div className="flex flex-wrap gap-2 justify-center">
                    {suggestions.map((s) => (
                      <WordChip key={s.id} word={s.word} />
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : null}

          {/* Keep exploring */}
          {!loading && otherWords.length > 0 && (
            <div className="bg-white border border-mist rounded-2xl p-6">
              <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-3">
                Kontinye eksplore
              </h2>
              <div className="flex flex-wrap gap-2">
                {otherWords.map((w) => (
                  <WordChip key={w.id} word={w.word} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div className="text-center py-12 text-ink-soft italic">Chajman…</div>}>
      <Result />
    </Suspense>
  );
}
