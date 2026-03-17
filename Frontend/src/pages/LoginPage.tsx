import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../store/useUsers';

const LoginPage:React.FC = () => {
    const navigate = useNavigate()
    const {login} = useAuth();
    const [formData, setFormData] = useState({
        username:"",
        password: ""
    })
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

     const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
      ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
      const handleSubmit = async (e: React.FormEvent) => {
          e.preventDefault();
          setError(null)

          if(!formData.username || !formData.password){
            setError("Username end password are requiresd")
            return;
          }
          try{
            setLoading(true);
            await login(formData.username, formData.password)
            navigate('/')
          }catch(err){
            setError("login falied")
          }finally{
            setLoading(false)
          }
      }
  return (
    <div className='app'>
        <header className='page-header'>
            <div>
                <h1>Login</h1>
            </div>
        </header>
        <form onSubmit={handleSubmit} className='form-card'>
            <div className='form-grid'>
                <input 
                type="text"
                name='username'
                placeholder='Username'
                value={formData.username}
                onChange={handleChange}
                required
                 />
                 <input 
                 type="text"
                 name='password'
                 placeholder='Password'
                 value={formData.password}
                 onChange={handleChange}
                 required
                  />
            </div>
            {error && <p className='error-text'>{error}</p>}
            <button className='primary-button' type='submit' disabled={loading}>
                {loading ? "Signing in": "Login"}
            </button>
        </form>
    </div>
  )
}

export default LoginPage