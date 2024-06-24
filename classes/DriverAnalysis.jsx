class DriverAnlysis{
    constructor(name,position,startPos,laptime){
        this.name = name;
        this.position = position;
        this.startPos = startPos;
        this.laptime = laptime
    }

    getPosDifference(){
        const value = this.startPos - this.position;

        return value
        
    }
    
}
export default DriverAnlysis