import Link from "next/link";

export const metadata = {
  title: "Istwa Lang Kreyòl Ayisyen an — Diksyonè Kreyòl",
  description:
    "Dekouvri istwa rich lang kreyòl ayisyen an: kijan li fèt nan Sen Domeng, wòl li nan revolisyon an, batay pou rekonesans li, ak plas li nan mond lan jodi a.",
};

const timeline = [
  {
    year: "1625–1700",
    title: "Rasin yo nan Sen Domeng",
    text: "Kolon fransè yo tabli nan pati lwès zile a, e yo mennen plizyè santèn milye Afriken nan esklavaj. Moun sa yo soti nan dè dizèn nasyon diferan — moun ki pale fon, ewe, yoruba, kikongo, wolof ak anpil lòt lang — e yo pa t gen okenn lang komen ant yo menm ak kolon yo.",
  },
  {
    year: "1700–1790",
    title: "Yon lang nèf pran nesans",
    text: "Sou plantasyon yo, yon nouvo lang devlope: vokabilè a soti sitou nan fransè epòk la, men gramè a, son yo ak fason pou panse a pote anprent fò lang Afrik de Lwès yo. Lang Taino moun otoktòn yo, panyòl ak pòtigè kite tras yo tou. Nan fen 18yèm syèk la, kreyòl te deja lang majorite moun nan koloni an.",
  },
  {
    year: "1757",
    title: "Premye tèks literè a",
    text: "Powèm « Lisette quitté la plaine », yo atribye a Duvivier de la Mahautière, se youn nan pi ansyen tèks nou konnen ki ekri an kreyòl. Li montre lang lan te gentan rich ase pou pwezi depi nan epòk kolonyal la.",
  },
  {
    year: "1791–1804",
    title: "Lang revolisyon an",
    text: "Se an kreyòl revolisyonè yo te òganize batay ki te fè Ayiti tounen premye repiblik nwa endepandan nan mond lan, 1ye janvye 1804. Se an kreyòl Boukman te lapriyè nan seremoni Bwa Kayiman an, e se an kreyòl mesaj libète a te kouri nan tout plantasyon yo.",
  },
  {
    year: "1804–1950",
    title: "Yon syèk silans ofisyèl",
    text: "Malgre tout pèp la te pale kreyòl, se fransè ki te rete sèl lang leta, lekòl ak tribinal pandan plis pase yon syèk edmi. Kreyòl te viv ak tout fòs li nan kay, nan mache, nan chante, nan kont ak nan pwovèb — men li pa t gen plas ofisyèl.",
  },
  {
    year: "1953–1975",
    title: "Literati kreyòl la pran jarèt",
    text: "Félix Morisseau-Leroy tradui « Antigòn » an kreyòl an 1953 epi li montre lang lan ka pote gwo literati. An 1975, Frankétienne pibliye « Dezafi », premye woman an kreyòl ayisyen — yon moman istorik pou lang lan.",
  },
  {
    year: "1979–1980",
    title: "Yon òtograf ofisyèl",
    text: "Enstiti Pedagojik Nasyonal (IPN) mete sou pye yon òtograf ofisyèl pou kreyòl la, e Lwa 18 septanm 1979 la otorize li nan lekòl. Sistèm sa a senp e fonetik: chak son ekri yon sèl jan. Se li menm nou itilize jodi a, ak 32 grafèm li yo.",
  },
  {
    year: "1982",
    title: "Refòm Bernard la",
    text: "Refòm edikasyon Joseph Bernard la fè kreyòl antre nan sal klas yo kòm lang ansèyman nan premye ane lekòl fondamantal yo — yon premye pa enpòtan, menm si aplikasyon an te rete difisil.",
  },
  {
    year: "1987",
    title: "Konstitisyon an rekonèt kreyòl",
    text: "Atik 5 Konstitisyon 1987 la deklare: « Sèl lang ki simante tout Ayisyen ansanm, se lang kreyòl la. » Kreyòl vin lang ofisyèl bò kote fransè, e Atik 213 la mande pou yo kreye yon akademi pou lang lan.",
  },
  {
    year: "2014",
    title: "Akademi Kreyòl Ayisyen an",
    text: "Akademi Kreyòl Ayisyen an (AKA) resevwa manda li pou pwoteje dwa lengwistik tout Ayisyen, pou ankouraje itilizasyon kreyòl nan edikasyon, epi pou kontinye estandadize òtograf la sou baz alfabè 1979 la.",
  },
  {
    year: "Jodi a",
    title: "Yon lang mondyal",
    text: "Plis pase 12 milyon moun pale kreyòl ayisyen — an Ayiti, men tou nan dyaspora a: Etazini, Kanada, Frans, Repiblik Dominikèn, Chili, Brezil... Kreyòl nan inivèsite, nan radyo, nan teknoloji, sou entènèt. Pwojè tankou diksyonè sa a ap ede lang lan grandi pou jenerasyon k ap vini yo.",
  },
];

export default function IstwaPage() {
  return (
    <div className="flex-1 px-4 sm:px-6 py-10">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-redht font-semibold mb-3">
            Istwa lang lan
          </p>
          <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold mb-5">
            Kreyòl: lang ki fèt nan batay, ki viv nan libète
          </h1>
          <p className="text-ink-soft leading-relaxed max-w-2xl mx-auto text-base sm:text-lg">
            Kreyòl ayisyen se youn nan pi gwo temwayaj rezistans ak kreyativite
            limanite. Nan mitan vyolans esklavaj la, dè santèn milye moun ki pa
            t pale menm lang kreye yon zouti komen — yon lang tou nèf ki pote
            memwa Lafrik, reyalite Karayib la, ak espwa libète.
          </p>
          <div className="tricolor-rule mt-8 max-w-[160px] mx-auto" />
        </div>

        {/* Yon lang, plizyè rasin */}
        <section className="bg-white border border-mist rounded-2xl shadow-sm p-6 sm:p-8 mb-10">
          <h2 className="font-display text-2xl font-bold mb-4">
            Yon lang, plizyè rasin
          </h2>
          <p className="text-ink-soft leading-relaxed mb-4">
            Pifò vokabilè kreyòl la soti nan fransè 17yèm–18yèm syèk la, men
            kreyòl pa yon « fransè mal pale » — se yon lang konplè ak pwòp
            gramè li, pwòp son li, ak pwòp jeni li. Estrikti fraz la, sistèm
            tan vèb yo (« m ap manje », « m te manje », « m pral manje ») ak
            anpil nan fason pou panse a soti nan lang Afrik de Lwès ak Afrik
            Santral yo, tankou fon, ewe ak kikongo.
          </p>
          <p className="text-ink-soft leading-relaxed">
            Lang Taino moun otoktòn zile a kite nou mo tankou{" "}
            <em className="font-display">kasav</em>,{" "}
            <em className="font-display">mabouya</em> ak{" "}
            <em className="font-display">ouragan</em>; panyòl ak anglè pote pa
            yo tou. Chak mo nan diksyonè sa a pote yon ti moso nan vwayaj sa a.
          </p>
        </section>

        {/* Timeline */}
        <section className="relative">
          <h2 className="font-display text-2xl font-bold mb-8 text-center">
            Gran dat yo
          </h2>
          <div className="space-y-0">
            {timeline.map((item, i) => (
              <div key={item.year} className="relative flex gap-5 pb-10 last:pb-0">
                {/* line + dot */}
                <div className="flex flex-col items-center">
                  <span
                    className={`w-3.5 h-3.5 rounded-full shrink-0 mt-1.5 ${
                      i % 2 === 0 ? "bg-blueht" : "bg-redht"
                    }`}
                  />
                  {i < timeline.length - 1 && (
                    <span className="w-px flex-1 bg-mist mt-1" />
                  )}
                </div>
                <div className="pb-2">
                  <p
                    className={`text-sm font-bold tracking-wide mb-1 ${
                      i % 2 === 0 ? "text-blueht" : "text-redht"
                    }`}
                  >
                    {item.year}
                  </p>
                  <h3 className="font-display text-xl font-bold mb-2">
                    {item.title}
                  </h3>
                  <p className="text-ink-soft leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Pwovèb */}
        <section className="bg-blueht text-white rounded-2xl shadow-sm p-6 sm:p-8 mt-12 text-center">
          <p className="font-display text-2xl sm:text-3xl italic mb-3">
            « Pale franse pa di lespri pou sa. »
          </p>
          <p className="text-white/70 text-sm">
            — Pwovèb ayisyen. Sajès pa mache ak lang ou pale, men ak sa ou fè.
          </p>
        </section>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-ink-soft mb-4">
            Istwa a kontinye ap ekri — e ou ka fè pati li.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="px-6 py-2.5 rounded-full bg-blueht text-white font-medium hover:bg-blueht-deep transition-colors"
            >
              Chèche yon mo
            </Link>
            <a
              href="https://add.diksyonekreyol.org"
              className="px-6 py-2.5 rounded-full border border-redht text-redht font-medium hover:bg-redht hover:text-white transition-colors"
            >
              Ajoute yon mo
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
