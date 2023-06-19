import Image from 'next/image'

export const CommingSoon = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center space-y-10">
      <Image
        src="/images/not-found.svg"
        width={250}
        height={250}
        alt="NotFoundImage"
      />
      <span className="text-base font-normal text-indigo-500 antialiased sm:text-xl">
        Comming Soon
      </span>
    </div>
  )
}
