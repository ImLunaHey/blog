import { createElement } from 'react';

const sizeToInverse = {
  1: 6,
  2: 5,
  3: 4,
  4: 3,
  5: 2,
  6: 1,
};

type TitleProps = { children: React.ReactNode; size?: 1 | 2 | 3 | 4 | 5 | 6 };

export const Title = ({ children, size = 1 }: TitleProps) => {
  return createElement(
    `h${size}`,
    { className: `text-${sizeToInverse[size] - 2 || 1}xl font-extrabold text-white mt-5 mb-2` },
    children,
  );
};
