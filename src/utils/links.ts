// import facebook from '../../public/facebook.svg'
// import twitter from '../../public/twitter.svg'
// import pintrest from '../../public/pintrest.svg'

import { Facebook, Twitter, Instagram } from "lucide-react"

export const navLinks = [
    {
        link: 'Buy',
        href: '/buy'
    },
    {
        link: 'Sell',
        href: '/sell'
    },
    {
        link: 'Rent',
        href: '/rent'
    },
    {
        link: 'Agents',
        href: '/agents'
    },
]

export const socialLinks = [
    {
        name: 'Facebook',
        link: 'www.facebook.com',
        icon: Facebook,
    },
    {
        name: 'X',
        link: 'www.x.com',
        icon: Twitter,
    },
    {
        name: 'Pinterest',
        link: 'www.pinterest.com',
        icon: Instagram,
    },
]