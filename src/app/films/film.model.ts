
export class Film{

    constructor(
        public filmId: number,
        public title:string, 
        public description:string, 
        public releaseYear:number, 
        public languageId:string,
        public rentalDuration:number, 
        public rentalRate:number,
        public length:number,
        public replacementCost:number,
        public rating:string,
        public specialFeatures:string,
        public lastUpdate:string,
    ){

    }
}