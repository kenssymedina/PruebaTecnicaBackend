import { validateAssuranceSchema , validateItemsSchema} from '../helpers/schemas';
import { z } from 'zod';
import * as _ from 'lodash';
import IDataStrategy from "./IDataStrategy";
import { log } from 'console';


class FileApiAdapter implements IDataStrategy {
    private path: string = '../../../../tasas/vidaInsure.json';
    private db: any;

    constructor(path?: string) {
        if (path) {
            this.path = path;
        }
        this.db = require(this.path);
    }

    

    private getRate: Function = (metadata: z.infer<typeof validateAssuranceSchema>, item: z.infer<typeof validateItemsSchema>) => {
        let rate = 0;
        
        if (metadata.gender === 'F' && metadata.smoke === false) {
            rate = item.mujerNoFumadora;
        } else if (metadata.gender === 'M' && metadata.smoke === false) {
            rate = item.hombreNoFumador;
        } else if (metadata.gender === 'F' && metadata.smoke === true) {
            rate = item.mujerFumadora;
        } else {
            rate = item.hombreFumador;
        }
        return rate;
    }

    private getAnnualPremium: Function = (rate: number, metadata: z.infer<typeof validateAssuranceSchema>) => {
        return (rate / 1000) * metadata.insuredAmount;
    }

    public getData = async(metadata: z.infer<typeof validateAssuranceSchema>) => {
        let data: any = _.find(this.db, (item: z.infer<typeof validateItemsSchema>) => {
            return item.Edad === metadata.age;
        });

        let rate = this.getRate(metadata, data);

        return this.getAnnualPremium(rate, metadata);
    }

}

export default FileApiAdapter;