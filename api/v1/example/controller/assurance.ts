import { z } from 'zod';

import { validateAssuranceSchema } from '../helpers/schemas';
import { ApiError, ApiResponse, compareHashedPassword } from '../../../../helpers';
import WebApiAdapter from "../adapters/webApiAdapter";
import FileApiAdapter from "../adapters/fileDataAdapter";




export async function AssuranceController(
    body: z.infer<typeof validateAssuranceSchema>
) {

    let webApiAdapter = new WebApiAdapter();
    let fileDataAdapter = new FileApiAdapter();
    let medicalAssurance: any = await webApiAdapter.getData(body);
    let insureAmount: any = await fileDataAdapter.getData(body);
    
    return new ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {
            insureAmount,
            medicalAssurance
        },
        title: "Success"
    });
}
