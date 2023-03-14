import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './navbar.css';

import { logo } from "../../asserts";

export default function NavBar() {

    return (
        <div>
            <Navbar className="nav">
                <Container>
                    <Navbar.Brand href="/"><img className="navLogo" alt="..." src={logo} /></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        <Navbar.Text>
                            <a href="/view">
                                <Button
                                    className="navbtn"
                                    color='primary'>
                                    View Employees
                                </Button>
                            </a>
                        </Navbar.Text>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    )
}
