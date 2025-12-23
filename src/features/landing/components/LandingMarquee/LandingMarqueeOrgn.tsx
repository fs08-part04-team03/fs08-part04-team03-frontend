import clsx from 'clsx';

export interface MarqueeItem {
  id: number;
  text: string;
}

interface LandingMarqueeOrgnProps {
  className?: string;
  items: MarqueeItem[];
}

// marquee 각각의 아이템
const getMarqueeItems = (prefix: string, items: MarqueeItem[]) => [
  ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-1-${item.id}` })),
  ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-2-${item.id}` })),
  ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-3-${item.id}` })),
  ...items.map((item) => ({ ...item, uniqueKey: `${prefix}-4-${item.id}` })),
];

// marquee 각각의 카드
const MarqueeCard = ({ text, paddingClass }: { text: string; paddingClass: string }) => (
  <div
    className={clsx(
      'flex shrink-0 items-center justify-center rounded-8 border border-gray-100 bg-white/40 shadow-[0_7px_20px_0_rgba(0,0,0,0.02)] backdrop-blur-[20px]',
      paddingClass
    )}
  >
    <span
      className="
        whitespace-pre-wrap
        text-left
        text-gray-500
        tracking-tight
        text-16
        leading-160"
      style={{
        fontFamily: 'Pretendard',
      }}
    >
      {text}
    </span>
  </div>
);

// marquee 컴포넌트
export const LandingMarqueeOrgn = ({ className, items }: LandingMarqueeOrgnProps) => (
  <section
    className={clsx(
      'relative w-full overflow-hidden',
      'h-[236px]',
      'tablet:h-[190px]',
      'desktop:h-[195.05px]',
      className
    )}
    style={{
      background:
        'linear-gradient(180deg, rgba(255, 255, 255, 0.00) -171.69%, rgba(255, 255, 255, 0.90) 100%)',
    }}
  >
    {/* 모바일: 2줄 */}
    <div className="flex w-full flex-col justify-center gap-16 tablet:hidden h-full">
      {/* 첫번째 줄 */}
      <div className="flex w-full overflow-hidden">
        <div className="animate-marquee flex gap-12 px-6">
          {getMarqueeItems('row1', items).map((item) => (
            <MarqueeCard key={item.uniqueKey} text={item.text} paddingClass="px-24 py-20" />
          ))}
        </div>
      </div>
      {/* 두번째 줄 */}
      <div className="flex w-full overflow-hidden">
        <div
          className="animate-marquee flex gap-12 px-6"
          // 윗 줄과 지그재그로 설정
          style={{ animationDelay: '-2.5s' }}
        >
          {getMarqueeItems(
            'row2',
            // 윗 줄과 카드 내용이 중복되지 않게 설정
            [
              ...items.slice(Math.floor(items.length / 2)),
              ...items.slice(0, Math.floor(items.length / 2)),
            ]
          ).map((item) => (
            <MarqueeCard key={item.uniqueKey} text={item.text} paddingClass="px-24 py-20" />
          ))}
        </div>
      </div>
    </div>

    {/* Tablet/Desktop : 1줄 */}
    <div className="hidden h-full w-full items-center overflow-hidden tablet:flex">
      <div className="animate-marquee flex items-center">
        <div className="flex gap-20 px-10 desktop:gap-40 desktop:px-20">
          {getMarqueeItems('desktop', items).map((item) => (
            <MarqueeCard
              key={item.uniqueKey}
              text={item.text}
              paddingClass="tablet:px-30 tablet:py-24 desktop:p-30"
            />
          ))}
        </div>
      </div>
    </div>
  </section>
);
