import Button from "./Button"
import Image from "next/image"
import { TfiEmail } from "react-icons/tfi"
import { RiLinkedinBoxLine } from "react-icons/ri"

const TeamCard = ({image, name, role, info, email, linkedin}) => {
    return (
        <div>
            <div className="relative w-full h-[50vh] mb-5">
                <Image src={image} layout='fill' objectFit='cover' className="rounded-3xl"/>
            </div>
            <div className="uppercase">{name}</div>
            <div className="uppercase">{role}</div>
            <div>—</div>
            <div dangerouslySetInnerHTML={{__html: info}} className='mb-5'/>
            <div className="text-3xl flex space-x-2">
                <a href={email} className='hover:text-purple'><RiLinkedinBoxLine/></a>
                <a href={linkedin} className='hover:text-purple'><TfiEmail/></a>
            </div>
        </div>
    )
}
export default TeamCard