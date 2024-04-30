import React from "react";
import styles from "./styles.module.css";
import { useState } from "react";
import  { useEffect } from "react";


const Main = () => {
	const handleLogout = () => {
		console.log("logout");
		window.open("http://localhost:8080/auth/logout", "_self");
		localStorage.removeItem("token");
		localStorage.removeItem("email");
        localStorage.removeItem("name");
		window.location = "/login";
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>Testing</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
		</div>
	);


    // const [username, setUsername] = useState('');

    // useEffect(() => {
    //     const name = localStorage.getItem('email'); 
    //     if (name) {
    //         setUsername(name);
    //     }
    // }, []); 

    // return (
    //     <div>
    //         {username ? <h1>Welcome, {username}!</h1> : <h1>Welcome!</h1>}
    //     </div>
    // );

};

export default Main;