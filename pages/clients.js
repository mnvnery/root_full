import Image from 'next/image'
import {request} from '../lib/datocms'
import { CLIENTS_QUERY, WORK_QUERY} from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'
import WorkList from '../components/WorkList'

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
    console.log(data.services)
    return (
        <>
            <div className='bg-yellow text-black'>
                <Header colour='black'/>
                <Logo url='/ROOT-logo-orange.svg'/>
                <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t'>
                    <div className='pt-10 md:border-r border-black'>
                        <div className='uppercase text-3xl md:text-4xl xxl:text-6xl'>Clients</div>
                    </div>
                    <div className='pt-10 md:ml-8 xxl:ml-14'>
                        <div dangerouslySetInnerHTML={{__html: data.clientsText}} className='paragraph md:text-xl md:w-3/4 mb-20 xxl:text-4xl xxl:leading-tight'/>
                        <div className='columns-2 md:columns-3 space-y-2 xxl:text-4xl'>
                            {data.clientList.map((client, i) => (
                                <div key={i}>{client.name}</div>
                            ))}
                        </div>
                    </div>
                </TwoColLayout>
                <div className='px-7 xxl:px-16 pb-10 flex justify-end'>
                    <div className='relative w-[35vw] h-[65vh]'>
                        <Image src={data.illustration.url} objectFit="contain" objectPosition="center bottom" layout='fill' />
                    </div>
                </div>
            </div>

            
        <div className='bg-black'>
            <div className='bg-grey pb-[30vh] rounded-bl-[16.5rem] pt-14'>
                <div className='mx-7 xxl:mx-16'>
                    <WorkList work={work}/>
                </div>
            </div>
        </div>
        </>
    )
}
