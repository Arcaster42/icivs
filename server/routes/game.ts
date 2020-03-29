import { Router, Request, Response } from 'express'
import { build } from '../../database/queries'
import { BuildRequest } from '../../typescript/server'

const routes: Router = Router()

routes.post('/build', async (req: Request, res: Response): Promise<void> => {
  const buildObj: BuildRequest = req.body
  if (!buildObj.email || !buildObj.tag) res.status(400).send({ err: 'Bad Request' })
  else {
    const result = await build(buildObj)
    res.status(200).send(result)
  }
})

export default routes