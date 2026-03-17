import React from 'react'
import { Navigate } from 'react-router-dom'
import  {useAuth} from '../store/useUsers';
import type { UserType } from '../types/user';



interface ProtectedRouteProps {
    children:React.ReactElement,
    allowedTypes?: Array<UserType>;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedTypes }) => {
    const {user, loading} = useAuth();
    if(loading){
    return <div className='page'>Loading...</div>;
    }
    if(!user){
    return <Navigate to='/login' />;
    }
    if (allowedTypes && !allowedTypes.includes(user.type_user as UserType)) {
        return <div><Navigate to= '/login'></Navigate></div>
    }
    return <>{children}</>;
}

export default ProtectedRoute
