import React from "react";
import styles from "./dropdown.module.css";

const Dropdown = () =>{
    // list of users stored in firebase
    return (
        <div className={styles.dropDownProfile}>
            <ul>
                <li>user1</li>
                <li>user2</li>

            </ul>
        </div>
    )
}
export default Dropdown;