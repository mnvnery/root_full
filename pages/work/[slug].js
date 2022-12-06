import { request } from '../../lib/datocms'
import { WORK_QUERY } from '../../lib/queries'
import Image from 'next/image'
import Button from '../../components/Button'
import Link from 'next/link'
import Header from '../../components/Header'
import Logo from '../../components/Logo'
import TwoColLayout from '../../components/TwoColLayout'
import WorkList from '../../components/WorkList'
import SoftMotion from '../../components/SoftMotion'
import RightMotion from '../../components/LeftMotion'
import { motion } from 'framer-motion'



const PROJECTS_QUERY = `{
    allCaseStudies {
        slug
    }
}`

export default function CaseStudy({ data, moreProjects, work }) {
    return (
        <>
        <div className='bg-red'>
            <Header colour='black' bgColour='red'/>
            <Logo url='/ROOT-logo-white.svg'/>
            <div className='bg-red text-black'>
                
                <TwoColLayout cols='md:grid-cols-[0.25fr_0.75fr]' border='border-t'>
                    <div className='border-b md:border-b-0 pt-10 md:border-r border-black text-xl md:text-xl xxl:text-4xl'>
                        <SoftMotion>
                        <div className='uppercase underline mr-5'>{data.client}</div>
                        <div className='uppercase mt-2 mb-10 md:mt-8'>{data.title}</div>
                        </SoftMotion>
                    </div>
                    <div className='pt-10 md:ml-10 text-xl xxl:ml-14'>
                        <SoftMotion>
                        <div className='mb-8 md:text-lg xxl:text-4xl uppercase'>The Challenge</div>
                        <div dangerouslySetInnerHTML={{__html: data.theChallenge}} className='paragraph md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4 mb-10 md:mb-20'/>
                        </SoftMotion>
                    </div>
                </TwoColLayout>
                <div className='mx-7 md:mx-[15vw]'>
                    <SoftMotion>
                    <div className='relative h-[40vh] md:h-[70vh]'>
                        <Image src={data.thumbnail.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                        <div className='text-white absolute bottom-4 left-6'>{data.thumbnailCredit}</div>
                    </div>
                    </SoftMotion>
                </div>
                <TwoColLayout cols='md:grid-cols-[0.25fr_0.75fr]'>
                    <div className='pt-10 md:border-r border-black text-xl md:text-xl xxl:text-4xl'>
                        <div></div>
                    </div>
                    <div className='pb-5 md:pt-10 md:ml-10 xxl:ml-14 text-xl'>
                        <RightMotion>
                            <div className='mb-8 md:text-lg xxl:text-4xl uppercase'>The Ask</div>
                            <div dangerouslySetInnerHTML={{__html: data.theAsk}} className='paragraph md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4'/>
                        </RightMotion>
                    </div>
                </TwoColLayout>
                <div className='grid md:grid-cols-2 mx-7 xxl:mx-16 gap-7 mb-12'>
                    {data.images.slice(0, 2).map((img, i) => (
                        <motion.div 
                        initial={{ y: 100, opacity: 0 }}
                        whileInView={{ y: 0, opacity: 1 }}
                        transition={{ stiffness: 50, duration: 0.7, delay: `0.${i}` }}
                        key={i} className='relative h-[40vh] md:h-[65vh]'>
                            <Image src={img.image.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                            <div className='text-white absolute bottom-4 left-6'>{img.credit}</div>
                        </motion.div>
                    ))}
                </div>
                <TwoColLayout cols='md:grid-cols-[0.5fr_0.5fr]' border='border-t'>
                    <div className='pt-10 md:ml-10 xxl:ml-14 md:border-r border-black text-xl md:text-xl xxl:text-4xl'>
                        <SoftMotion>
                            <div className='mb-8 md:text-lg xxl:text-4xl uppercase'>What We Did</div>
                            <div dangerouslySetInnerHTML={{__html: data.whatWeDid}} className='paragraph pb-4 md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4'/>
                        </SoftMotion>
                    </div>
                    <div className='border-y border-black md:border-y-0 pt-10 md:ml-10 text-xl xxl:ml-14'>
                        <SoftMotion>
                            <div className='mb-8 md:text-lg xxl:text-4xl uppercase'>How we did it</div>
                            <div dangerouslySetInnerHTML={{__html: data.howWeDidIt}} className='paragraph pb-4 md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4'/>
                        </SoftMotion>
                    </div>
                </TwoColLayout>
                <div className='flex justify-between mx-7 xxl:mx-16 py-16 text-2xl xxl:text-4xl'>
                    <Link href={moreProjects[0].slug}><a className='underline'>Previous</a></Link>
                    <Link href={moreProjects[1].slug}><a className='underline'>Next</a></Link>
                </div>
            </div>
            <div className='bg-black'>
                <div className='bg-grey pb-[15vh] md:pb-[30vh] rounded-bl-[8rem] md:rounded-bl-[16.5rem] pt-5 md:pt-14'>
                    <div className='mx-7 xxl:mx-16'>
                        <WorkList work={work}/>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
    }

    export async function getStaticPaths() {
    const projects = await request({
        query: PROJECTS_QUERY,
    })

    return {
        paths: projects.allCaseStudies.map((project) => {
        return {
            params: {
            slug: project.slug,
            },
        }
        }),
        fallback: false,
    }
    }

    export async function getStaticProps({ params }) {
    const data = await request({
        query: WORK_QUERY,
        variables: { slug: params.slug },
    })

    const projects = data.allCaseStudies;

    const currentProject = projects.find((project) => project.slug === params.slug);
    const currentProjectIndex = projects.findIndex((project) => project.slug === params.slug);
    const prevProject = projects[currentProjectIndex - 1] || projects[projects.length - 1];
    const nextProject = projects[currentProjectIndex + 1] || projects[0];

    if (!currentProject) {
        return {
            project: false,
        };
    }

    return {
        props: {
            work: data.allCaseStudies,
            data: currentProject,
            moreProjects: [prevProject, nextProject],
        },
    }
}
