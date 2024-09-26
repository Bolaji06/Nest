import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

import dayjs from "dayjs"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function fileSizeConversion(size: number): string{
  if (size < 1024){
    return `${size}B`
  }else if (size < 1024 * 1024){
    return `${(size / 1024).toFixed(2)}KB`;
  }else if(size < 1024 * 1024 * 1024){
    return `${(size / 1024 * 1024).toFixed(2)}MB`
  }else if (size < 1024 * 1024 * 1024 * 1024){
    return `${(size / 1024 * 1024 * 1024).toFixed(2)}GB`;
  }else {
    return `${size / 1024 * 1024 * 1024 * 1024}TB`
  }
}

export function convertToCurrency(amount: number){
  const options: Intl.NumberFormatOptions = { style: "currency", currency: "USD" };
  const numberFormat = new Intl.NumberFormat("en-US", options)
  return numberFormat.format(amount);
}

export function formatNumber(price: number){
  if (price >= 1000000){
    return (price / 1000000).toFixed(1) + 'M'
  }else if (price >= 1000){
    return (price / 1000).toFixed(1) + 'K';
  }else {
    return price
  }
}

export function formatDate(timestamp: string){
  const dateToString = dayjs(timestamp).format('MMMM YYYY');
  return dateToString;
}

import relativeTime from 'dayjs/plugin/relativeTime';

// Extend dayjs with the relativeTime plugin
dayjs.extend(relativeTime);

export function timeAgo(timestamp: string): string {
  const now = dayjs();
  const past = dayjs(timestamp);
  
  const diffInSeconds = now.diff(past, 'second');
  const diffInMinutes = now.diff(past, 'minute');
  const diffInHours = now.diff(past, 'hour');
  const diffInDays = now.diff(past, 'day');
  const diffInMonths = now.diff(past, 'month');
  const diffInYears = now.diff(past, 'year');

  if (diffInYears > 0) {
    return `${diffInYears} year${diffInYears > 1 ? 's' : ''} ago`;
  } else if (diffInMonths > 0) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  } else if (diffInDays > 0) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInHours > 0) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInMinutes > 0) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else {
    return `${diffInSeconds} second${diffInSeconds !== 1 ? 's' : ''} ago`;
  }
}
