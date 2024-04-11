import styles from "./Advice.module.css"

function Advice () {

    return (
        <div className={styles.advice}>
        <div className={styles.adviceHeader}>
            <h2 className={styles.check_out}>Check out adoption advice</h2>
            <p className={styles.get_the_inside}>Get the inside scoop on pet adoption<br/> and bring home a furry friend</p>
        </div>
        
        <div className={styles.twoColumns}>
            <div className={styles.column}>
                <h4>Why we recommend adopting ?</h4>
                <p>There are so many reasons to adopt: meeting a unique pet, spending less, doing a good deed—but let’s talk facts. 
                    Millions of pets enter shelters every year. And hundreds of thousands are euthanized each year. 
                    We don’t tell you that to guilt you or be a downer, but that’s why adoption really matters to us. 
                    So we would love it if you considered adopting. And, since you're here, we’re guessing you are. 
                    Seriously, no judgment if you find a pet another way (every pet parent journey is different!). But we’re here to help make adoption easier, however we can.
                </p>
            </div>

            <div className={styles.column}>
                <h4>How to find the perfect pet?</h4>
                <p>Let’s bust a myth. The perfect pet? Doesn’t exist. Because there are so many pets that can be the right fit for you. 
                    It’s just about knowing what you’re looking for. So start by thinking about your criteria based on your lifestyle, 
                    breed preferences, living situation, (fur and human) family, etc. From there, our team can help match you with the right pet. 
                    Check out our New Pet Alerts too: with Alerts, we’ll email you newly added adoptable pets that fit your search—so you can check 
                    out matches and meet your next best friend faster.
                </p>
            </div>
        </div>
    </div>
      
    );
}

export default Advice