import React, {useEffect, useState} from 'react'
import {Avatar,IconButton} from '@mui/material'
import AttachFileIcon from '@mui/icons-material/AttachFile';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import InsertEmoticonIcon from '@mui/icons-material/InsertEmoticon';
import MicIcon from '@mui/icons-material/Mic';
import './Chat.css'
import axios from './axios'
import instance from './instance'
import {useStateValue} from './StateProvider';

const Chat=({messages})=>{
    const [seed, setSeed]=useState("")
    const [input, setInput]=useState("")
    const [{user}, dispatch]=useStateValue()

    const sendMessage=async(e)=>{
        e.preventDefault()
        await axios.post('/messages/new',{
            messages: input,
            name: user.displayName,
            timestamp: new Date().toUTCString(),
            received: true  
        })
        setInput("")
    }

    useEffect(()=>{
        setSeed(Math.floor(Math.random()*5000))
    },[])

    return(
        <div className='chat'>
            <div className='chat__header'>
                <Avatar src={`https://avatars.dicebear.com/api/human/b$%7Bseed%7D.svg`} />
                <div className='chat__headerInfo'>
                    <h3>Dev Help</h3>
                    <p>Last seen at {" "}
                        {messages[messages.length -1]?.timestamp}
                    </p>
                </div>
                <div className='chat__headerRight'>
                    <IconButton>
                        <SearchOutlinedIcon />
                    </IconButton>
                    <IconButton>
                        <AttachFileIcon />
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon />
                    </IconButton>
                </div>
            </div>

      {/* f */}
            <div className='chat__body'>
                {messages.map(message =>(
                    <p className={`chat__message ${message.name === user.displayName && 'chat__timestamp'}`}>
                        <span className='chat__name'>{message.name}</span>
                            {message.message}
                        <span className='chat__timestamp'>
                            {message.timestamp}
                        </span>
                    </p>
                ))}
            </div>
            <div className='chat__footer'>
                <InsertEmoticonIcon />
                <form>
                    <input
                        value ={input}
                        onChange={e => setInput(e.target.value)}
                        placeholder="Type a message"
                        type="text"
                        />
                        <button onClick={sendMessage} type="submit">Send a message</button>

                </form>
                <MicIcon />
            </div>
        </div>
    )


}
export default Chat


