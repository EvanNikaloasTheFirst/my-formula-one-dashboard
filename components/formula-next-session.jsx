import styles from "@/styles/Home.module.css";
import React,{useState,useEffect} from "react";
import DriverAnalysis from "../classes/DriverAnalysis.jsx"
import TopThree from "./topthree.jsx"
import ContructorsTable from "../components/constructors-table.jsx"
export default function SessionBars() {
    
var [sessionDetails, setSessionDetails] = useState("Loading...")
var [driversTable, setDriversTable] = useState([]);
var [DriversArray, setDriversArray] = useState([]);

var setDrivers = (Names,Position,StartPos,Laptime) =>{

    var tempArray = [];
    var tempDriversTable = []
    for(var i = 0; i < Names.length; i++){
        
      var driver =  new DriverAnalysis(Names[i],Position[i],StartPos[i],Laptime[i])
        tempArray.push(driver)
        tempDriversTable.p
    }
    setDriversArray(tempArray)
}

useEffect(() =>{
    fetch("http://localhost:8080/api/home").then(
        response => response.json()).then(
            data => {
                setSessionDetails(data.Session)
                setDrivers(data.Names,
                    data.Position,
                    data.GridStart,data.Times)
                console.log(data)
                
            }
        )
},[])

return(
<div className={styles.formulaDetails}>
        <div className={styles.nextRace}>
          <div>
            <img src="images/formulaone.png" className={styles.f1Logo}/>
          </div>

          <div className={styles.nextRaceText}>
            <p>Next Race: <br/> Sun 23rd June 14:00<br/>Circuit de Barcelona Catalunya</p>
          </div>
        </div>

        <div className={styles.lastSession}>
        <div>

            {TopThree(DriversArray)}

        </div>

        <div className={styles.sessionType}>
         <div>
         <h1>{sessionDetails[0]}</h1>
         <p>{sessionDetails[1]}</p>
         </div>


         <div className={styles.fullSession}>
            <a href="/">View Full Session</a>
         </div>
        </div>

        
        </div>
          <div className={styles.constructorsTable}>

        <ul>
        {ContructorsTable(DriversArray)}

        </ul>
      </div>
        
        
        
      </div>



    )




}