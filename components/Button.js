import Link from "next/link"

const Button = ({text, mainColour, href}) => {
    return (
        <Link href={href}><a className={`border ${mainColour} rounded-xl uppercase inline-block px-3 py-2`}>{text}</a></Link>
    )
}
export default Button