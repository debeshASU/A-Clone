import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import { Payment } from './Payment';
const stripePromise = loadStripe('pk_test_51NdcGsBEO9MfV35MS75jXPxP8pbicKGVNOEnoeCQj4cziJ5GPwWHNjqMYLNkOJnaeaJz5l53iv5yoIHQNRxMf2R900ZQvFqlfP');
export const StripeContainer = () =>
{
    return (
        <Elements stripe={stripePromise}>
            <Payment />
        </Elements>

    );
}