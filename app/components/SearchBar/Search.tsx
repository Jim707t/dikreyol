export default function Search({ word = "", large = false }: { word?: string; large?: boolean }) {
    return (
        <div className="flex justify-center w-full">
            <form
                method="get"
                action="/results"
                className={`w-full mx-auto ${large ? "max-w-xl" : "max-w-md"}`}
            >
                <label
                    className={`flex w-full items-center bg-white border border-mist rounded-full shadow-sm
                    focus-within:border-blueht focus-within:ring-2 focus-within:ring-blueht/15 transition-all
                    ${large ? "py-1 pl-2 pr-1.5" : "pl-1.5 pr-1"}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="2"
                        stroke="currentColor"
                        className={`text-ink-soft shrink-0 ${large ? "w-5 h-5 ml-2" : "w-4 h-4 ml-2"}`}
                        aria-hidden="true"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                    </svg>
                    <input
                        name="search"
                        placeholder="Chèche yon mo kreyòl…"
                        autoComplete="off"
                        className={`w-full bg-transparent focus:outline-none placeholder:text-ink-soft/60 placeholder:italic
                        ${large ? "py-3 px-3 text-lg" : "py-2.5 px-3 text-base"}`}
                        defaultValue={word}
                    />
                    <button
                        type="submit"
                        className={`shrink-0 rounded-full bg-blueht text-white font-medium hover:bg-blueht-deep transition-colors
                        ${large ? "px-6 py-2.5 text-base" : "px-4 py-2 text-sm"}`}
                    >
                        Chèche
                    </button>
                </label>
            </form>
        </div>
    )
}
