import { useState } from 'react';
import Router from  'next/router';
import useRequest from '../../hooks/use-request';

export default ()=>{
    const [email,setEmail] = useState('');
    const { doRequest, errors } = useRequest({
        url: '/api/users/forgotpassword',
        method: 'put',
        body:{
            email
        },
        onSuccess:()=> Router.push('/auth/verifyPassword')
    });

    const onSubmit = async(e)=>{
        e.preventDefault();

        await doRequest();
    };

    return(
        <form onSubmit={onSubmit}>
            <h1>Password Reset Page</h1>
            <div className = "form-group">
                <label>Email Address</label>
                <input 
                    value={email} 
                    onChange={(e)=> setEmail(e.target.value)} 
                    className = "form-control" 
                />
            </div>
            {errors}
            <button className = "btn btn-primary">Send mail</button>
        </form>
    );
};