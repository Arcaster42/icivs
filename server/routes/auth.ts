import { Router, Request, Response } from 'express'
import { loginUser, registerUser } from '../../database/queries'
import { UserAuth, QueryLogin, QueryRegister } from '../../typescript/server'

const routes: Router = Router()

routes.post('/login', async (req: Request, res: Response): Promise<void> => {
  const userObj: UserAuth = req.body
  if (!userObj.email || !userObj.password) res.status(401).send({ err: 'Missing Credentials' })
  else
    try {
      const results: QueryLogin = await loginUser(userObj)
      if (results.err) res.status(401).send(results)
      else if (results.email) res.status(202).send(results)
      else res.status(500).send(results)
    } catch (err) {
      res.status(500).send(err)
    }
})

routes.post('/registration', async (req: Request, res: Response): Promise<void> => {
  const userObj: UserAuth = req.body
  if (!userObj.email || !userObj.password) res.status(401).send({ err: 'Missing Credentials' })
  else
    try {
      const results: QueryRegister = await registerUser(userObj)
      if (results.err) res.status(409).send(results)
      if (results.success) res.status(201).send(results)
    } catch (err) {
      res.status(500).send(err)
    }
})

export default routes