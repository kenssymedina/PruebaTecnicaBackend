import { Router } from 'express';
import { validateLoginSchema,  validateAssuranceSchema} from './helpers/schemas';
import { userController } from './controller/user';
import { AssuranceController } from './controller/assurance';

const router = Router();

const ruta = '/example';

router.post(
  ruta + '/login',
    async function (req, res) {
    const values = await validateLoginSchema.parseAsync(req.body);

    const response = await userController(values);

    return res.status(response.statusCode).json(response);
  }
);

router.post(
  '/assurance',
  async function (req: any,  res: any) {
    const values = await validateAssuranceSchema.parseAsync(req.body);
    const response = await AssuranceController(values);
    return res.status(response.statusCode).json(response);
  }
);

export default router;
