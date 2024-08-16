import React from 'react'
import { Form } from 'react-bootstrap'

const EmailInputField = ({ email, setEmail }) => {
   return (
      <Form.Group className="mb-3" controlId="email">
         <Form.Label>البريد الإلكتروني </Form.Label>
         <Form.Control
            type="email"
            className='rounded-5'
            title="ادخل البريد الإلكتروني"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
         />
      </Form.Group>
   )
}

export default EmailInputField