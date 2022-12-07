import Image from 'next/image'
import {request} from '../lib/datocms'
import { CLIENTS_QUERY, WORK_QUERY} from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'
import WorkList from '../components/WorkList'
import SoftMotion from '../components/SoftMotion'
import RightMotion from '../components/RightMotion'
import LeftMotion from '../components/LeftMotion'

export async function getStaticProps() {
    const data = await request({
        query: CLIENTS_QUERY,
    })

    const work = await request({
        query: WORK_QUERY,
    })

    return {
        props: {
        data: data.clientsPage,
        work: work.allCaseStudies,
        },
    }
}

export default function Clients({data, work}) {
    var cars = data.clientList,
    result = cars.reduce(function (r, a) {
        r[a.startLetter] = r[a.startLetter] || [];
        r[a.startLetter].push(a);
        return r;
    }, Object.create(null));

    for (const [key, value] of Object.entries(result)) {
        console.log(`${key}`);
        const finalValue = value
        for (const [key, value] of Object.entries(finalValue)) {
            console.log(value)
        }
    }
    return (
        <>
        <div className='bg-yellow'>
            <Header colour='black' bgColour='yellow'/>
            <Logo url='/ROOT-logo-orange.svg'/>
            <div className='bg-yellow text-black'>
                <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-10 md:border-r border-black'>
                        <SoftMotion>
                            <div className='uppercase text-3xl md:text-4xl xxl:text-6xl'>Client<br/>Experience</div>
                        </SoftMotion>
                    </div>
                    <div className='pt-10 md:ml-10 xxl:ml-14'>
                        <SoftMotion>
                        <div dangerouslySetInnerHTML={{__html: data.clientsText}} className='paragraph md:text-xl md:w-3/4 mb-20 xxl:text-4xl xxl:leading-tight'/>
                        <div className='columns-2 md:columns-3 md:text-xl xxl:text-4xl xxl:leading-snug'>
                            {
                                Object.entries(result).map(([key, val]) => {
                                    const value = val
                                    console.log(value)
                                    return (
                                    <div key={key} className='inline-block mb-4 xxl:mb-10'>
                                        <div className='border-b border-black mr-5'>{key}</div>
                                        {value.map((entry, i) => (
                                            <div key={i} className='mr-5'>{entry.name}</div>
                                        ))}
                                    </div>
                                    )
                                })
                            }
                            
                        </div>
                        </SoftMotion>
                    </div>
                </TwoColLayout>
                <div className='px-7 xxl:px-16 pb-10 flex justify-end'>
                    <LeftMotion>
                    <div className='relative h-[25vh] w-full md:w-[55vw] md:h-[50vh] mt-10 z-0'>
                        <Image src={data.illustration.url} objectFit="contain" objectPosition="center bottom" layout='fill' />
                    </div>
                    </LeftMotion>
                </div>
            </div>

            
        <div className='bg-black'>
            <div className='bg-grey pb-[30vh] rounded-bl-[8rem]  md:rounded-bl-[16.5rem] pt-14'>
                <div className='mx-7 xxl:mx-16'>
                    <WorkList work={work}/>
                </div>
            </div>
        </div>
        </div>
        </>
    )
}
