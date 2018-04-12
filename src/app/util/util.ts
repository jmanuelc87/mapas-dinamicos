
export class ServiceUtil {


    public static queryTaskWhere(start: number, end: number): string {
        let where: string;
        where = `CVE_ENT IN (`;
        for (let i = start; i <= end; i++) {
            let cve = i > 0 && i <= 9 ? '0' + i : i;
            if (i != end) {
                where += `'${cve}',`;
            } else {
                where += `'${cve}'`;
            }
        }
        where += `)`;

        return where;
    }

}