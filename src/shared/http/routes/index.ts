import { Router } from 'express';
import usersRouter from '../../../modules/users/routes/users.routes';
import productsRouter from '../../../modules/products/routes/products.routes';
import sessionsRouters from '../../../modules/users/routes/session.routes';

const routes = Router()

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouters)

export default routes;