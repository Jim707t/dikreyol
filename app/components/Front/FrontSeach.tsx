import Search from "../SearchBar/Search";

export default function FrontSeach() {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center text-xl lg:text-2xl">
            <h1 className="lg:text-4xl font-bold mb-8">Diksyone kreyol</h1>
            <Search />
            <a 
                href="/alphabet" 
                className="mt-6 text-gray-600 hover:text-gray-900 text-sm lg:text-base transition-colors"
            >
                Gade alfabè a
            </a>
        </div>
    )
}