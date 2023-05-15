import './Notes.css'
import Box from '@mui/material/Box'
import './Portal.css'
import { Grid, Typography } from '@mui/material';
import { useContext, useState , useEffect} from 'react';
import { AuthContext } from '../App';
import { useNavigate } from 'react-router-dom';
import { Button } from "@mui/material"
import { makePostRequest , makeGetRequest} from '../Utils/requests';
import { TextField } from '@mui/material'
import Plus from "../Assets/plus.svg"
import Trash from "../Assets/trash.svg"


export const Notes = () => {

    const [noteCount, setNoteCount] = useState(0)
    const { setAuth } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const [notes, setNotes] = useState([])
    const nav = useNavigate();
    const [expanded, setExpanded] = useState(false)
    // const noteCount = 3

    const handleExpand = () => {
        setExpanded(true)
    }

    const handleDelete = async (title, text, id) => {

        // const DeleteNote = async () => {
            const note ={
                title: title,
                text: text,
                id: id
            }

            try{
                console.log("deleting")
                const res = await makePostRequest('http://localhost:3001/portal/deletenote', note);
                console.log(res)
                if (res.error){
                    console.log("error")
                    return
                }
                setNoteCount(noteCount - 1)
                //might have to fetch notes again here but check and see
            }
            catch (err){
                console.log(err.error)
                return
            }
        
    }

    const RegNote = (title, text, id) => {

        return (     
            <div className='Note'>
                <Box
                 sx={{
                    height: "80%"
                 }}
                >
                    <Typography
                        variant="h5"
                        fontFamily="Garamond"
                        overflow='hidden'
                        style={{
                            borderBottom: '1px solid #000',
                            // whiteSpace: 'nowrap',
                            // textOverflow: 'ellipsis',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        component="p"   
                        style={{
                            // whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}      
                    >
                        {text}
                    </Typography>
                </Box>
                <Button
                    // onClick={handleDelete(title, text, id)}
                    onClick={() => handleDelete(title, text, id)}
                    style={{
                        width: "10%",
                        left: "77.5%",
                        // position: "relative",
                        // bottom: "5%",
                        // top: "0%",
                        // left: "0%",
                        // zIndex: "999"
                    }}
                    >
                        <img 
                            src = { Trash }
                            style={{
                                width: '75%',
                            }}
                            alt = "delete note"
                        ></img>
                </Button>
            </div>)
    }

    const AddNote = () => {

        return (
            <div className='Note'>  
                {!expanded && (
                    <Button
                    onClick={handleExpand}
                    sx={{
                        height: '100%'
                    }}>
                        <img 
                            src = { Plus }
                            style={{
                                width: '75%',
                            }}
                            alt = "add note"
                        ></img>
                    </Button>
                )}
                {expanded && (
                    <AddTestNote/>
                )}
            </div>)
    }

    // .note {
    //     background-color: lightblue;
    //     width: 200px;
    //     height: 200px;
    //     transition: all 0.3s ease;
    //   }
      
    //   .note.expanded {
    //     width: 100%;
    //     height: 100vh;
    //   }

    const AddTestNote = () => {

        return (                
            <div className='BigNote'>  
                <Box
                    component="form"
                    onSubmit={handleClick}
                >
                    <TextField
                        name="title"
                    >
                    </TextField>
                    <TextField
                        sx={{
                            height: 100
                        }}
                        name="text"
                    ></TextField>
                    <Button 
                        type="submit"
                        variant='contained'
                        sx={{
                            width: 1/5,
                            display: 'block',
                            fontSize: 15,
                            mx: 'auto'
                        }}
                    > 
                        Create Note
                    </Button>
                </Box>
            </div>)
    }

    useEffect(() =>{
        const fetchNotes = async () => {
            try{
                const res = await makePostRequest('http://localhost:3001/portal/getnote', user);
                console.log(res)    
                if (res.error){
                    console.log("error")
                    return
                }
                setNotes(res)
                setNoteCount(res.length)
            }
            catch (err){
                console.log(err.error)
                return
            }
        }
        fetchNotes();
    }, [noteCount])

    const notesTest = notes.map((note, i) => (
        RegNote(note.title, note.text, note._id)
    ))

    // const notesTest = Array.from({ length: notes }, (_, i) => (
    //     <div key={i} className='Note'>
    //         Box {i + 1}
    //     </div>
    // ))


    const handleClick = async (event) => {
        event.preventDefault();
        setExpanded(false)
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



    return (
        <div className='NoteBox'>
            <div style={{ display: 'flex', flexDirection: 'row', gap: '2.5%', flexWrap: 'wrap'}}>
                {/* {notesTest} */}
                { notesTest }
                <AddNote/>
            </div>
        </div>
    )
}