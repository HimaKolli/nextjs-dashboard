import Image from 'next/image';
import { lusitana } from '@/app/ui/fonts';


export default function AcmeLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <Image
          src= "/umsct.png"
          width={300}
          height={300}
          alt="UMSCT Logo"
    />
     
    </div>
  );
}
