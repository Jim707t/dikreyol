import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { supabaseServer } from "../../components/dbServer";
import Entry, { WordEntry, WordChip } from "../../components/Entry/Entry";
import Search from "../../components/SearchBar/Search";

// Re-generate each word page at most once per hour
export const revalidate = 3600;

type Props = { params: Promise<{ word: string }> };

async function getEntry(raw: string): Promise<WordEntry | null> {
  const word = decodeURIComponent(raw).trim();
  const { data } = await supabaseServer
    .from("words")
    .select("*")
    .eq("approved", true)
    .ilike("word", word)
    .limit(1);
  return (data && data[0]) || null;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { word } = await params;
  const entry = await getEntry(word);
  if (!entry) {
    return { title: "Mo pa jwenn — Diksyonè Kreyòl", robots: { index: false } };
  }

  const desc = (entry.def || "").slice(0, 155);
  return {
    title: `${entry.word} — Definisyon, Sinonim ak Egzanp an Kreyòl`,
    description: `${entry.word}: ${desc}`,
    keywords: [
      entry.word,
      `${entry.word} definisyon`,
      `${entry.word} sinonim`,
      `${entry.word} kreyòl`,
      `${entry.word} meaning haitian creole`,
      `${entry.word} définition créole haïtien`,
    ],
    alternates: { canonical: `/mo/${encodeURIComponent(entry.word)}` },
    openGraph: {
      title: `${entry.word} — Diksyonè Kreyòl`,
      description: desc,
      type: "article",
      url: `/mo/${encodeURIComponent(entry.word)}`,
    },
  };
}

export default async function WordPage({ params }: Props) {
  const { word } = await params;
  const entry = await getEntry(word);
  if (!entry) notFound();

  // A few related words for internal linking (helps SEO + discovery)
  const { data: related } = await supabaseServer
    .from("words")
    .select("id, word")
    .eq("approved", true)
    .neq("id", entry.id)
    .limit(12);

  // Structured data: this entry as a dictionary term
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "DefinedTerm",
    name: entry.word,
    description: entry.def,
    inLanguage: "ht",
    url: `https://diksyonekreyol.org/mo/${encodeURIComponent(entry.word)}`,
    inDefinedTermSet: {
      "@type": "DefinedTermSet",
      name: "Diksyonè Kreyòl",
      url: "https://diksyonekreyol.org",
    },
  };

  return (
    <div className="flex-1 w-full">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="max-w-3xl mx-auto px-4 sm:px-6 py-8">
        <Search word={entry.word} />

        <div className="mt-8 space-y-6">
          <Entry entry={entry} />

          {related && related.length > 0 && (
            <div className="bg-white border border-mist rounded-2xl p-6">
              <h2 className="text-xs uppercase tracking-widest text-ink-soft font-semibold mb-3">
                Kontinye eksplore
              </h2>
              <div className="flex flex-wrap gap-2">
                {related.map((w) => (
                  <WordChip key={w.id} word={w.word} />
                ))}
              </div>
            </div>
          )}

          <p className="text-center text-sm text-ink-soft">
            <Link href="/alphabet" className="hover:text-blueht transition-colors">
              Gade tout mo yo nan alfabè a →
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
