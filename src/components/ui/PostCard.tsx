
import { Bed } from 'lucide-react'
import avatar from '../../../public/hero.jpg'
import Image from 'next/image'

export default function PostCard(){

    return (
        <>
            <section className='rounded-xl border shadow-sm group cursor-pointer
            hover:shadow-lg transition-shadow duration-400 ease-in-out'>
                <header className=''>
                    <Image 
                    src={avatar}
                    width={500}
                    height={500}
                    alt='post image'
                    className='w-full rounded-t-xl '/>
                </header>

                <section className='space-y-1 px-3 py-2'>
                    <div>
                        <p className='text-base text-slate-900'>Beach House with Bath</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <div className='inline-flex text-base items-center'>
                          <Bed className='text-slate-400'/> 
                          <p>12</p> 
                        </div>
                        
                    </div>
                </section>
            </section>

            
        </>
    )
}