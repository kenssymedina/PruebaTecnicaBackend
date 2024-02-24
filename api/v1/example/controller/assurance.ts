import { z } from 'zod';
import { validateAssuranceSchema } from '../helpers/schemas';
import { ApiError, ApiResponse, compareHashedPassword } from '../../../../helpers';

const user = {
    email: "example@example.com",
    password: "$2a$12$xmU1v4tWlSpAKFUqDhQOV.5yhQWNLNsjohhVjvy9iay6qOH/GOU/y"
}

export async function AssuranceController(
    body: z.infer<typeof validateAssuranceSchema>
) {

    console.log(body)

    return new ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {},
        title: "Success"
    });
}
