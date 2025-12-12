'use client';

import { useState } from 'react';
import Image from 'next/image';
import { IconButton } from '@/components/atoms/IconButton/IconButton';
import { Divider } from '@/components/atoms/Divider/Divider';
import { clsx } from '@/utils/clsx';

interface AccordionPanelProps {
  label: string;
  content?: string;
  subContent?: string;
  className?: string;
}

const AccordionPanel = ({ label, content, subContent, className }: AccordionPanelProps) => {
  const [open, setOpen] = useState(false);

  const toggle = () => setOpen((prev) => !prev);

  return (
    <div
      className={clsx(
        `
        w-328
        tablet:w-496
        desktop:w-610
      `,
        className
      )}
    >
      {/* Row */}
      <div
        className="
          w-full
          py-30
          tablet:py-40
          desktop:py-40
        "
      >
        <div className="flex items-center h-20">
          <div
            className="
              text-gray-950 
              font-suit 
              text-16 font-700 tracking--0.4
              tablet:text-18 tablet:tracking--0.45
              desktop:text-18 desktop:tracking--0.45
              mb-6
            "
          >
            {label}
          </div>

          <div className="flex-1" />

          <IconButton variant="default" size="md" onClick={toggle} className="cursor-pointer">
            <Image
              src={open ? '/icons/minus.svg' : '/icons/plus.svg'}
              alt={open ? 'minus' : 'plus'}
              width={20}
              height={20}
            />
          </IconButton>
        </div>

        {/* Content */}
        {open && (
          <>
            {/* Tablet 이상에서는 content + subContent 한 줄 */}
            <div
              className="
                mt-6
                tablet:flex tablet:flex-row tablet:items-center tablet:gap-6
                desktop:flex desktop:flex-row desktop:items-center desktop:gap-6
              "
            >
              {/* content */}
              <div
                className="
                  text-gray-600
                  font-suit
                  text-14 font-400 tracking--0.35
                  tablet:text-16 tablet:tracking--0.4
                  desktop:text-16 desktop:tracking--0.4
                "
              >
                {content}
              </div>

              {/* subContent */}
              <div
                className="
                  text-gray-400
                  font-suit
                  text-14 font-400 tracking--0.35
                  tablet:text-16 tablet:tracking--0.4
                  desktop:text-16 desktop:tracking--0.4
                  mt-6
                  tablet:mt-0
                  desktop:mt-0
                "
              >
                {subContent}
              </div>
            </div>
          </>
        )}
      </div>

      {/* Divider */}
      <Divider />
    </div>
  );
};

export default AccordionPanel;
