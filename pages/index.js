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
      <div className='bg-black text-white rounded-bl-[16.5rem]'>
        <Header colour='white'/>
        <Logo url='/ROOT-logo.svg'/>
        <div className='grid md:grid-cols-[1fr_2.5fr] border-t border-white mx-7'>
          <div className='border-r border-white pt-10 pr-5 flex flex-col justify-between'>
            <div className='uppercase text-3xl md:text-4xl'>About</div>
            <div className='relative w-full h-[50vh] mb-[72%] mt-10'>
              <Image src={data.aboutImage.url} layout='fill' objectFit='cover' className='rounded-3xl '/>
            </div>
          </div>
          <div className='px-10 pt-10'>
            <div dangerouslySetInnerHTML={{__html: data.aboutHeading }} className='text-3xl md:text-4xl'/>
            <div className='text-2xl mt-10'><Button text='Find out more +' href='/about' secColour='black' mainColour='white'/></div>
          </div>
          <div className='pt-10'></div>
        </div>
      </div>
    </div>
    <div className='bg-purple text-black pt-10 pb-20'>
      <TwoColLayout cols='grid-cols-[0.7fr_1.3fr]' border='border-y'>
        <div className='pt-10 pr-10 border-r border-black flex flex-col justify-between'>
          <div className='uppercase text-3xl md:text-4xl'>Clients</div>
          <div className='relative h-[50vh] w-auto ml-[5vw]'>
            <Image src={data.clientsIllustration.url} layout='fill' objectFit='contain' objectPosition='bottom' className='rounded-3xl'/>
          </div>
        </div>
        <div className='pt-10 pl-20'>
          <div dangerouslySetInnerHTML={{__html: data.clientsIntro}} className='paragraph text-xl h2-text md:w-3/4'/>
          <Button text='See our clients +' href='/clients' mainColour='border-black hover:bg-black hover:text-purple'/>
        </div>
        <div className='border-r border-black py-10'>
          <div className='relative h-[50vh] w-auto mr-[-15vw]'>
            <Image src={data.clientsImage.url} layout='fill' objectFit='cover' objectPosition='bottom' className='rounded-3xl'/>
          </div>
        </div>
        <div></div>
      </TwoColLayout>
      <div className='mx-7 pt-5'>
        <WorkList work={work}/>
      </div>
    </div>
    <div className='bg-black'>
      <div className='bg-grey pt-14 pb-8 rounded-bl-[16.5rem]'>
        <TwoColLayout cols='grid-cols-3' border='border-t'>
          <div className='pt-10 md:border-r border-black'>
            <div className='uppercase text-lg mb-4'>Our Origins</div>
            <div dangerouslySetInnerHTML={{__html: data.ourOrigins }} className='text-3xl w-2/3 mb-8'/>
            <Button text='Find Out More +' href='/about' mainColour='border-black hover:bg-black hover:text-grey'/>
            <div className='h-[15vh]'></div>
          </div> 
          <div className='pt-10 md:pl-5 md:border-r border-black'>
            <div className='uppercase text-lg mb-4'>Philosophy</div>
            <div dangerouslySetInnerHTML={{__html: data.philosophy }} className='text-3xl w-2/3 mb-8'/>
            <Button text='Find Out More +' href='/about' mainColour='border-black hover:bg-black hover:text-grey'/>
          </div>
          <div className='pt-10 md:pl-5'>
            <div className='uppercase text-lg mb-4'>SERVICES</div>
            <div dangerouslySetInnerHTML={{__html: data.services }} className='text-3xl w-2/3 mb-8'/>
            <Button text='Find Out More +' href='/about' mainColour='border-black hover:bg-black hover:text-grey'/>
            <div className='h-[15vh]'></div>
          </div>  
        </TwoColLayout>
        <div className='relative w-full h-[70vh] mt-[-24vh] pointer-events-none'>
          <Image src={data.illustrationPhil.url} layout='fill' objectFit='contain'/>
        </div>
      </div>
    </div>
    <div className='bg-black text-white px-7 py-16'>
      <div className='grid grid-cols-[0.5fr_1.5fr] text-4xl'>
        <div className='mr-10'>MEET THE TEAM</div>
        <div dangerouslySetInnerHTML={{__html: data.teamIntro}} className='w-[45%]'/>
      </div>
      <div className='grid grid-cols-3 gap-14 my-10'>
        {data.teamMembers.map((m, i) => (
          <div key={i}>
            <TeamCard image={m.portrait.url} name={m.name} email={m.email} role={m.role} info={m.info} linkedin={m.linkedin}/>
          </div>
        ))}
      </div>
    </div>
    <div className='bg-black px-7'>
      <div className='relative w-full h-[95vh] px-7'>
          <Image src={data.footerImage.url} objectFit="cover" objectPosition="center bottom" layout='fill' className='rounded-3xl'/>
      </div>
    </div>
    </>
  )
}
