import { z } from 'zod';
import { validateAssuranceSchema } from '../helpers/schemas';



interface IDataStrategy {
    getData(metadata: z.infer<typeof validateAssuranceSchema>): Promise<number | null>;
}

export default IDataStrategy;