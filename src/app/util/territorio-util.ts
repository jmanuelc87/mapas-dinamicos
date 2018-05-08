export class TerritorioUtil {


    static createClassBreaks(ranges, data: any[]) {
        let classBreaks = [];

        for (let item of data) {
            for (let r of ranges) {
                //console.log(item[r.field], r.min, r.max);
                if (Number.parseFloat(item[r.field]) >= r.min
                    && Number.parseFloat(item[r.field]) <= r.max) {
                    classBreaks.push(r);
                }
            }
        }

        return classBreaks;
    }

}
