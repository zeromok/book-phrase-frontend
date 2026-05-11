import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="border-t border-stone-200 mt-12 px-6 py-6 text-center">
      <nav className="flex justify-center gap-4 text-xs text-stone-500">
        <Link to="/about" className="hover:text-stone-700 transition-colors">
          서비스 소개
        </Link>
        <span className="text-stone-300">·</span>
        <Link to="/privacy" className="hover:text-stone-700 transition-colors">
          개인정보처리방침
        </Link>
        <span className="text-stone-300">·</span>
        <a
          href="mailto:byoung.mokk@gmail.com"
          className="hover:text-stone-700 transition-colors"
        >
          문의
        </a>
      </nav>
      <p className="text-[10px] text-stone-400 mt-3 tracking-widest">
        O:GU — 오늘의 구절
      </p>
    </footer>
  )
}
