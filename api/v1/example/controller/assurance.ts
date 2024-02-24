import { z } from 'zod';
import axios from 'axios';
import { validateAssuranceSchema } from '../helpers/schemas';
import { ApiError, ApiResponse, compareHashedPassword } from '../../../../helpers';




const AUTH = {
    username: "ingenieriaDigital",
    password: "9YEL$m3Kcs?5"
}


let callMedicatelApi = async (data: z.infer<typeof validateAssuranceSchema>) => {
    let result: any = await axios.post('https://api-dev.medicatel.red/cotizar/vida/seguros_plus', {
        "edad": data.age,
        "sumaAsegurada": data.insuredAmount,
        "sexo": data.gender
    }, {
        auth: {
            username: AUTH.username,
            password: AUTH.password
        }
    }).catch((error: any) => {
        if (error.response) {
            console.log(error.response.status);
        } else if (error.request) {
            console.log("network error");
        } else {
            console.log(error);
        }
    });

    console.log(result.statusCode)
    if(result.statusCode === 200){
        return result.data;
    }
    return null;
}


export async function AssuranceController(
    body: z.infer<typeof validateAssuranceSchema>
) {
    let medicalAssurance = await callMedicatelApi(body);

    console.log(medicalAssurance)

    return new ApiResponse({
        statusCode: 200,
        message: 'Success',
        success: true,
        data: {},
        title: "Success"
    });
}
