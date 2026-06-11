export default function Footer() {
  return (
    <footer className="mt-auto border-t border-mist bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
        <div className="tricolor-rule mb-4 max-w-[120px] mx-auto" />
        <p className="text-center text-xs text-ink-soft">
          © {new Date().getFullYear()} Diksyonè Kreyòl —{" "}
          <span className="font-display italic">pa pèp la, pou pèp la.</span>
        </p>
      </div>
    </footer>
  );
}
