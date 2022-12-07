import './App.css';
import React, {useEffect, useState} from 'react'
import Chat from './components/Chat';
import Sidebar from './components/Sidebar';
import axios from 'axios';
import instance from './components/instance';
import Login from './components/Login';
import Pusher from 'pusher-js'
import {useStateValue} from './components/StateProvider';



function App() {
  const [messages, setMessages] = useState([])
  const [{user}, dispatch] = useStateValue([])

  useEffect(
    ()=>{
      instance.get("/messages/sync").then(res =>{
        setMessages(res.data)
      })
    },[]
  )

useEffect(()=>{
  const pusher=new Pusher('9e297c1b3f7413a26cce',{
    cluster:'ap2'
  });
  const channel=pusher.subscribe('messages');
  channel.bind('inserted', (data)=>{
    setMessages([...messages, data])
  })

  return ()=>{
    channel.unbind_all()
    channel.unsubscribe()
  }
  
}, [messages])

console.log(messages)

return(
  <div className='app'>
    { !user ? <Login /> : (
      <div className='app__body'>
        <Sidebar messages={messages} />
        <Chat messages={messages} />
      </div>
    )}
  </div>
);

}

export default App;
