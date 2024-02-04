import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function stringToColor(str: string) {
  const colorList = [
    '#FF5733',
    '#33FF57',
    '#5733FF',
    '#FF33A1',
    '#33A1FF',
    '#A1FF33',
    '#FFC133',
    '#C133FF',
    '#33FFC1',
    '#C1FF33',
    '#FF336E',
    '#336EFF',
    '#EFFF33',
    '#33EFFF',
    '#F19B1E',
    '#FFB6C1',
    '#DC143C',
    '#9932CC',
  ];

  const hash = str.split('').reduce((acc, char) => {
    return char.charCodeAt(0) + ((acc << 5) - acc);
  }, 0);

  const index = Math.abs(hash) % colorList.length;

  return colorList[index];
}
