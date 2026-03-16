import React,{useEffect, useState} from 'react';
import api from '../api/axios';
import { Launcher } from '../types/types';
import { useParams } from 'react-router-dom';

const PageDetailsLaunche:React.FC = () => {
  const {id} = useParams<{id:string}>();
  const [launcher, setLauncher] = useState<Launcher[]>([])

  useEffect(() => {
    const fetchLaunchers = async () =>{
      const respon =await api.get(`/launchers/${id}`);
      setLauncher(respon.data)
    }
    fetchLaunchers();
  },[id])
  if(!launcher){
    return <div>Loading</div>
  }
  

  return (
    <div>
      <h1>{launcher.name}</h1>
      <p>Rocket type:{launcher.rocketType}</p>
      <p>Location:{launcher.latitude},{launcher.longitude}</p>
      <p>City:{launcher.city}</p>
    </div>
  )
}

export default PageDetailsLaunche