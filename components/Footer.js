import Image from "next/image"
import siteMetadata from "../data/siteMetadata"
import Link from "next/link"

const Footer = () => {
    return (
        <div className="bg-black text-white px-7 xxl:px-16 py-14">
            <div className="grid md:grid-cols-[1fr_1fr_0.7fr] border-y border-white text-lg md:text-3xl xxl:text-5xl xxl:leading-tight">
                <div className="md:pt-10 pb-5 md:pb-32 flex flex-col justify-between">
                    <div>
                        <Link href='/'>
                        <div className="relative w-24 md:w-52 h-16 md:mb-20 xxl:w-60 xxl:h-24 cursor-pointer">
                            <Image src='/logo-white.svg' objectFit='contain' layout='fill'/>
                        </div>
                        </Link>
                    </div>
                    <div className="mr-4 ">
                        86 Princess Street<br/>
                        Manchester<br/>
                        M1 6NG
                    </div>
                </div>
                <div className="flex flex-col justify-between pt-10 md:pb-32 md:pl-7 xxl:pl-12 border-t md:border-t-0 md:border-x border-white">
                    <div></div>
                    <div>
                        <div><a href={`tel:${siteMetadata.phone}`} target="_blank" rel="noreferrer" className="hover:underline">{siteMetadata.phone}</a></div>
                        <div><a href={`mailto:${siteMetadata.email}`} target="_blank" rel="noreferrer" className="hover:underline">{siteMetadata.email}</a></div>
                        <div className="invisible">.</div>
                    </div>
                </div>
                <div className="border-t border-white md:border-t-0 flex flex-col justify-between py-5 md:pt-10 md:pb-32 md:pl-7 xxl:pl-12">
                    <div></div>
                    <div>
                    <div><a href={siteMetadata.twitter} target="_blank" rel="noreferrer" className="hover:underline">Twitter</a></div>
                    <div><a href={siteMetadata.instagram} target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></div>
                    <div><a href={siteMetadata.linkedin} target="_blank" rel="noreferrer" className="hover:underline">Linkedin</a></div>
                    </div>
                </div>
            </div>
            <div className="flex justify-between">
            <div className="pt-4 pb-8 text-lg xxl:text-4xl xxl:pt-6">Design by: <a href="https://studiodbd.com" target='_blank' rel="noreferrer" className="hover:underline">StudioDBD</a></div>
            <div className="relative w-[60%] md:w-1/5 h-auto mt-2">
                <Image src='/logos_footer.png' width='912' height='263'/>
            </div>
            </div>
        </div>
    )
}

export default Footer