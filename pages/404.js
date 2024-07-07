import Custom504Styles from '../styles/504.module.css'
const text = `
'##::::::::::'#####:::'##::::::::
 ##:::'##:::'##.. ##:: ##:::'##::
 ##::: ##::'##:::: ##: ##::: ##::
 ##::: ##:: ##:::: ##: ##::: ##::
 #########: ##:::: ##: #########:
...... ##::. ##:: ##::...... ##::
:::::: ##:::. #####::::::::: ##::
::::::..:::::.....::::::::::..:::
`
const Custom404 = ()=>{
    return(
        <div className={Custom504Styles.container}>
            <pre className={Custom504Styles.asciiart}>
                {text}
            </pre>
            <div className={Custom504Styles.content}>
                what Not Found onMyMind?
            </div>
            <div className={Custom504Styles.footnote}>
                WhyOnM Server has been hosted on Free tier of Onrender!!
                Inactivity spins it Down!!

            </div>

        </div>


        
    )
}
export default Custom404