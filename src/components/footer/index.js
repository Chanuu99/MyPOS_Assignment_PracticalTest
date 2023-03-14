import React from 'react'
import './footer.css'
import { footerText } from '../../asserts'

export default function Footer() {
    return (
        <div>
            <div className="footer">
                <span>{footerText}</span>
            </div>
        </div>
    )
}
