import Image from "next/image"
import Link from "next/link"

const Logo = ({url}) => {
    return (
        <div className='relative w-screen h-[50vh] my-10'>
            <Link href='/'><a><Image src={url} layout='fill' objectFit='contain'/></a></Link>
        </div>
    )
}
export default Logo