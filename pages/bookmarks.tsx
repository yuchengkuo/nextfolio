import { BookmarkCard } from '@components/card/word'
import Layout from '@components/layout/Layout'
import { getBookmarks } from '@utils/api/raindrop'
import { domMax, LayoutGroup, LazyMotion } from 'framer-motion'
import { InferGetStaticPropsType } from 'next'
import { Bookmark } from 'types/types'

export default function BookmarkPage({
  bookmarks,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <Layout title="Bookmarks" animateChildren>
      <p className="body-font-settings">A collection of interesting things on the internet.</p>
      <LazyMotion features={domMax}>
        <div className="flex flex-col gap-2 max-w-[720px] mt-8">
          {bookmarks.map((bookmark) => (
            <LayoutGroup key={bookmark.title}>
              <BookmarkCard bookmark={bookmark} />
            </LayoutGroup>
          ))}
        </div>
      </LazyMotion>
    </Layout>
  )
}

export async function getStaticProps() {
  const bookmarkRes = await getBookmarks('20734001')
  const bookmarks = await bookmarkRes.json()
  return { props: { bookmarks: bookmarks.items as Bookmark[] }, revalidate: 43200 }
}
