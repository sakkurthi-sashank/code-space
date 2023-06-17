import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
})

export const Brand = () => {
  return (
    <div
      style={{
        fontFamily: inter.style.fontFamily,
      }}
      className="text-xl font-bold tracking-normal text-gray-700"
    >
      CodeSpace
    </div>
  )
}
