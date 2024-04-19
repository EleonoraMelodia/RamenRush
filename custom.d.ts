import { ImgHTMLAttributes } from "react";

declare module 'react' {
  interface ImgHTMLAttributes<T> extends ImgHTMLAttributes<T> {
    src?: string;
    alt?: string;
  }
}
