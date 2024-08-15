import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

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
