import Image from 'next/image'
import {request} from '../lib/datocms'
import { CONTACT_QUERY, WORK_QUERY, HOME_QUERY } from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'
import WorkList from '../components/WorkList'
import TeamCard from '../components/TeamCard'
import SoftMotion from '../components/SoftMotion'
import {motion} from 'framer-motion'
import LeftMotion from '../components/LeftMotion'
import siteMetadata from '../data/siteMetadata'

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
    return (
        <>
        <div className='bg-black'>
            <Header colour='white' bgColour='black'/>
            <Logo url='/ROOT-logo.svg'/>
            <div className='bg-black text-white'>
                
                <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t border-white mb-14'>
                    <div className='pt-10 md:border-r border-white'>
                      <SoftMotion>
                        <div className='uppercase text-3xl md:text-4xl xxl:text-6xl'>Contact</div>
                      </SoftMotion>
                    </div>
                    <div className='pt-10'>
                      <div className='border-b border-white'>
                      <SoftMotion>
                        <div dangerouslySetInnerHTML={{__html: data.contactIntro}} className='paragraph text-lg md:text-3xl xxl:text-5xl xxl:leading-tight md:w-2/4 mb-10 md:ml-10 xxl:ml-14'/>
                      </SoftMotion>
                      </div>
                      <div className='flex md:ml-10 xxl:ml-14 md:space-x-20 text-lg md:text-3xl xxl:text-5xl xxl:leading-tight pt-8 pb-3 md:py-10'>
                        <SoftMotion>
                        <div dangerouslySetInnerHTML={{__html: data.address}} className='paragraph'/>
                        <div>
                          <div><a href={`tel:${data.phoneNumber}`} className='hover:text-purple'>{data.phoneNumber}</a></div>
                          <div><a href={`mailto:${data.email}`} className='hover:text-purple'>{data.email}</a></div>
                        </div>
                        </SoftMotion>
                      </div>
                      <div className='border-t border-white md:border-t-0 pt-8 md:pt-0 md:ml-10 xxl:ml-14 text-lg md:text-3xl xxl:text-5xl xxl:leading-tight'>
                        <SoftMotion>
                        <div><a href={data.twitterLink} target='_blank' rel='noreferrer' className='hover:text-purple'>Twitter</a></div>
                        <div><a href={data.linkedinLink} target='_blank' rel='noreferrer' className='hover:text-purple'>LinkedIn</a></div>
                        <div><a href={data.instagramLink} target='_blank' rel='noreferrer' className='hover:text-purple'>Instagram</a></div>
                        </SoftMotion>
                      </div>
                      
                    </div>
                </TwoColLayout>
                <div className='px-7 xxl:px-16'>
                  <SoftMotion>
                  <div className='relative w-full h-[35vh] md:h-[95vh]'>
                      <Image src={data.image.url} objectFit="cover" objectPosition="center bottom" layout='fill' className='rounded-3xl'/>
                  </div>
                  </SoftMotion>
                  
                </div>
            </div>
            <div className='bg-black text-white px-7 xxl:px-16 pt-16 pb-5'>
                  <div className='grid grid-cols-[0.5fr_1.5fr] text-xl md:text-4xl xxl:text-6xl xxl:leading-tight xxl:mb-20'>
                    <div className='mr-10'>MEET THE TEAM</div>
                    <div dangerouslySetInnerHTML={{__html: team.teamIntro}} className='md:w-[45%]'/>
                  </div>
                  <div className='grid grid-cols-2 md:grid-cols-3 gap-7 md:gap-14 my-10'>
                    {team.teamMembers.map((m, i) => (
                      <div key={i}>
                        <motion.div
                          initial={{ y: 100, opacity: 0 }}
                          whileInView={{ y: 0, opacity: 1 }}
                          transition={{ stiffness: 50, duration: 0.7, delay: `0.${i}` }}
                        >
                          <TeamCard image={m.portrait.url} name={m.name} email={m.email} role={m.role} info={m.info} linkedin={m.linkedin}/>
                        </motion.div>
                      </div>
                    ))}
                  </div>
                  <a href={`mailto:${siteMetadata.email}`}><div className='md:text-2xl xxl:text-4xl mb-10 border border-white rounded-xl hover:bg-white hover:text-black xxl:rounded-3xl uppercase inline-block px-3 py-2 xxl:px-8 xxl:py-6'>GET IN TOUCH +</div></a>
            </div>
            <div className='bg-black'>
              <LeftMotion>
              <div className='relative h-[30vh] md:h-[70vh] w-[90%] mx-auto md:w-full'>
                <Image src='/media-doing-good.svg' layout='fill' objectFit='contain'/>
              </div>
              </LeftMotion>
            </div>
        </div>
        </>
    )
}
