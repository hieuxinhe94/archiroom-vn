import styles from '../styles/NavbarFooter.module.css';
import { pageInfo } from '../Constants/userinfo'
import Link from 'next/link'

const Footer = ({ currentTheme }) => {
    return (
        <div className={styles.footermain} style={{ backgroundColor: currentTheme.footerColor, color: currentTheme.subtext }}>
            <div className={styles.footertable}>
                <Link href='/'><a><h2 className={styles.footerlogo}>{pageInfo.logoText}</h2></a></Link>
                <ul>
                    <li className={styles.listHeading}>Socials</li>
                    {pageInfo.socials ?
                        pageInfo.socials.map((social, key) => {
                            return (
                                <Link href={social.link} key={key}><a><li>{social.type}</li></a></Link>
                            )
                        }) : null
                    }
                    <Link href={`mailto:admin@simplifydx.com`}><a><li>Mail</li></a></Link>
                </ul>
                <ul>
                    <li className={styles.listHeading}>Pages</li>
                    <Link href='/chatbots'><a><li>Chatbots</li></a></Link>
                    <Link href='/ocr-service'><a><li>OCR</li></a></Link>
                    <Link href='/digital-consultant'><a><li>Constants service</li></a></Link>
                    <Link href='/showcases'><a><li>Sản phẩm doanh nghiệp</li></a></Link>
                    <Link href='/contact'><a><li>Liên hệ</li></a></Link>
                </ul>
            </div>
            <hr style={{ height: '1px', backgroundColor: currentTheme.subtext, border: 'none', opacity: '0.5' }}></hr>
            <h4 className={styles.footercontent}>© 2023 SIMPLIFY DX. All Rights Reserved.</h4>
        </div>
    )
}

export default Footer
