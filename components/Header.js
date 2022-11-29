import Image from "next/image"
import MobileNav from '../components/MobileNav'

const Header = ({colour}) => {
    return (
        <div className={`flex justify-between items-center py-5 mx-7 border-b border-${colour}`}>
            <div className="relative w-7 h-12">
                <Image src={`/small_logo_${colour}.svg`} layout="fill" objectFit="contain"/>
            </div>
            <div className="flex space-x-2">
                <a href='https://www.linkedin.com/company/root-media/' target='_blank' rel="noreferrer" className='hover:underline'>LINKEDIN</a>
                <div>●</div>
                <a href='https://twitter.com/wearerootmedia' target='_blank' rel="noreferrer" className='hover:underline'>TWITTER</a>
                <div>●</div>
                <a href='https://www.facebook.com/wearerootmedia/' className='hover:underline'>FACEBOOK</a>
            </div>
            <MobileNav colour={colour}/>
        </div>
    )
}
export default Header