import React from 'react'
import styles from "./Footer.module.css"

const Footer = () => {

    return (
        <div className={styles.footer}>
            <p><a href="https://romainpareja.com/" target="_blank">©Romain Pareja</a></p>
            <p><a href="https://covid19.mathdro.id/api" target="_blank">mathdro api</a></p>
        </div>
    )
}

export default Footer;