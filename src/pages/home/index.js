import React from 'react'
import { Card, CardBody, CardTitle, CardSubtitle, CardText, Button, CardImg, CardImgOverlay } from 'reactstrap'

import './home.css'
import { img1, img2 } from '../../asserts'

export default function Home() {

    document.title = "Home"

    return (
        <div>

            <div className='homeRibbon'>
                <Card inverse>
                    <CardImg
                        alt="..."
                        src={img1}
                        style={{
                            height: 270
                        }}
                        width="100%"
                    />
                    <CardImgOverlay>
                        <CardTitle tag="h5" className='cardText'>
                            HELLO ADMIN!
                        </CardTitle>
                    </CardImgOverlay>
                </Card>
            </div>
            <div className="homeContainer">
                <Card

                    style={{
                        width: '20rem'
                    }}
                    className="homeCard"
                >
                    <img
                        alt="..."
                        src={img2}
                    />
                    <CardBody>
                        <CardTitle tag="h5">
                            Employee Management
                        </CardTitle>
                        <CardSubtitle
                            className="mb-2 text-muted"
                            tag="h6"
                        >
                            Manage Employees
                        </CardSubtitle>
                        <CardText>
                            Manage the Employee Details Registered in the System
                        </CardText>
                        <Button className="btnCard" href="/view"
                            color='primary'>
                            Get Started
                        </Button>
                    </CardBody>
                </Card>
            </div>
        </div>
    )
}
