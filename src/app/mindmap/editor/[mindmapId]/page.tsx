import prisma from '@/lib/prisma'
import { getSession } from '@/actions/auth'
import Editor from '@/app/mindmap/_components/Editor'
export default async function EditorPage({
  params,
}: {
  params: { mindmapId: string }
}) {
  const { mindmapId } = await params

  const auth = await getSession()

  if (!auth) {
    return <div>Unauthenticated</div>
  }

  const id = auth?.user.id

  const mindmap = await prisma.mindMap.findUnique({
    where: {
      id: mindmapId,
      userId: id,
    },
  })

  if (!mindmap) {
    return <div>MindMap not found</div>
  }

  return <Editor mindmap={mindmap} />
}
