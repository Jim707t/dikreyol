'use client'

import { useEffect, useState } from "react";
import Link from "next/link";
import { supabase } from "../db";
import Search from "../SearchBar/Search";

type Word = {
    id: number;
    word: string;
    def: string | null;
    nature: string | null;
    api: string | null;
};

// Pwovèb ayisyen — youn chak jou, menm jan ak mo jodi a
const PWOVEB = [
    "Men anpil, chay pa lou.",
    "Piti piti, zwazo fè nich li.",
    "Dèyè mòn gen mòn.",
    "Sa je pa wè, kè pa tounen.",
    "Bourik chaje pa kanpe.",
    "Bèl dan pa di zanmi.",
    "Chita pa bay.",
    "Kreyon Bondye pa gen gòm.",
    "Apre dans, tanbou lou.",
    "Sak vid pa kanpe.",
    "Yon sèl dwèt pa manje kalalou.",
    "Tout moun se moun.",
    "Wòch nan dlo pa konnen doulè wòch nan solèy.",
    "Bay kou bliye, pote mak sonje.",
];

// Yon nimewo ki chanje chak jou (dapre dat lokal la)
function daySeed() {
    const d = new Date();
    return d.getFullYear() * 372 + (d.getMonth() + 1) * 31 + d.getDate();
}

export default function FrontSeach() {
    const [words, setWords] = useState<Word[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchWords = async () => {
            const { data, error } = await supabase
                .from('words')
                .select('id, word, def, nature, api')
                .eq('approved', true)
                .order('word', { ascending: true });
            if (error) console.error(error);
            else setWords(data || []);
            setLoading(false);
        };
        fetchWords();
    }, []);

    const seed = daySeed();
    const wordOfDay = words.length > 0 ? words[seed % words.length] : null;
    const pwoveb = PWOVEB[seed % PWOVEB.length];

    return (
        <div className="flex-1 flex flex-col">
            {/* Hero */}
            <section className="relative kreyol-dots overflow-hidden">
                <div className="absolute inset-x-0 top-0 h-[420px] sun-glow pointer-events-none" aria-hidden="true" />
                <div className="relative flex flex-col items-center justify-center text-center px-4 pt-16 sm:pt-24 pb-10 bg-gradient-to-b from-transparent via-paper/60 to-paper">
                    <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-redht font-semibold mb-4">
                        Diksyonè lang kreyòl ayisyen
                    </p>
                    <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-8">
                        Chak mo se yon <span className="text-blueht italic">tras istwa</span>
                    </h1>

                    <div className="w-full max-w-xl px-2">
                        <Search large />
                    </div>

                    <p className="mt-5 text-sm text-ink-soft">
                        {loading ? (
                            <span className="italic">Chajman…</span>
                        ) : (
                            <>
                                <span className="font-semibold text-ink">{words.length}</span> mo nan diksyonè a
                            </>
                        )}
                    </p>

                    {/* Pwovèb jodi a */}
                    <p className="mt-10 font-display italic text-lg sm:text-xl text-ink">
                        « {pwoveb} »
                    </p>
                    <span className="mt-2 inline-block w-10 h-[3px] rounded-full bg-gold" aria-hidden="true" />
                </div>
            </section>

            {/* Mo jodi a + eksplorasyon */}
            <section className="max-w-5xl w-full mx-auto px-4 sm:px-6 pb-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Word of the day */}
                    <Link
                        href={wordOfDay ? `/mo/${encodeURIComponent(wordOfDay.word)}` : "/"}
                        className="md:col-span-2 group bg-white border border-mist rounded-2xl p-6 shadow-sm hover:border-gold transition-colors"
                    >
                        <p className="text-xs uppercase tracking-widest text-redht font-semibold mb-3">
                            Mo jodi a
                        </p>
                        {wordOfDay ? (
                            <>
                                <div className="flex items-baseline gap-3 flex-wrap">
                                    <span className="font-display text-3xl sm:text-4xl font-bold group-hover:text-blueht transition-colors">
                                        {wordOfDay.word}
                                    </span>
                                    {wordOfDay.api && (
                                        <span className="text-ink-soft font-mono text-sm">{wordOfDay.api}</span>
                                    )}
                                    {wordOfDay.nature && (
                                        <span className="text-xs px-2 py-0.5 rounded-full bg-blueht-soft text-blueht font-medium">
                                            {wordOfDay.nature}
                                        </span>
                                    )}
                                </div>
                                <p className="text-ink-soft mt-3 leading-relaxed line-clamp-3">
                                    {wordOfDay.def}
                                </p>
                            </>
                        ) : (
                            <p className="text-ink-soft italic">Chajman…</p>
                        )}
                    </Link>

                    {/* Quick links */}
                    <div className="flex flex-col gap-4">
                        <Link
                            href="/alphabet"
                            className="flex-1 bg-blueht text-white rounded-2xl p-5 hover:bg-blueht-deep transition-colors shadow-sm"
                        >
                            <p className="font-display text-xl font-bold mb-1">Alfabè a</p>
                            <p className="text-sm text-white/80">32 grafèm, tout mo yo.</p>
                        </Link>
                        <Link
                            href="/istwa"
                            className="flex-1 bg-redht text-white rounded-2xl p-5 hover:bg-[#a90d2a] transition-colors shadow-sm"
                        >
                            <p className="font-display text-xl font-bold mb-1">Istwa lang lan</p>
                            <p className="text-sm text-white/80">Soti 1697 rive jodi a.</p>
                        </Link>
                    </div>
                </div>
            </section>
        </div>
    )
}
