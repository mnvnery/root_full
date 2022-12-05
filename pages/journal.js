import Image from 'next/image'
import {request} from '../lib/datocms'
import { JOURNAL_QUERY, ARTICLE_QUERY} from '../lib/queries'
import Header from '../components/Header'
import Logo from '../components/Logo'
import Button from '../components/Button'
import TwoColLayout from '../components/TwoColLayout'

export async function getStaticProps() {
    const data = await request({
        query: JOURNAL_QUERY,
    })


    const articles = await request({
        query: ARTICLE_QUERY,
    })

    return {
        props: {
        data: data.journalPage,
        articles: articles.allJournalArticles,
        },
    }
}

export default function Home({data, articles}) {
    const firstArticle = articles[0]
    console.log(new Date(firstArticle.date).getDate())
    const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}
    return (
        <>
        <div className='bg-darkPurple text-white'>
            <Header colour='white' bgColour='darkPurple' />
            <Logo url='/ROOT-logo-black.svg'/>
            <TwoColLayout cols='md:grid-cols-[0.3fr_0.7fr]' border='border-t border-white'>
                <div className='pt-10'>
                    <div className='uppercase text-3xl md:text-4xl xxl:text-6xl xxl:leading-tight'>OUR<br/>JOURNAL</div>
                </div>
                <div className='pt-10 md:ml-8 xxl:ml-14'>
                    <div dangerouslySetInnerHTML={{__html: data.journalText}} className='paragraph md:text-xl md:w-3/4 mb-14 xxl:mb-20 xxl:text-4xl xxl:leading-tight'/>
                </div>
            </TwoColLayout>
            <div className='mx-7 md:mx-[25vw] mb-12 xxl:mb-20'>
                <div className='relative h-[30vh] md:h-[50vh] mb-8'>
                    <Image src={firstArticle.image.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                </div>
                <div className='grid md:grid-cols-[2fr_1fr] md:text-lg xxl:text-3xl xxl:leading-tight'>
                    <div>
                        <div>{firstArticle.title}</div>
                        <div>–</div>
                        <div>{firstArticle.shortIntro}</div>
                    </div>
                    <div className='mt-10 md:mt-0 md:justify-self-end'>
                        <Button text='READ MORE +' href={`/journal/${firstArticle.slug}`} mainColour='border-white hover:bg-white hover:text-black'/>
                    </div>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 mx-7 xxl:mx-16 gap-6 md:text-lg pb-20 xxl:text-3xl'>
                
                {articles.slice(1, 4).map((article, i) => (
                    <div key={i}>
                        <div className='relative h-[20vh] md:h-[40vh] xxl:h-[30vh] mb-8'>
                            <Image src={article.image.url} layout='fill' objectFit='cover' className='rounded-2xl'/>
                        </div>
                        <div>{article.title}</div>
                        <div>–</div>
                        <div>{article.shortIntro}</div>
                        <div className='my-10'>
                        <Button text='READ MORE +' href={`/journal/${article.slug}`} mainColour='border-white hover:bg-white hover:text-black'/>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        </>
    )
}