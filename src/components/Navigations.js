import React from 'react'
import '..//App.css'
import { Link as RouterLink } from 'react-router-dom';
import Link from '@material-ui/core/Link';


function Navigations() {
    return (
        <nav className="nav">
            <Link>
                <RouterLink className="router-links" to="/">
                    <h3>Covid 19 Tracker</h3>
                </RouterLink>
            </Link>

            <ul className="nav-links">
                <Link>
                    <RouterLink className="router-links" to="/about">
                        <h3>About</h3>
                    </RouterLink>
                </Link>
                <Link>
                    <RouterLink className="router-links" to="/product">
                        <h3>Product</h3>
                    </RouterLink>
                </Link>
            </ul>
        </nav>
    )
}

export default Navigations
