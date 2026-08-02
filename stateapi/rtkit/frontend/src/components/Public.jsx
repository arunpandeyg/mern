import { Link } from "react-router";


export default function Public() {
    const content = (
        <section>
            <header>Redux Toolkit Practice</header>
            <main>
                <p>This is the public page</p>
                <p>&nbsp;</p>
                <address>
                    New Delhi <br />
                    Bharat <br />
                    Phone <a href="9810013821"></a>
                </address>
            </main>
            <footer>
                <p>
                <Link to="/signin">Sign In</Link>
            </p>
            </footer>
            
        </section>
    )

    return content
}

