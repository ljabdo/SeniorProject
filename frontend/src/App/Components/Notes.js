import './Notes.css'
import Box from '@mui/material/Box'
import './Portal.css'
import { Grid } from '@mui/material';
import { useContext, useState } from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"
import { makePostRequest } from '../Utils/requests';
import { TextField } from '@mui/material'


export const Notes = () => {

    const [noteCount, setNoteCount] = useState(0)
    const { setAuth } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const nav = useNavigate();
    // const noteCount = 3

    const notes = Array.from({ length: noteCount }, (_, i) => (
        <div key={i} className='Note'>
            Box {i + 1}
        </div>
    ))

    const handleClick = async (event) => {
        event.preventDefault();
        const data = new FormData(event.target)
        const note = {
            title: data.get('title'),
            text: data.get('text'),
        }

        note.user = user

        console.log(note)
        console.log(user)

        try{
            const res = await makePostRequest('http://localhost:3001/portal/note',
             note,
             user
             );
            if (res.error){
                console.log('error on posting note')
                return;
            }
        }
        catch(err){
            console.log("error on posting note")
            return
        }

        setNoteCount(noteCount + 1)
    }

    const AddNote = () => {

        return (                
            <div className='Note'>  
                <Box
                    component="form"
                    onSubmit={handleClick}
                >
                    <TextField
                        name="title"
                    >
                    </TextField>
                    <TextField
                        name="text"
                    ></TextField>
                    <Button 
                        type="submit"
                        variant='contained'
                    > 
                        PRESS HERE FOR NEW NOTE
                    </Button>
                </Box>
            </div>)
    }

    return (
        <div className='NoteBox'>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5%', flexWrap: 'wrap'}}>
                {notes}
                <AddNote/>
            </div>
        </div>
    )
}