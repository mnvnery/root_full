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
            <div className='bg-pink text-black rounded-bl-[16.5rem] mb-10'>
                <Header colour='black'/>
                <Logo url='/ROOT-logo-orange.svg'/>
                <TwoColLayout cols='grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-10 border-r border-black'>
                        <div className='uppercase text-3xl md:text-4xl'>About</div>
                    </div>
                    <div className='pt-10 ml-8'>
                        <div className='mb-10 md:text-4xl'>{data.aboutIntro}</div>
                        <div dangerouslySetInnerHTML={{__html: data.about}} className='paragraph md:text-xl md:w-3/4 mb-20'/>
                    </div>
                </TwoColLayout>
                <TwoColLayout cols='grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-10 border-r border-black'>
                        <div className='uppercase text-3xl md:text-4xl'>OUR<br/>ORIGINS</div>
                    </div>
                    <div className='pt-10 ml-8'>
                        <div dangerouslySetInnerHTML={{__html: data.originsText}} className='paragraph md:text-xl md:w-3/4 mb-20'/>
                    </div>
                </TwoColLayout>
                <div className='flex justify-between items-end mt-[-20vh] mx-7 pb-5'>
                    <div className='relative w-[40vw] h-[60vh]'>
                        <Image src={data.originsImage1.url} objectFit='contain' layout='fill'/>
                    </div>
                    <div className='relative w-[25vw] h-[80vh]'>
                        <Image src={data.originsImage2.url} objectFit='contain' layout='fill'/>
                    </div>
                </div>
                <TwoColLayout cols='grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-10 border-r border-black'>
                        <div className='uppercase text-3xl md:text-4xl'>OUR<br/>PHILOSOPHY</div>
                    </div>
                    <div className='pt-10 ml-8'>
                        <div dangerouslySetInnerHTML={{__html: data.philosophyText}} className='paragraph md:text-xl md:w-3/4 mb-20'/>
                    </div>
                </TwoColLayout>
            </div>
            <TwoColLayout cols='grid-cols-[0.3fr_0.7fr]' border='border-t'>
                <div className='pt-10 border-r border-black'>
                    <div className='uppercase text-3xl md:text-4xl'>OUR<br/>SERVICES</div>
                </div>
                <div className='pt-10 ml-8 pb-10'>
                    <div dangerouslySetInnerHTML={{__html: data.servicesText}} className='paragraph md:text-xl md:w-3/4 mb-14'/>
                    <div className='mb-10'>
                    {data.services.map((s, i) => (
                        <div key={i}>{s.title}</div>
                    ))}
                    </div>
                    <Button text='SEE OUR CLIENTS +' href='/clients' mainColour='border-black hover:bg-black hover:text-white'></Button>
                </div>
            </TwoColLayout>
            <div className='px-7 pb-10'>
                <div className='relative w-full h-[95vh]'>
                    <Image src={data.servicesImage.url} objectFit="cover" objectPosition="center bottom" layout='fill' className='rounded-3xl'/>
                </div>
            </div>
            
        </div>
        <div className='bg-black'>
            <div className='bg-grey pb-[30vh] rounded-bl-[16.5rem]'>
                <div className='mx-7'>
                    <WorkList work={work}/>
                </div>
            </div>
        </div>
        </>
    )
}
