import styles from './footer.module.css'
function Footer () {

    return (
        <>
            <div className="footer">
                <div className={styles.social_icons}>
                    <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook"></i>Facebook</a>
                    <a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i>Twitter</a>
                    <a href="https://github.com" target="_blank"><i className="fab fa-github"></i>Github</a>
                    <a href="https://linkedin.com" target="_blank"><i className="fab fa-linkedin"></i>LinkedIn</a>
                </div>
                <p><strong>@ 2024 Pet Adoption Match Incorporated. All rights reserved.</strong></p>
            </div>
        </>
    );
}

export default Footer