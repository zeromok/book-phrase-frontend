import { Link } from 'react-router-dom'
import Footer from '../components/Footer'

export default function PrivacyPage() {
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

      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8 text-stone-600 leading-relaxed">
        <section>
          <h1 className="text-2xl font-medium text-stone-800 mb-3">개인정보처리방침</h1>
          <p className="text-sm text-stone-500">시행일: 2026년 5월 11일</p>
          <p className="mt-4">
            O:GU(이하 "서비스")는 이용자의 개인정보를 소중히 다루며, 「개인정보
            보호법」 등 관련 법령을 준수합니다. 본 방침은 서비스가 어떤 정보를
            수집·이용하는지, 제3자에게 어떻게 전달되는지를 안내합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-2">1. 수집하는 정보</h2>
          <p>
            서비스는 회원가입 없이 이용할 수 있으며, 이용자의 이름·이메일·전화번호 등
            개인 식별 정보를 직접 수집하지 않습니다. 다만 아래 정보가 자동으로
            수집될 수 있습니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>접속 로그, IP 주소, 브라우저 종류 및 OS, 방문 기록</li>
            <li>로컬 저장소(localStorage)에 저장되는 환경설정 값 (예: 글자 굵기)</li>
            <li>피드백 폼을 통해 자발적으로 제공한 의견(Tally 제공)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-2">2. 이용 목적</h2>
          <ul className="list-disc list-inside space-y-1">
            <li>서비스 운영 및 개선 (오류 분석, 기능 사용성 점검)</li>
            <li>이용 통계 분석</li>
            <li>맞춤형 광고 게재(아래 3항 참조)</li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-2">3. 제3자 광고 및 쿠키</h2>
          <p>
            본 서비스는 <strong>Google AdSense</strong>를 통해 광고를 게재합니다.
            Google 등 제3자 광고 사업자는 이용자의 관심사에 기반한 광고를 제공하기
            위해 쿠키(또는 익명 식별자)를 사용할 수 있으며, 이를 통해 이용자가
            본 사이트 및 다른 사이트를 방문한 정보를 수집·이용할 수 있습니다.
          </p>
          <ul className="list-disc list-inside mt-2 space-y-1">
            <li>
              Google이 광고에 쿠키를 사용하는 방식:{' '}
              <a
                href="https://policies.google.com/technologies/ads"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-stone-800"
              >
                policies.google.com/technologies/ads
              </a>
            </li>
            <li>
              개인 맞춤 광고를 원하지 않으면 Google 광고 설정에서 비활성화할 수
              있습니다:{' '}
              <a
                href="https://adssettings.google.com"
                target="_blank"
                rel="noreferrer"
                className="underline hover:text-stone-800"
              >
                adssettings.google.com
              </a>
            </li>
            <li>
              브라우저에서 직접 쿠키를 거부하거나 삭제하실 수도 있습니다.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-2">4. 정보의 보관 및 파기</h2>
          <p>
            서비스가 직접 수집·보관하는 개인 식별 정보는 없습니다. 자동
            수집되는 접속 로그는 통계 목적 외 별도 분석이나 제3자 제공에
            이용되지 않으며, 보관 기간이 지나면 파기됩니다. 피드백 폼으로
            받은 의견은 회신 또는 서비스 개선 목적에 한해 사용한 뒤 파기합니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-2">5. 이용자 권리</h2>
          <p>
            이용자는 본인의 정보에 대해 열람·정정·삭제·처리 정지를 요구할 수
            있으며, 아래 이메일로 요청 시 지체 없이 처리하겠습니다.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-2">6. 책임자 및 연락처</h2>
          <p>
            개인정보보호 책임자: O:GU 운영자<br />
            이메일:{' '}
            <a
              href="mailto:byoung.mokk@gmail.com"
              className="underline hover:text-stone-800"
            >
              byoung.mokk@gmail.com
            </a>
          </p>
        </section>

        <section>
          <h2 className="text-lg font-medium text-stone-800 mb-2">7. 방침 변경</h2>
          <p>
            본 방침이 변경될 경우 본 페이지를 통해 사전에 공지합니다. 중요한
            변경이 있을 때는 시행일을 함께 표기합니다.
          </p>
        </section>
      </main>

      <Footer />
    </div>
  )
}
