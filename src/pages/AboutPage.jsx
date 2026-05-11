import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-stone-100">
      <header className="sticky top-0 bg-stone-100/80 backdrop-blur-sm z-10 px-6 py-4 border-b border-stone-200">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-lg font-medium text-stone-700 tracking-tight">
            O:GU <span className="text-stone-400 font-normal text-sm">(오구, 오늘의 구절)</span>
          </Link>
          <Link to="/" className="text-sm text-stone-500 hover:text-stone-700 transition-colors">
            ← 피드로
          </Link>
        </div>
      </header>

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">
        <section>
          <h1 className="text-2xl font-medium text-stone-800 mb-3">O:GU란?</h1>
          <p className="text-stone-600 leading-relaxed">
            O:GU(오구)는 <strong>"오늘의 구절"</strong>의 줄임말로, 책 속의 짧은 문구를
            통해 새로운 책을 발견할 수 있도록 돕는 큐레이션 서비스입니다.
            바쁜 일상 속에서 마음에 닿는 한 줄을 만나고, 그 문장이 담긴 책으로
            자연스럽게 이어지는 경험을 만들고 싶었습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-3">어떻게 만들어지나요?</h2>
          <p className="text-stone-600 leading-relaxed">
            매일 국내 온라인 서점의 베스트셀러와 신간 정보를 살펴, 책의 문맥과
            정서가 잘 드러나는 문구를 한 권당 1~3개 선별합니다. 선별 과정에서는
            도서 카테고리와 문맥을 함께 고려해 <strong>8가지 감정 태그</strong>(쉬고싶다,
            위로받고싶다, 자극받고싶다, 성장하고싶다, 사랑하고싶다, 용기내고싶다,
            몰입하고싶다, 생각하고싶다)로 분류합니다. 단순 발췌가 아니라
            "지금 이 마음에 어울리는 책"을 찾을 수 있도록 큐레이션하는 것이
            서비스의 핵심입니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-3">이용 방법</h2>
          <ul className="text-stone-600 leading-relaxed space-y-2 list-disc list-inside">
            <li>피드를 스크롤하며 그날의 문구들을 만나보세요.</li>
            <li>상단의 감정 태그 필터로 지금 마음 상태에 맞는 문구만 골라 볼 수 있어요.</li>
            <li>마음에 드는 문구를 만나면 책 상세를 열어 알라딘·Yes24에서 구입할 수 있어요.</li>
            <li><strong>Aa</strong> 버튼으로 글자 굵기를 조절할 수 있습니다(저시력 사용자 배려).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-3">저작권에 대하여</h2>
          <p className="text-stone-600 leading-relaxed">
            소개되는 모든 문구의 저작권은 각 저작자와 출판사에 있습니다. O:GU는
            저작권법 제28조에 따른 정당한 범위 내의 인용을 전제로 책을 소개하며,
            발췌량은 책 전체 분량 대비 매우 짧게 유지합니다. 권리자로부터 게재
            중단을 요청받으면 즉시 해당 문구를 삭제합니다. 관련 문의는
            아래 이메일로 연락 주세요.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-3">운영자</h2>
          <p className="text-stone-600 leading-relaxed">
            개인 운영<br />
            문의:{' '}
            <a
              href="mailto:byoung.mokk@gmail.com"
              className="underline hover:text-stone-800"
            >
              byoung.mokk@gmail.com
            </a>
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
