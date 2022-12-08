import { useState } from 'react'
import Link from 'next/link'
import headerNavLinks from '../data/headerNavLinks'
import siteMetadata from '../data/siteMetadata'
import Image from 'next/image'
import { motion } from 'framer-motion'

const MobileNav = ({colour}) => {
  const [navShow, setNavShow] = useState(false)

  const onToggleNav = () => {
    setNavShow((status) => {
      if (status) {
        document.body.style.overflow = 'auto'
      } else {
        // Prevent scrolling
        document.body.style.overflow = 'hidden'
      }
      return !status
    })
  }

  const variants = {
    open: {
      transition: { staggerChildren: 0.07, delayChildren: 0 },
    },
    closed: {
      transition: { staggerChildren: 0.05, staggerDirection: -1 },
    },
  }
  const item = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        y: { stiffness: 1000, velocity: -100 },
      },
    },
    closed: {
      x: 400,
      opacity: 1,
      transition: {
        y: { stiffness: 1000 },
      },
    },
  }

  return (
    <div>
      <button
        type="button"
        className="ml-1 mr-1 h-8 w-8 rounded py-1"
        aria-label="Toggle Menu"
        onClick={onToggleNav}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className={`text-${colour}
          `}
        >
          <path
            fillRule="evenodd"
            d="M 0 5 a 0 1 0 0 1 0 -1 h 25 a 0 1 0 1 1 0 1 H 0 z M 0 10 a 0 1 0 0 1 0 -1 h 25 a 0 1 0 1 1 0 1 H 0 z M 0 15 a 0 1 0 0 1 0 -1 h 25 a 0 1 0 1 1 0 1 H 0 z"
            clipRule="evenodd"
          />
        </svg>
      </button>
      <div
        className={`fixed top-0 left-0 z-20 h-full w-full transform duration-500 ease-in-out bg-red flex flex-col justify-between ${
          navShow ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between mx-6 py-6 border-b border-black mb-5 xxl:mx-16">
          <Link href="/" className="w-3/5 md:w-1/4" onClick={onToggleNav}>
            <div className="relative w-7 h-12">
              <Image src={'/small_logo_black.svg'} layout='fill' objectFit='contain' />
            </div>
          </Link>
          <button
            type="button"
            className="mt-3 h-8 w-8 "
            aria-label="Toggle Menu"
            onClick={onToggleNav}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              height="25"
              viewBox="0 0 55 55"
              overflow="visible"
              stroke="black"
              strokeWidth="3"
            >
              <line x2="50" y2="50" />
              <line x1="50" y2="50" />
            </svg>
          </button>
        </div>
          <motion.div initial={false} animate={navShow ? 'open' : 'closed'} variants={variants}>
            {headerNavLinks.map((link) => (
              <motion.div variants={item} key={link.title}>
                <Link
                  href={link.href}
                >
                  <a onClick={onToggleNav}>
                  <div
                    className={`px-4 py-1 2xl:py-10 text-black hover:text-white text-5xl text-center tracking-tight md:text-7xl xxl:text-9xl xxl:py-5`}
                  >
                    {link.title}
                  </div>
                  </a>
                </Link>
              </motion.div>
            ))}
            </motion.div>
            <div className="flex justify-between md:grid grid-cols-3 items-center border-t border-black text-black my-8 mx-6 pt-4 xxl:mx-16 xxl:text-3xl xxl:pt-6">
                <div className='hidden md:block'>HELPING THOSE <br/>
                THAT DO GOOD, DO BETTER.</div>
                <div className='relative w-24 md:w-full h-14 xxl:h-28'>
                  <Image src='/media_doing_good.svg' layout='fill' objectFit='contain'/>
                </div>
                <div className='justify-self-end'><a href={`mailto:${siteMetadata.email}`}><div className='border border-black px-3 inline-block rounded-lg'>GET IN TOUCH</div></a></div>
            </div>

      </div>
    </div>
  )
}

export default MobileNav
