
export class ServiceUtil {


    public static queryTaskWhere(field: string, start: number, end: number, range: number[]): string {
        let where: string;
        where = `${field} IN (`;
        for (let i = start; i <= end; i++) {
            let cve;
            if (range[1] - range[0] == 9) {
                cve = i > range[0] && i <= range[1] ? '0' + i : i;
            } else if (range[1] - range[0] == 99) {
                if (i > 0 && i <= 9) {
                    cve = '00' + i;
                } else if (i > 9 && i <= 99) {
                    cve = '0' + i
                }
            }
            if (i != end) {
                where += `'${cve}',`;
            } else {
                where += `'${cve}'`;
            }
        }
        where += `)`;

        return where;
    }

    public static getCVEString(i: number, range: number[]) {
        let cve;
        if (range[1] - range[0] == 9) {
            cve = i > range[0] && i <= range[1] ? '0' + i : i;
        } else if (range[1] - range[0] == 99) {
            if (i > 0 && i <= 9) {
                cve = '00' + i;
            } else if (i > 9 && i <= 99) {
                cve = '0' + i
            }
        }

        return cve;
    }

}