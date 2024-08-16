import React, { useState } from 'react'
import { Form } from 'react-bootstrap'
import { FaEye, FaEyeSlash } from "react-icons/fa6";

const PasswordInputField = ({ password, setPassword}) => {
   const [showPassword, setShowPassword] = useState(false);
   return (
      <>
         <Form.Group className="mb-3 position-relative" controlId="password">
            <Form.Label>كلمة المرور </Form.Label>
            <Form.Control
               type={showPassword ? "text" : "password"}
               className='rounded-5'
               minLength={8}
               title="ادخل كلمة المرور"
               required
               value={password}
               onChange={(e) => {
                  setPassword(e.target.value)
               }}
            />
            <span className='show-password'
               onClick={() => setShowPassword(!showPassword)}
            >
               {showPassword ? <FaEyeSlash /> : <FaEye />}
            </span>
         </Form.Group>
      </>
   )
}

export default PasswordInputField