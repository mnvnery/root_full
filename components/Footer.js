import Image from "next/image"
import siteMetadata from "../data/siteMetadata"

const Footer = () => {
    return (
        <div className="bg-black text-white px-7 py-14">
            <div className="grid grid-cols-[1fr_1fr_0.7fr] border-y border-white text-3xl">
                <div className="pt-10 pb-32 flex flex-col justify-between">
                    <div>
                        <div className="relative w-52 h-16 mb-20">
                            <Image src='/logo-white.svg' objectFit='contain' layout='fill'/>
                        </div>
                    </div>
                    <div>
                        86 Princess Street<br/>
                        Manchester<br/>
                        M1 6NG
                    </div>
                </div>
                <div className="flex flex-col justify-between pt-10 pb-32 pl-7 border-x border-white">
                    <div></div>
                    <div>
                        <div><a href={`tel:${siteMetadata.phone}`} target="_blank" rel="noreferrer" className="hover:underline">{siteMetadata.phone}</a></div>
                        <div><a href={`mailto:${siteMetadata.email}`} target="_blank" rel="noreferrer" className="hover:underline">{siteMetadata.email}</a></div>
                        <div className="invisible">.</div>
                    </div>
                </div>
                <div className="flex flex-col justify-between pt-10 pb-32 pl-7">
                    <div></div>
                    <div>
                    <div><a href={siteMetadata.twitter} target="_blank" rel="noreferrer" className="hover:underline">Twitter</a></div>
                    <div><a href={siteMetadata.linkedin} target="_blank" rel="noreferrer" className="hover:underline">Linkedin</a></div>
                    <div><a href={siteMetadata.instagram} target="_blank" rel="noreferrer" className="hover:underline">Instagram</a></div>
                    </div>
                </div>
            </div>
            <div className="pt-4 pb-8 text-lg">Design by: <a href="studiodbd.com" target='_blank' className="hover:underline">StudioDBD</a></div>
        </div>
    )
}

export default Footer