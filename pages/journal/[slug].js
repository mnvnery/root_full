import { request } from '../../lib/datocms'
import { ARTICLE_QUERY} from '../../lib/queries'
import Image from 'next/image'
import Button from '../../components/Button'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import Header from '../../components/Header'
import Logo from '../../components/Logo'
import TwoColLayout from '../../components/TwoColLayout'



const ARTICLES_QUERY = `{
    allJournalArticles {
        slug
    }
}`

export default function Article({ data, moreArticles }) {
    return (
        <>
        <div className='bg-darkPurple text-white'>
            <Header colour='white'/>
            <Logo url='/ROOT-logo-black.svg'/>
            <TwoColLayout cols='grid-cols-[0.3fr_0.7fr]' border='border-t border-white'>
                <div className='uppercase text-2xl md:text-3xl pt-10'>
                    <p>{new Date(data.date).toLocaleDateString('default', {weekday: 'long'})}</p>
                    <p>{new Date(data.date).toLocaleDateString('default', {month: 'long'})} {new Date(data.date).getDate()}</p>
                    <p>{new Date(data.date).getFullYear()}</p>
                    <div className='mt-10'>{data.title}</div>
                </div>
                <div className='pt-10 ml-40 text-2xl md:text-4xl'>
                    <div dangerouslySetInnerHTML={{__html: data.firstParagraph}} className='paragraph md:w-3/4 mb-20'/>
                </div>
            </TwoColLayout>
            <div className='mx-[15vw] mb-20'>
                <div className='relative h-[80vh] mb-8'>
                    <Image src={data.image.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                </div>
            </div>
            <div className='mx-[15vw] mb-40'>
                <div dangerouslySetInnerHTML={{__html: data.articleBody}} className='paragraph md:text-lg gap-12 columns-2'/>
            </div>
            <div className='flex justify-between mx-7 xxl:mx-16 pb-16 text-2xl'>
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