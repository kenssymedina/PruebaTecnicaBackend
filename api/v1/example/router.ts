import { Router } from 'express';
import { validateLoginSchema,  validateAssuranceSchema} from './helpers/schemas';
import { exampleController } from './controller/user';
import { AssuranceController } from './controller/assurance';

const router = Router();

const ruta = '/example';

router.post(
  ruta + '/login',
  /*Aqui va el middleware */ async function (req, res) {
    const values = await validateLoginSchema.parseAsync(req.body);

    const response = await exampleController(values);

    return res.status(response.statusCode).json(response);
  }
);

router.post(
  '/assurance',
  async function (req, res) {
    const values = await validateAssuranceSchema.parseAsync(req.body);
    const response = await AssuranceController(values);
    return res.status(response.statusCode).json(response);
  }
);

export default router;
