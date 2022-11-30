import Head from 'next/head'
import Image from 'next/image'
import {request} from '../lib/datocms'
import { HOME_QUERY, WORK_QUERY} from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'
import TeamCard from '../components/TeamCard'
import WorkList from '../components/WorkList'

export async function getStaticProps() {
  const data = await request({
    query: HOME_QUERY,
  })

  const work = await request({
    query: WORK_QUERY,
  })

  return {
    props: {
      data: data.homePage,
      work: work.allCaseStudies,
    },
  }
}

export default function Home({data, work}) {
  return (
    <>
    <div className='bg-purple'>
      <div className='bg-black text-white rounded-bl-[8rem] md:rounded-bl-[16.5rem]'>
        <Header colour='white'/>
        <Logo url='/ROOT-logo.svg'/>
        <div className='md:grid grid-cols-[1fr_2.5fr] border-t border-white mx-7 xxl:mx-16'>
          <div className='md:border-r border-white pt-10 pr-5 flex flex-col justify-between'>
            <div className='uppercase text-2xl md:text-4xl xxl:text-6xl'>About</div>
            <div className='relative hidden md:block w-full h-[50vh] mb-[72%] mt-10 xxl:w-[90%] xxl:h-[35vh] xxl:mt-20'>
              <Image src={data.aboutImage.url} layout='fill' objectFit='cover' className='rounded-3xl '/>
            </div>
          </div>
          <div className='md:px-10 pt-7 md:pt-10 flex flex-col md:flex-row'>
          <div>
              <div dangerouslySetInnerHTML={{__html: data.aboutHeading }} className='text-2xl md:text-4xl xxl:text-6xl'/>
              <div className='text-lg xxl:text-4xl mt-10 md:mt-20'><Button text='Find out more +' href='/about'  mainColour='border-white hover:bg-white hover:text-black'/></div>
          </div>
          <div className='pt-16 pb-5 md:py-5 self-end'>
              <div className='relative w-[50vw] h-[30vh] md:w-[24vw] md:h-[60vh] md:ml-[-2em]'>
                  <Image src={data.illustration.url} objectFit="contain" objectPosition="center bottom" layout='fill' />
              </div>
          </div>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-purple text-black pt-10 pb-20'>
      <TwoColLayout cols='md:grid-cols-[0.7fr_1.3fr]' border='border-y'>
        <div className='pt-10 pr-10 md:border-r border-black flex flex-col justify-between'>
          <div className='uppercase text-2xl md:text-4xl xxl:text-6xl'>Clients</div>
          <div className='relative h-[50vh] w-auto ml-[5vw] mt-10 xxl:mt-20 hidden md:block'>
            <Image src={data.clientsIllustration.url} layout='fill' objectFit='contain' objectPosition='bottom' className='rounded-3xl'/>
          </div>
        </div>
        <div className='pt-7 md:pt-10 md:pl-20'>
          <div dangerouslySetInnerHTML={{__html: data.clientsIntro}} className='paragraph text-2xl md:text-4xl xxl:text-6xl md:w-3/4 pb-2 md:pb-10'/>
          <Button text='See our clients +' href='/clients' mainColour='border-black hover:bg-black hover:text-purple text-lg md:text-2xl xxl:text-4xl'/>
        </div>
        <div className='md:border-r border-black py-10'>
          <div className='relative h-[35vh] md:h-[50vh] w-auto md:mr-[-15vw]'>
            <Image src={data.clientsImage.url} layout='fill' objectFit='cover' objectPosition='bottom' className='rounded-3xl'/>
          </div>
        </div>
        <div></div>
      </TwoColLayout>
      <div className='mx-7 xxl:mx-16 pt-5'>
        <WorkList work={work}/>
      </div>
    </div>
    <div className='bg-black'>
      <div className='bg-grey pt-14 pb-3 md:pb-8 rounded-bl-[8rem] md:rounded-bl-[16.5rem]'>
        <TwoColLayout cols='grid-cols-2 md:grid-cols-3' border='border-t'>
          <div className='pt-10 border-r border-black'>
            <div className='uppercase text-sm md:text-lg xxl:text-2xl mb-4 xxl:mb-8'>Our Origins</div>
            <div dangerouslySetInnerHTML={{__html: data.ourOrigins }} className='text-xl md:w-2/3 mb-8 xxl:text-6xl xxl:mb-12'/>
            <Button text='Find Out More +' href='/about' mainColour='border-black hover:bg-black hover:text-grey text-xs md:text-base xxl:text-4xl'/>
            <div className='h-[15vh]'></div>
          </div> 
          <div className='pt-10 pl-5 md:border-r border-black'>
            <div className='uppercase text-sm md:text-lg xxl:text-2xl mb-4 xxl:mb-8'>Philosophy</div>
            <div dangerouslySetInnerHTML={{__html: data.philosophy }} className='text-xl md:w-2/3 mb-8 xxl:text-6xl xxl:mb-12'/>
            <Button text='Find Out More +' href='/about' mainColour='border-black hover:bg-black hover:text-grey text-xs md:text-base xxl:text-4xl'/>
          </div>
          <div className='pt-10 md:pl-5 col-span-2 md:col-span-1 border-t border-black md:border-none'>
            <div className='uppercase text-sm md:text-lg xxl:text-2xl mb-4 xxl:mb-8'>SERVICES</div>
            <div dangerouslySetInnerHTML={{__html: data.services }} className='text-xl md:w-2/3 mb-8 xxl:text-6xl xxl:mb-12'/>
            <Button text='Find Out More +' href='/about' mainColour='border-black hover:bg-black hover:text-grey text-xs md:text-base xxl:text-4xl'/>
            <div className='h-[15vh]'></div>
          </div>  
        </TwoColLayout>
        <div className='flex justify-end md:static'>
          <div className='relative mr-5 w-[45vw] md:w-full h-[40vh] md:h-[70vh] mt-[-24vh] pointer-events-none'>
            <Image src={data.illustrationPhil.url} layout='fill' objectFit='contain'/>
          </div>
        </div>
      </div>
    </div>
    <div className='bg-black text-white px-7 xxl:px-16 pt-10 pb-2 md:py-16'>
      <div className='grid grid-cols-[0.5fr_1.5fr] text-xl md:text-4xl xxl:text-6xl xxl:leading-tight xxl:mb-20'>
        <div className='mr-10'>MEET THE TEAM</div>
        <div dangerouslySetInnerHTML={{__html: data.teamIntro}} className='md:w-[45%]'/>
      </div>
      <div className='grid grid-cols-2 md:grid-cols-3 gap-7 md:gap-14 my-10'>
        {data.teamMembers.map((m, i) => (
          <div key={i}>
            <TeamCard image={m.portrait.url} name={m.name} email={m.email} role={m.role} info={m.info} linkedin={m.linkedin}/>
          </div>
        ))}
      </div>
    </div>
    <div className='bg-black px-7 xxl:px-16'>
      <div className='relative w-full h-[35vh] md:h-[95vh] px-7 xxl:px-16'>
          <Image src={data.footerImage.url} objectFit="cover" objectPosition="center bottom" layout='fill' className='rounded-3xl'/>
      </div>
    </div>
    </>
  )
}
