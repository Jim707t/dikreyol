import Link from "next/link";

export type WordEntry = {
  id: number;
  word: string;
  def: string | null;
  sino: string[] | null;
  kont: string[] | null;
  api: string | null;
  etymology: string | null;
  exemple: string[] | null;
  nature: string | null;
};

export function WordChip({ word }: { word: string }) {
  return (
    <Link
      href={`/mo/${encodeURIComponent(word)}`}
      className="inline-block px-3 py-1 rounded-full bg-blueht-soft text-blueht text-sm hover:bg-blueht hover:text-white transition-colors"
    >
      {word}
    </Link>
  );
}

export default function Entry({ entry }: { entry: WordEntry }) {
  return (
    <article className="bg-white border border-mist rounded-2xl shadow-sm p-6 sm:p-8">
      {/* Headword */}
      <div className="flex items-baseline gap-x-4 gap-y-1 flex-wrap">
        <h1 className="font-display text-4xl sm:text-5xl font-bold tracking-tight">
          {entry.word}
        </h1>
        {entry.api && (
          <span className="font-mono text-ink-soft text-base sm:text-lg">{entry.api}</span>
        )}
        {entry.nature && (
          <span className="text-xs sm:text-sm px-2.5 py-0.5 rounded-full bg-redht-soft text-redht font-semibold uppercase tracking-wide">
            {entry.nature}
          </span>
        )}
      </div>

      <div className="tricolor-rule my-5 max-w-[120px]" />

      {/* Definition */}
      {entry.def && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-2">
            Definisyon
          </h2>
          <p className="text-lg leading-relaxed">{entry.def}</p>
        </section>
      )}

      {/* Examples */}
      {entry.exemple && entry.exemple.length > 0 && (
        <section className="mb-6">
          <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-2">
            Egzanp
          </h2>
          <ul className="space-y-2 border-l-2 border-blueht/30 pl-4">
            {entry.exemple.map((ex, i) => (
              <li key={i} className="font-display italic text-ink-soft leading-relaxed">
                « {ex} »
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Synonyms / Antonyms */}
      {((entry.sino && entry.sino.length > 0) || (entry.kont && entry.kont.length > 0)) && (
        <section className="mb-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {entry.sino && entry.sino.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-2">
                Sinonim
              </h2>
              <div className="flex flex-wrap gap-2">
                {entry.sino.map((s) => (
                  <WordChip key={s} word={s} />
                ))}
              </div>
            </div>
          )}
          {entry.kont && entry.kont.length > 0 && (
            <div>
              <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-2">
                Antonim
              </h2>
              <div className="flex flex-wrap gap-2">
                {entry.kont.map((k) => (
                  <Link
                    key={k}
                    href={`/mo/${encodeURIComponent(k)}`}
                    className="inline-block px-3 py-1 rounded-full bg-redht-soft text-redht text-sm hover:bg-redht hover:text-white transition-colors"
                  >
                    {k}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}

      {/* Etymology */}
      {entry.etymology && (
        <section className="bg-paper border border-mist rounded-xl p-4">
          <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-2">
            Etimoloji
          </h2>
          <p className="text-sm sm:text-base text-ink-soft leading-relaxed">
            {entry.etymology}
          </p>
        </section>
      )}
    </article>
  );
}
