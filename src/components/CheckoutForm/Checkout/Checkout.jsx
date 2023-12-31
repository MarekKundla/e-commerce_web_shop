import React, { useState, useEffect } from 'react'
import {
    Paper,
    Stepper,
    Step,
    StepLabel,
    Typography,
    CircularProgress,
    Divider,
    Button,
    CssBaseline,
} from '@mui/material'
import { Link, useNavigate } from 'react-router-dom'
import AddressForm from '../AddressForm'
import PaymentForm from '../PaymentForm'

import { commerce } from '../../../lib/commerce'

import './styles.css'

const steps = ['Shipping address', 'Payment details']

const Checkout = ({ cart, order, onCaptureCheckout, error }) => {
    const [activeStep, setActiveStep] = useState(0)
    const [checkoutToken, setCheckoutToken] = useState(null)
    const [shippingData, setShippingData] = useState({})
    const [isFinished, setIsFinished] = useState(false)
    const history = useNavigate()

    useEffect(() => {
        const generateToken = async () => {
            try {
                const token = await commerce.checkout.generateToken(cart.id, {
                    type: 'cart',
                })

                setCheckoutToken(token)
            } catch (e) {
                history('/')
            }
        }

        generateToken()
    }, [cart])

    const nextStep = () => setActiveStep((prevStep) => prevStep + 1)
    const backStep = () => setActiveStep((prevStep) => prevStep - 1)

    const next = (data) => {
        setShippingData(data)

        nextStep()
    }

    const timeout = () => {
        setTimeout(() => {
            setIsFinished(true)
        }, 3000)
    }

    let Confirmation = () =>
        order.customer ? (
            <>
                <div>
                    <Typography variant='h5'>
                        Thank you for your purchase, {order.customer.firstname}{' '}
                        {order.customer.lastname}
                    </Typography>
                    <Divider className='divider' />
                    <Typography variant='subtitle2'>
                        Order ref: {order.customer_reference}
                    </Typography>
                </div>
                <br />
                <Button
                    component={Link}
                    to='/'
                    variant='outlined'
                    type='button'
                >
                    Back to Home
                </Button>
            </>
        ) : isFinished ? (
            <>
                <div>
                    <Typography variant='h5'>
                        Thank you for your purchase
                    </Typography>
                    <Divider className='divider' />
                </div>
                <br />
                <Button
                    component={Link}
                    to='/'
                    variant='outlined'
                    type='button'
                >
                    Back to Home
                </Button>
            </>
        ) : (
            <div className='spinner'>
                <CircularProgress />
            </div>
        )

    if (error) {
        ;<>
            <Typography variant='h5'>Error: {error}</Typography>
            <br />
            <Button component={Link} to='/' variant='outlined' type='button'>
                Back to Home
            </Button>
        </>
    }

    const Form = () =>
        activeStep === 0 ? (
            <AddressForm checkoutToken={checkoutToken} next={next} />
        ) : (
            <PaymentForm
                shippingData={shippingData}
                checkoutToken={checkoutToken}
                backStep={backStep}
                nextStep={nextStep}
                onCaptureCheckout={onCaptureCheckout}
                timeout={timeout}
            />
        )

    return (
        <>
            <CssBaseline />
            <div className='toolbar' />
            <main className='layout'>
                <Paper className='paper'>
                    <Typography variant='h4' align='center'>
                        Checkout
                    </Typography>
                    <Stepper activeStep={0} className='stepper'>
                        {steps.map((step) => (
                            <Step key={step}>
                                <StepLabel>{step}</StepLabel>
                            </Step>
                        ))}
                    </Stepper>
                    {activeStep === steps.length ? (
                        <Confirmation />
                    ) : (
                        checkoutToken && <Form />
                    )}
                </Paper>
            </main>
        </>
    )
}

export default Checkout
