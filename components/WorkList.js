import Button from "./Button"
import Image from "next/image"
import { useState, useEffect } from "react"
import Link from "next/link"

const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({x: 0, y: 0})
    useEffect(() => {
        const updateMousePosition = event => {
            setMousePosition({x: event.clientX, y: event.clientY})
        }
        window.addEventListener('mousemove', updateMousePosition);
        return () => window.removeEventListener('mousemove', updateMousePosition)
    }, [])
    return mousePosition
}

const WorkList = ({work}) => {
    const [activeIndex, setActiveIndex] = useState(-1)
    const {x, y} = useMousePosition();
    
    return (
        <>
        <div className='text-lg pt-5 pb-5 xxl:text-3xl xxl:pb-8 xxl:py-8'>OUR WORK</div>
        <div className='relative mb-10'>
            {work.map((w, i) => (
                <Link href={`/work/${w.slug}`} key={i}><div  onMouseEnter={()=>setActiveIndex(i)} onMouseLeave={()=>setActiveIndex(-1)}  className='relative cursor-pointer uppercase text-xl md:text-4xl xxl:text-6xl border-b border-black grid grid-cols-[0.02fr_1fr] items-center hover:text-white last:border-b-0 py-1 xxl:py-2'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 9.56 9.12" className='w-3 md:w-3 xxl:w-5 mr-3'><path fill="black" d="M9.56,2.46h0c0-1.35-1.11-2.46-2.46-2.46H0V9.12H.22c2,0,3.62-1.63,3.61-3.63h0s.02,3.59,5.4,3.63V4.92s-1.92,2.18-5.35,0h3.22c1.35,0,2.46-1.11,2.46-2.46Zm-3.85,.1c0,1.03-.84,1.87-1.87,1.87h0V.34h0c1.03,0,1.87,.84,1.87,1.87v.35Z"/></svg><div className="relative hover:z-10">{w.title}</div></div></Link> 
            ))}
        </div>
        <div  className="fixed top-0 left-0 w-full h-full pointer-events-none">
            {work.map((w, i) => {
                const isActive = i === activeIndex;
                const xPos = isActive ? x: 0;
                const yPos = isActive ? y: 0;
                return (
                <div key={i} className={`transform translate-x-[${xPos}px] translate-y-[${yPos}px] absolute w-[25vw] h-[20vh] md:h-[45vh] xxl:h-[40vh] object-contain pointer-events-none ${isActive ?  'opacity-1 z-0' : 'opacity-0'}`} style={{ transform: `translate(${xPos}px, ${yPos}px)`}}>
                    <Image src={w.thumbnail.url} layout='fill' objectFit='cover' className="rounded-2xl"/>
                </div>
                )
            })}
        </div>
        <div className='text-lg md:text-xl xxl:text-4xl'><Button href='/case-studies' text='See our work +' mainColour='border-black hover:bg-black hover:text-white'/></div>
        </>
    )
}
export default WorkList