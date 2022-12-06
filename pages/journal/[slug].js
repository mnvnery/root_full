import { request } from '../../lib/datocms'
import { ARTICLE_QUERY} from '../../lib/queries'
import Image from 'next/image'
import Button from '../../components/Button'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Header from '../../components/Header'
import Logo from '../../components/Logo'
import TwoColLayout from '../../components/TwoColLayout'
import SoftMotion from '../../components/SoftMotion'
import LeftMotion from '../../components/LeftMotion'



const ARTICLES_QUERY = `{
    allJournalArticles {
        slug
    }
}`

export default function Article({ data, moreArticles }) {
    return (
        <>
        <div className='bg-darkPurple text-white'>
            <Header colour='white' bgColour='darkPurple'/>
            <Logo url='/ROOT-logo-black.svg'/>
            <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t border-white'>
                <div className='uppercase text-2xl md:text-3xl pt-10 xxl:text-5xl xxl:leading-tight'>
                    <SoftMotion>
                        <div>{data.title}</div>
                    </SoftMotion>
                </div>
                <div className='border-t border-white mt-10 md:mt-0 md:border-t-0 pt-10 md:ml-40 md:text-lg xxl:text-4xl xxl:leading-tight'>
                    <SoftMotion>
                        <div dangerouslySetInnerHTML={{__html: data.firstParagraph}} className='paragraph md:w-3/4 mb-10 md:mb-14'/>
                    </SoftMotion>
                </div>
            </TwoColLayout>
            <div className='mx-7 md:mx-[15vw] mb-10 md:mb-14'>
                <SoftMotion>
                <div className='relative h-[40vh] md:h-[80vh] mb-8'>
                    <Image src={data.image.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                </div>
                </SoftMotion>
            </div>
            <div className='mx-7 md:mx-[15vw] mb-24 md:mb-40 xxl:mb-60'>
                <SoftMotion>
                <div dangerouslySetInnerHTML={{__html: data.articleBody}} className='paragraph md:text-lg xxl:text-4xl xxl:leading-tight gap-12 md:columns-2'/>
                </SoftMotion>
            </div>
            <div className='flex justify-between mx-7 xxl:mx-16 pb-16 text-xl md:text-2xl xxl:text-4xl'>
                <Link href={moreArticles[0].slug}><a className='underline'>Previous</a></Link>
                <Link href={moreArticles[1].slug}><a className='underline'>Next</a></Link>
            </div>

        </div>
        </>
    )
    }

    export async function getStaticPaths() {
    const articles = await request({
        query: ARTICLES_QUERY,
    })

    return {
        paths: articles.allJournalArticles.map((article) => {
        return {
            params: {
            slug: article.slug,
            },
        }
        }),
        fallback: false,
    }
    }

    export async function getStaticProps({ params }) {
    const data = await request({
        query: ARTICLE_QUERY,
        variables: { slug: params.slug },
    })

    const articles = data.allJournalArticles;

    const currentArticle = articles.find((article) => article.slug === params.slug);
    const currentArticleIndex = articles.findIndex((article) => article.slug === params.slug);
    const prevArticle = articles[currentArticleIndex - 1] || articles[articles.length - 1];
    const nextArticle = articles[currentArticleIndex + 1] || articles[0];

    if (!currentArticle) {
        return {
            article: false,
        };
    }

    return {
        props: {
            data: currentArticle,
            moreArticles: [prevArticle, nextArticle],
        },
    }
}