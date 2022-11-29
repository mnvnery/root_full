import Image from 'next/image'
import {request} from '../lib/datocms'
import { CONTACT_QUERY, WORK_QUERY, HOME_QUERY } from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'
import WorkList from '../components/WorkList'
import TeamCard from '../components/TeamCard'

export async function getStaticProps() {
    const data = await request({
        query: CONTACT_QUERY,
    })

    const work = await request({
        query: WORK_QUERY,
    })
    const team =  await request({
        query: HOME_QUERY,
    })
    return {
        props: {
        data: data.contactPage,
        work: work.allCaseStudies,
        team: team.homePage,
        },
    }
}

export default function Contact({data, work, team}) {
  console.log(data)
    return (
        <>
            <div className='bg-black text-white'>
                <Header colour='white'/>
                <Logo url='/ROOT-logo.svg'/>
                <TwoColLayout cols='grid-cols-[0.3fr_0.7fr]' border='border-t border-white mb-14'>
                    <div className='pt-10 border-r border-white'>
                        <div className='uppercase text-3xl md:text-4xl'>Contact</div>
                    </div>
                    <div className='pt-10'>
                      <div className='border-b border-white'>
                        <div dangerouslySetInnerHTML={{__html: data.contactIntro}} className='paragraph md:text-3xl md:w-2/4 mb-10 ml-8'/>
                      </div>
                      <div className='flex ml-8 space-x-20 md:text-3xl py-10'>
                        <div dangerouslySetInnerHTML={{__html: data.address}} className='paragraph'/>
                        <div>
                          <div><a href={`tel:${data.phoneNumber}`} className='hover:text-purple'>{data.phoneNumber}</a></div>
                          <div><a href={`mailto:${data.email}`} className='hover:text-purple'>{data.email}</a></div>
                        </div>
                      </div>
                      <div className='ml-8 md:text-3xl'>
                        <div><a href={data.twitterLink} target='_blank' rel='noreferrer' className='hover:text-purple'>Twitter</a></div>
                        <div><a href={data.linkedinLink} target='_blank' rel='noreferrer' className='hover:text-purple'>LinkedIn</a></div>
                        <div><a href={data.instagramLink} target='_blank' rel='noreferrer' className='hover:text-purple'>Instagram</a></div>
                      </div>
                    </div>
                </TwoColLayout>
                <div className='px-7'>
                  <div className='relative w-full h-[95vh]'>
                      <Image src={data.image.url} objectFit="cover" objectPosition="center bottom" layout='fill' className='rounded-3xl'/>
                  </div>
                  
                </div>
            </div>
            <div className='bg-black text-white px-7 pt-16 pb-5'>
              <div className='grid grid-cols-[0.5fr_1.5fr] text-4xl'>
                <div className='mr-10'>MEET THE TEAM</div>
                <div dangerouslySetInnerHTML={{__html: team.teamIntro}} className='w-[45%]'/>
              </div>
              <div className='grid grid-cols-3 gap-14 my-10'>
                {team.teamMembers.map((m, i) => (
                  <div key={i}>
                    <TeamCard image={m.portrait.url} name={m.name} email={m.email} role={m.role} info={m.info} linkedin={m.linkedin}/>
                  </div>
                ))}
              </div>
            </div>
            <div className='bg-black'>
              <div className='relative h-[70vh] w-full'>
                <Image src='/media-doing-good.svg' layout='fill' objectFit='contain'/>
              </div>
            </div>
        </>
    )
}
