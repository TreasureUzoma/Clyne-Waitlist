import Link from "next/link"

export const Header = () => {
  return (
    <header>
      <div className="fixed top-0 left-0 right-0 bg-transparent z-30 bg-opacity-60 backdrop-filter backdrop-blur-md">
        <div className="mx-auto p-5 flex items-center justify-between">
          <Link href="/" className="font-bold text-lg md:text-xl text-purple">
            Clyne
          </Link>
        </div>
      </div>
    </header>
  );
}
