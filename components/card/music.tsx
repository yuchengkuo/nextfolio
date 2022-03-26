import { UpRightArrowIcon } from '@components/Icons'
import { fade, fadeRight, scale, slideDown } from '@utils/animation'
import { m } from 'framer-motion'
import Image from 'next/image'

export const CardWithCover = ({
  imgSrc,
  url,
  title,
  subtitle,
  info,
  index,
  loading = false,
}: {
  imgSrc?: string
  url?: string
  title?: string
  subtitle?: string
  info?: string
  index?: number
  loading?: boolean
}) => {
  if (loading)
    return <div className="bg-gray-4 dark:bg-grayDark-4 rounded w-60 h-60 animate-pulse" />
  return (
    <m.a
      href={url}
      title={title}
      target="_blank"
      rel="noopener noreferrer"
      className="px-4 pt-2 pb-4 -m-4 rounded-md hover:bg-gray-4 dark:hover:bg-grayDark-3 group relative"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      animate="visible"
      whileInView="visible"
      whileTap={{ scale: 0.99 }}
      whileHover="1"
      layout
    >
      <m.div
        variants={slideDown}
        className="flex justify-between mb-2 body-font-settings font-medium text-gray-11 dark:text-grayDark-11"
      >
        <m.p className="tabular-nums text-xs">0{index + 1}</m.p>
        <m.p className="text-xs">{info}</m.p>
      </m.div>

      <m.div className="rounded overflow-hidden max-w-[240px] mb-3" layout>
        {imgSrc ? (
          <Image src={imgSrc} width={240} height={240} className="rounded overflow-hidden" />
        ) : (
          <div className="w-60 h-60 bg-gray-6 dark:bg-grayDark-6" />
        )}
        <m.div
          className="flex flex-col"
          initial="0"
          animate="1"
          transition={{ delayChildren: 0.3, staggerChildren: 0.06 }}
          layout
        >
          <div className="body-font-settings font-medium whitespace-nowrap">
            <m.p variants={fadeRight} className="text-base overflow-hidden overflow-ellipsis">
              {title}
            </m.p>
            <m.p
              variants={fadeRight}
              className="text-sm overflow-hidden overflow-ellipsis text-gray-11 dark:text-grayDark-11"
            >
              {subtitle}
            </m.p>
          </div>
        </m.div>
      </m.div>

      <m.div variants={scale} className="w-4 h-4 absolute right-4 bottom-4">
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}

export const ListCard = ({
  url,
  title,
  subtitle,
  index,
  loading = false,
}: {
  url?: string
  title?: string
  subtitle?: string
  index?: number
  loading?: boolean
}) => {
  if (loading)
    return (
      <div className="bg-gray-4 dark:bg-grayDark-3 rounded w-[480px] max-w-full h-10 mb-2 animate-pulse" />
    )
  return (
    <m.a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-baseline min-w-fit flex-wrap gap-4 phone:gap-2 p-2 -mx-2 rounded hover:bg-gray-4 dark:hover:bg-grayDark-4 transition-colors ease-out body-font-settings font-medium"
      variants={{ ...fade, 1: { y: -4 } }}
      initial="0"
      animate="visible"
      whileHover="1"
      whileTap={{ scale: 0.99 }}
    >
      <p className="text-xs text-gray-11 dark:text-grayDark-11 tabular-nums">0{index}</p>
      <p className="text-base">{title}</p>
      <p className="text-sm text-gray-11 dark:text-grayDark-11 phone:w-full phone:pl-6">
        {subtitle}
      </p>
      <m.div variants={scale} className="ml-auto w-4 h-4 align-baseline phone:hidden">
        <UpRightArrowIcon />
      </m.div>
    </m.a>
  )
}
