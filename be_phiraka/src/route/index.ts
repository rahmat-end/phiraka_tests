import * as express from "express"
import AuthenticationMiddlewares from '../middlewares/Auth'
import UserControllers from "../controllers/UserControllers"

const router = express.Router()

router.get("/users", AuthenticationMiddlewares.Authentication, UserControllers.find)
router.get("/user/:id", AuthenticationMiddlewares.Authentication, UserControllers.findOne)
router.get("/search/:key", AuthenticationMiddlewares.Authentication, UserControllers.search)
router.get("/auth/check", AuthenticationMiddlewares.Authentication, UserControllers.check)
router.post("/add", AuthenticationMiddlewares.Authentication, UserControllers.add)
router.post("/auth/login", UserControllers.login)
router.put("/updateUser/:id", AuthenticationMiddlewares.Authentication, UserControllers.update)
router.delete("/deleteUser/:id", AuthenticationMiddlewares.Authentication, UserControllers.delete)

export default router