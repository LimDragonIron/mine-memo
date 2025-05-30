import prisma from '@/lib/prisma'
import { getSession } from '@/actions/auth'
import Game from '../_components/Game'

export default async function GamePage({
  params,
}: {
  params: { mindmapid: string }
}) {
  const { mindmapid } = await params

  const auth = await getSession()

  if (!auth) {
    return <div>Unauthenticated</div>
  }

  const id = auth?.user.id

  const mindmap = await prisma.mindMap.findFirst({
    where: {
      id: mindmapid,
      userId: id,
    },
  })

  if (!mindmap) {
    return <div>MindMap not found</div>
  }

  return <Game mindMap={mindmap} />
}
