import { request } from '../../lib/datocms'
import { WORK_QUERY } from '../../lib/queries'
import Image from 'next/image'
import Button from '../../components/Button'
import Link from 'next/link'
import Header from '../../components/Header'
import Logo from '../../components/Logo'
import TwoColLayout from '../../components/TwoColLayout'
import WorkList from '../../components/WorkList'



const PROJECTS_QUERY = `{
    allCaseStudies {
        slug
    }
}`

export default function CaseStudy({ data, moreProjects, work }) {
    return (
        <>
        <div className='bg-red text-black'>
            <Header colour='black'/>
            <Logo url='/ROOT-logo-white.svg'/>
            <TwoColLayout cols='grid-cols-[0.25fr_0.75fr]' border='border-t'>
                <div className='pt-10 border-r border-black text-xl md:text-xl xxl:text-4xl'>
                    <div className='uppercase underline'>{data.client}</div>
                    <div className='uppercase mt-8'>{data.title}</div>
                </div>
                <div className='pt-10 ml-8 xxl:ml-14'>
                    <div className='mb-8 md:text-xl xxl:text-4xl uppercase'>The Challenge</div>
                    <div dangerouslySetInnerHTML={{__html: data.theChallenge}} className='paragraph md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4 mb-20'/>
                </div>
            </TwoColLayout>
            <div className='mx-[15vw]'>
                <div className='relative h-[70vh]'>
                    <Image src={data.thumbnail.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                </div>
            </div>
            <TwoColLayout cols='grid-cols-[0.25fr_0.75fr]'>
                <div className='pt-10 border-r border-black text-xl md:text-xl xxl:text-4xl'>
                    <div></div>
                </div>
                <div className='pt-10 ml-8 xxl:ml-14'>
                    <div className='mb-8 md:text-xl xxl:text-4xl uppercase'>The Ask</div>
                    <div dangerouslySetInnerHTML={{__html: data.theAsk}} className='paragraph md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4'/>
                </div>
            </TwoColLayout>
            <div className='md:grid grid-cols-2 mx-7 xxl:mx-16 gap-7 mb-12'>
                {data.images.slice(1, 3).map((img, i) => (
                    <div key={i} className='relative h-[65vh]'>
                        <Image src={img.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                    </div>
                ))}
            </div>
            <TwoColLayout cols='grid-cols-[0.5fr_0.5fr]' border='border-t'>
                <div className='pt-10 ml-8 xxl:ml-14 border-r border-black text-xl md:text-xl xxl:text-4xl'>
                    <div className='mb-8 md:text-xl xxl:text-4xl uppercase'>What We Did</div>
                    <div dangerouslySetInnerHTML={{__html: data.theAsk}} className='paragraph md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4'/>
                </div>
                <div className='pt-10 ml-8 xxl:ml-14'>
                    <div className='mb-8 md:text-xl xxl:text-4xl uppercase'>How we did it</div>
                    <div dangerouslySetInnerHTML={{__html: data.theAsk}} className='paragraph md:text-2xl xxl:text-6xl xxl:leading-tight md:w-3/4'/>
                </div>
            </TwoColLayout>
            <div className='flex justify-between mx-7 xxl:mx-16 py-16 text-2xl xxl:text-4xl'>
                <Link href={moreProjects[0].slug}><a className='underline'>Previous</a></Link>
                <Link href={moreProjects[1].slug}><a className='underline'>Next</a></Link>
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