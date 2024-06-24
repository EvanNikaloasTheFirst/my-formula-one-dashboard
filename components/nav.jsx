import styles from "@/styles/Home.module.css";
export default function Navbar(){
    return(
        <div className={styles.navBar}>
        
        <div className={styles.navBlocks}>
        <ul>
          <li>
            Drivers
          </li>

          <li>
            H2H
          </li>

          <li>
            Constructors
          </li>
        </ul>
        </div>




          <div>

            <h1 className={styles.menu}>Nav</h1>
          <input type="text" placeholder="Search.." className={styles.searchbox}/>
        </div>
       </div>
    )
}