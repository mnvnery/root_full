import Image from "next/image"
import Link from "next/link"

const Logo = ({url}) => {
    return (
        <div className='relative h-[15vh] md:h-[50vh] my-4 md:my-10 mx-7 xxl:mx-16 z-0'>
            <Link href='/'><a><Image src={url} layout='fill' objectFit='contain'/></a></Link>
        </div>
    )
}
export default Logo