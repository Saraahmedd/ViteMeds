import './globals.css'
import localFont from 'next/font/local'

export const metadata = {
  title: 'Seaats Panel - Login',
  description: 'Login to Seaats',
}

const myFont = localFont({
  src: [
    {
      path: '../../public/fonts/FreeSans.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FreeSansBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/FreeSansOblique.woff',
      weight: '400',
      style: 'italic',
    },
    {
      path: '../../public/fonts/FreeSansBoldOblique.woff',
      weight: '600',
      style: 'italic',
    },
  ],
})


export default function RootLayout({ children }) {
  return (
    <html lang="en" className='min-h-screen'>
      <body className={myFont.className + ' min-h-screen'}>{children}</body>
    </html>
  )
}
