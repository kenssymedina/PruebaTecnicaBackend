import { z } from 'zod';
import axios from 'axios';
import * as _ from 'lodash';
import { validateAssuranceSchema } from '../helpers/schemas';
import { ApiError, ApiResponse, compareHashedPassword } from '../../../../helpers';

const db = require('../../../../tasas/vidaInsure.json');



const AUTH = {
    username: "ingenieriaDigital",
    password: "9YEL$m3Kcs?5"
}

let callMedicatelApi = async (metadata: z.infer<typeof validateAssuranceSchema>) => {

    try {
        let result: any = await axios.post('https://api-dev.medicatel.red/cotizar/vida/seguros_plus', {
            "edad": metadata.age,
            "sumaAsegurada": metadata.insuredAmount,
            "sexo": metadata.gender
        }, {
            auth: {
                username: AUTH.username,
                password: AUTH.password
            }
        });

        return Math.round(result.data.data.primaAnual);
    } catch (error) {
        console.log(error);
        return null;
    }
}


let getRate = (metadata: any, item: any) => {
    let rate = 0;
    if (metadata.gender === 'F' && metadata.smoke === false) {
        rate = item.mujerNoFumadora;
    } else if (metadata.gender === 'M' && metadata.smoke === false) {
        rate = item.hombreNoFumador;
    } else if (metadata.gender === 'F' && metadata.smoke === true) {
        rate = item.mujerFumadora;
    } else {
        rate = item.hombreFumadora;
    }

    return rate;
}

let getAnnualPremium = (rate: any, metadata: any) => {
    return (rate / 1000) * metadata.insuredAmount;
}

let getInsureAmount = (metadata: z.infer<typeof validateAssuranceSchema>) => {
    let data: any = _.find(db, (item: any) => {
        return item.Edad === metadata.age;
    });

    let rate = getRate(metadata, data);

    return getAnnualPremium(rate, metadata);
}

export async function AssuranceController(
    body: z.infer<typeof validateAssuranceSchema>
) {
    let medicalAssurance: any = await callMedicatelApi(body);
    let insureAmount: any = getInsureAmount(body);
    
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
