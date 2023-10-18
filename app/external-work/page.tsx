import externalWorkData from '@/data/externalWorkData'
import Card from '@/components/Card'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'External Work' })

export default function ExternalWork() {
  return (
    <>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        <div className="space-y-2 pb-8 pt-6 md:space-y-5">
          <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
            External Work
          </h1>
          <p className="text-lg leading-7 text-gray-500 dark:text-gray-400">
            External links featuring various projects I've worked on as well as articles I've
            written and talks I've presented.
          </p>
        </div>
        <div className="container py-12">
          <div className="-m-4 flex flex-wrap">
            {externalWorkData.map((d) => (
              <Card
                key={d.title}
                title={d.title}
                description={d.description}
                imgSrc={d.imgSrc}
                href={d.href}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
