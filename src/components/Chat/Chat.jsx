import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/authContext';
import { db } from "../../fire";
import { collection, addDoc, onSnapshot, query, doc, deleteDoc } from "firebase/firestore";
import { Button, Container, Grid, TextField } from '@mui/material';







const Chat = () => {
    const { user: { email } } = useAuth();
    const [messages, setMessages] = useState([]);
    const [value, setValue] = useState('');

    const handleMessageSend = async (e) => {
        await addDoc(collection(db, "messages"), {
          user: email,
          message: value,
          createdData: Date.now(),
        });
        setValue('');
    };
    
    
    useEffect(() => {
        const q = query(collection(db, 'messages'))
        const unsub = onSnapshot(q, (querySnapshot)=> {
          let messagesArray = [];
          querySnapshot.forEach((doc)=>{
            messagesArray.push({...doc.data()})
          });
          messagesArray.sort((a,b)=>(a.createdData - b. createdData))
          setMessages(messagesArray)
        })
      }, []);


    return (
        <div  style={{backgroundColor:'#e9e9e9'}}>
            <Container>
                <Grid container
                    justify={"center"}  
                >
                    <div style={{width:'70%', height:'60vh', border:'1px solid grey', overflowY:'auto', margin:'30px auto 0', background:'white'}}>
                        {messages.map((item)=>(
                            <div key={item.createdData} style={{margin:'10px', 
                                        padding:'5px',
                                        marginLeft: email===item.user ? "auto" : '10px',
                                        width:'fit-content'}}>
                                <Grid container>
                                    <div style={{fontWeight:'600', color: email===item.user ? "green" :"black"}}>{item.user}</div>
                                </Grid>
                                <div>{item.message}</div>
                            </div>
                        ))}
                    </div>
                </Grid>
                
                <Grid container
                    direction={'column'}
                    alignItems={'flex-end'}
                    style={{width:'70%', margin:'0 auto', paddingRight:'8px'}}
                >
                    <TextField
                        fullWidth
                        style={{margin:'5px', background:'white'}}
                        maxRows={2}
                        variant={'outlined'}
                        value={value}
                        onChange={(e)=>setValue(e.target.value)}
                    />
                    <Button onClick={handleMessageSend} variant="contained" style={{margin:'10px 20px 15px 0'}}>Отправить</Button>

                </Grid>
            </Container>
        </div>
    );
};

export default Chat;