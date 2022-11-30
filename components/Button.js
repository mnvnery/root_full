import Link from "next/link"

const Button = ({text, mainColour, href}) => {
    return (
        <Link href={href}><a className={`border ${mainColour} rounded-xl xxl:rounded-3xl uppercase inline-block px-3 py-2 xxl:px-8 xxl:py-6`}>{text}</a></Link>
    )
}
export default Button