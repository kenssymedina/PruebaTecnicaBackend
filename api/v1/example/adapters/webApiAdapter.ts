import IDataStrategy from "./IDataStrategy";
import axios from 'axios';
import { ApiError} from '../../../../helpers';

const AUTH = {
    username: "ingenieriaDigital",
    password: "9YEL$m3Kcs?5"
}

class WebApiAdapter implements IDataStrategy {
    private url: string = 'https://api-dev.medicatel.red/cotizar/vida/seguros_plus';

    constructor(url?: string) {
        if (url) {
            this.url = url;
        }
    }


    public getData: any = async (metadata: any) => {
        try {
            let result: any = await axios.post(this.url, {
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
            throw new ApiError({
                'statusCode': 500,
                'message': 'There was a problem with the external api.',
                'title': 'Connectivity Problem'
            });
        }
    }
}

export default WebApiAdapter;