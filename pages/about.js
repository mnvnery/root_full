import Image from 'next/image'
import {request} from '../lib/datocms'
import { ABOUT_QUERY, WORK_QUERY} from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'
import WorkList from '../components/WorkList'

export async function getStaticProps() {
    const data = await request({
        query: ABOUT_QUERY,
    })

    const work = await request({
        query: WORK_QUERY,
    })

    return {
        props: {
        data: data.aboutPage,
        work: work.allCaseStudies,
        },
    }
}

export default function About({data, work}) {
    return (
        <>
        <div className='bg-grey'>
            <div className='bg-pink text-black rounded-bl-[8rem] md:rounded-bl-[16.5rem] mb-10'>
                <Header colour='black'/>
                <Logo url='/ROOT-logo-orange.svg'/>
                <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-5 md:pt-10 md:border-r border-black'>
                        <div className='uppercase text-xl md:text-4xl xxl:text-6xl'>About</div>
                    </div>
                    <div className='pt-8 md:pt-10 md:ml-8 xxl:ml-14'>
                        <div className='mb-10 text-3xl md:text-4xl xxl:text-6xl'>{data.aboutIntro}</div>
                        <div dangerouslySetInnerHTML={{__html: data.about}} className='paragraph text-lg md:columns-2 md:text-xl xxl:text-4xl xxl:leading-tight md:w-[78%] xxl:mt-20 mb-10 md:mb-20'/>
                        <div className='relative w-full h-[35vh] md:w-[90%] md:h-[70vh] xxl:h-[60vh] mb-10'>
                            <Image src={data.servicesImage.url} objectFit="cover" objectPosition="center bottom" layout='fill' className='rounded-3xl'/>
                        </div>
                    </div>
                </TwoColLayout>
                <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-5 md:pt-10 md:border-r border-black'>
                        <div className='uppercase text-xl md:text-4xl xxl:text-6xl'>OUR<br/>ORIGINS</div>
                    </div>
                    <div className='pt-8 md:pt-10 md:ml-8 xxl:ml-14'>
                        <div dangerouslySetInnerHTML={{__html: data.originsText}} className='paragraph text-lg md:text-xl xxl:text-4xl xxl:leading-tight md:w-3/4 xxl:w-2/3 mb-10 md:mb-20'/>
                    </div>
                </TwoColLayout>
                <div className='flex justify-between items-end md:mt-[-20vh] mx-7 xxl:mx-16 pb-5'>
                    <div className='relative w-full md:w-[40vw] h-[38vh] md:h-[60vh]'>
                        <Image src={data.originsImage1.url} objectFit='contain' layout='fill'/>
                    </div>
                    <div className='relative w-[25vw] h-[80vh] hidden md:block'>
                        <Image src={data.originsImage2.url} objectFit='contain' layout='fill'/>
                    </div>
                </div>
                <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-5 md:pt-10 md:border-r border-black'>
                        <div className='uppercase text-xl md:text-4xl xxl:text-6xl'>OUR<br/>PHILOSOPHY</div>
                    </div>
                    <div className='pt-8 md:pt-10 md:ml-8 xxl:ml-14'>
                        <div dangerouslySetInnerHTML={{__html: data.philosophyText}} className='paragraph text-lg md:text-xl xxl:text-4xl xxl:leading-tight  md:w-3/4 xxl:w-2/3 mb-20'/>
                    </div>
                </TwoColLayout>
            </div>
            <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t'>
                <div className='pt-10 md:border-r border-black'>
                    <div className='uppercase text-xl md:text-4xl xxl:text-6xl'>OUR<br/>SERVICES</div>
                </div>
                <div className='pt-10 md:ml-8 xxl:ml-14 pb-10 xxl:pb-20'>
                    <div dangerouslySetInnerHTML={{__html: data.servicesText}} className='paragraph text-lg md:text-xl xxl:text-4xl xxl:leading-tight md:w-3/4 xxl:w-2/3 mb-14'/>
                    <div className='mb-10 xxl:text-4xl xxl:leading-snug'>
                    {data.services.map((s, i) => (
                        <div key={i}>{s.title}</div>
                    ))}
                    </div>
                    <Button text='SEE OUR CLIENTS +' href='/clients' mainColour='border-black hover:bg-black hover:text-white xxl:text-4xl xxl:my-10'></Button>
                </div>
            </TwoColLayout>
            <div className='px-7 xxl:px-16 pb-10 xxl:pb-20'>
                <div className='relative w-full h-[40vh] md:h-[95vh] xxl:h-[80vh]'>
                    <Image src={data.servicesImage.url} objectFit="cover" objectPosition="center bottom" layout='fill' className='rounded-3xl'/>
                </div>
            </div>
            
        </div>
        <div className='bg-black mt-[-5px]'>
            <div className='bg-grey pb-[30vh] rounded-bl-[16.5rem]'>
                <div className='mx-7 xxl:mx-16'>
                    <WorkList work={work}/>
                </div>
            </div>
        </div>
        </>
    )
}
