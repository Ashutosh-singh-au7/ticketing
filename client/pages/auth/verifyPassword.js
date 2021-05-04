import { useState } from 'react';
import Router from  'next/router';
import useRequest from '../../hooks/use-request';

export default ()=>{
    const [newPass,setPassword] = useState('')
    const [resetLink,setResetLink] = useState('')
    const { doRequest, errors } = useRequest({
        url: `/api/users/resetpassword`,
        method: 'put',
        body:{
            newPass,
            resetLink
        },
        onSuccess:()=> Router.push('/auth/signin')
    });

    const onSubmit = async(e)=>{
        e.preventDefault();

        await doRequest();
    };

    return(
        <form onSubmit={onSubmit}>
            <h1>Password Reset Page</h1>
            <div className = "form-group">
                <label>Enter New Password</label>
                <input 
                    value={newPass} 
                    onChange={(e)=> setPassword(e.target.value)} 
                    className = "form-control" 
                />
                <label>Kindly,copy reset link token from link in Mail and paste it here to proceed Further😜🥳</label>
                <input 
                value={resetLink} 
                onChange={(e)=> setResetLink(e.target.value)} 
                className = "form-control" 
                />
            </div>
            {errors}
            <button className = "btn btn-primary">Click me to reset password</button>
        </form>
    );
};