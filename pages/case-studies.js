import Image from 'next/image'
import {request} from '../lib/datocms'
import { WORK_QUERY} from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'
import Link from 'next/link'
import SoftMotion from '../components/SoftMotion'
import LeftMotion from '../components/LeftMotion'

export async function getStaticProps() {

    const work = await request({
        query: WORK_QUERY,
    })

    return {
        props: {
        work: work.allCaseStudies,
        },
    }
}

export default function CaseStudies({work}) {
    return (
        <>
        <div className='bg-red'>
                <Header colour='black' bgColour='red' />
                <Logo url='/ROOT-logo-white.svg'/>
            <div className='bg-black'>
                <div className='bg-red text-black  rounded-bl-[8rem]  md:rounded-bl-[16.5rem]'>
                    <div className='mx-7 xxl:mx-16'>
                        <div className='uppercase text-3xl md:text-4xl border-t border-black py-10 xxl:text-6xl xxl:py-20'>Case Studies</div>
                    </div>
                    <div className='md:grid grid-cols-2 gap-7 ml-5 mr-[10vw] xxl:mx-16 xxl:gap-12 xxl:mr-[12vw]'>
                    {work.map((proj, i) => (
                        <div key={i} className={`${proj.size === 'medium' ? 'col-span-1' : 'col-span-2'}`}>
                            <SoftMotion>
                            {proj.size === 'medium' 
                            ? <div className='space-y-5 mb-5 md:mb-0 md:space-y-3 xxl:space-y-8'>
                                <div className='relative w-full h-[60vh]'>
                                    <Image src={proj.thumbnail.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                                </div>
                                <div className='rounded-2xl border border-black p-2 w-fit md:w-1/2 hover:bg-white xxl:text-3xl xxl:p-8 xxl:w-[40%]'>
                                <Link href={`/work/${proj.slug}`}>
                                    <a>
                                        <div className='uppercase'>{proj.client}</div>
                                        <div>{proj.title}</div>
                                        <div className='mt-2'>+</div>
                                    </a>
                                </Link>
                                </div>
                            </div>
                            : <div className='space-y-5 mb-5 md:mb-0 md:space-y-0 md:flex md:space-x-5'>
                                <div className='relative w-full h-[60vh]'>
                                    <Image src={proj.thumbnail.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                                </div>
                                <div className='w-fit rounded-2xl border border-black p-2 h-fit hover:bg-white xxl:text-3xl xxl:p-8'>
                                    <Link href={`/work/${proj.slug}`}>
                                        <a>
                                            <div className='uppercase'>{proj.client}</div>
                                            <div>{proj.title}</div>
                                            <div className='mt-2'>+</div>
                                        </a>
                                    </Link>
                                </div>
                            </div>
                            }
                            </SoftMotion>
                        </div>
                    ))}
                    </div>
                    <div className='flex justify-end mx-7 xxl:mx-16 py-10'>
                        <LeftMotion>
                        <div className='relative h-[30vh] md:h-[60vh] w-full md:w-[40vw]'>
                            <Image src='/clients_page.svg' objectFit='contain' layout='fill'/>
                        </div>
                        </LeftMotion>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
}