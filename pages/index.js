import Head from 'next/head'
import Image from 'next/image'

export default function Home() {
  return (
    <div className='min-h-screen text-lg md:text-base xxl:text-3xl flex flex-col items-center md:justify-between py-10 md:px-10'>
      <div className='flex flex-col items-center md:flex-row md:justify-between w-full'>
        <div className='space-x-8 hidden md:flex'>
          <a href='mailto:hello@rootmedia.co.uk' className='underline'>EMAIL</a>
          <a href='https://twitter.com/wearerootmedia' target='_blank' rel="noreferrer" className='underline'>TWITTER</a>
          <a href='https://www.linkedin.com/company/root-media/' target='_blank' rel="noreferrer" className='underline'>LINKEDIN</a>
        </div>
        <div className='relative w-28 h-10 md:hidden'>
        <Image src={'/logo.svg'} layout='fill' objectFit='contain' alt='logo'/>
        </div>
        <div className='text-center pt-2'>NEW WEBSITE COMING SOON</div>
      </div>
      <div className='my-24 relative h-[35vh] w-[85vw] md:w-[50vw] md:h-[70vh] md:my-0'>
      <Image src={'/root_gif.gif'} objectFit='contain' layout='fill' alt='Logo Gif' />
      </div>
      <div className='block md:flex md:justify-between md:w-full md:items-center'>
        <div className='relative w-28 h-10 hidden md:block xxl:w-40 xxl:h-20'>
          <Image src={'/logo.svg'} layout='fill' objectFit='contain' alt='logo' />
        </div>
        <a href="/CrisisCaseStudy.pdf" alt="alt text" target="_blank" rel="noopener noreferrer"><div className='border border-black rounded-full text-center inline-block px-4 py-1 md:py-2 underline uppercase'>Download Case Study</div></a>
      </div>
      <div className='flex space-x-8 my-10 md:hidden'>
        <a href='mailto:hello@rootmedia.co.uk' className='underline'>EMAIL</a>
        <a href='https://twitter.com/wearerootmedia' target='_blank' rel="noreferrer" className='underline'>TWITTER</a>
        <a href='https://www.linkedin.com/company/root-media/' target='_blank' rel="noreferrer" className='underline'>LINKEDIN</a>
      </div>
    </div>
  )
}
