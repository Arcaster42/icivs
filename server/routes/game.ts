import { Router, Request, Response } from 'express'
import { getUser, getSchematics, build } from '../../database/queries'
import { BuildRequest } from '../../typescript/server'

const routes: Router = Router()

routes.get('/user', async (req: Request, res: Response): Promise<void> => {
  try {
    const userObj: any = req.query
    const user = await getUser(userObj)
    res.status(200).send(user)
  } catch (err) {
    res.status(500).send(err)
  }
})

routes.get('/schematics', async (req: Request, res: Response): Promise<void> => {
  try {
    const schematics = await getSchematics()
    res.send(schematics)
  } catch (err) {
    res.status(500).send(err)
  }
})

routes.post('/build', async (req: Request, res: Response): Promise<void> => {
  const buildObj: BuildRequest = req.body
  if (!buildObj.email || !buildObj.tag) res.status(400).send({ err: 'Bad Request' })
  else {
    const result = await build(buildObj)
    res.status(200).send(result)
  }
})

export default routes