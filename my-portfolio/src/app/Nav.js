import Link from 'next/link';

export default function Nav() {
  return (
    <nav className="fixed top-0 w-full bg-blue-500 p-4 shadow-md z-10">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-white text-2xl font-bold">Amit Pandit</h1>
        <ul className="flex space-x-6 text-white text-lg">
          <li>
            <Link href="#home" className="hover:underline">Home</Link>
          </li>
          <li>
            <Link href="#projects" className="hover:underline">Projects</Link>
          </li>
          <li>
            <Link href="#articles" className="hover:underline">Articles</Link>
          </li>
          <li>
            <Link href="#contact" className="hover:underline">Contact</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
