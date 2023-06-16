import './Notes.css'
import Box from '@mui/material/Box'
import './Portal.css'
import { Grid, Typography } from '@mui/material';
import { useContext, useState , useEffect} from 'react';
import { AuthContext } from '../App';
import { useNavigate, useLocation} from 'react-router-dom';
import { Button } from "@mui/material"
import { makePostRequest , makeGetRequest} from '../Utils/requests';
import { TextField } from '@mui/material'
import { SideBar } from '../Components/SideBar';
import Plus from "../Assets/plus.svg"
import Trash from "../Assets/trash.svg"
import Search from "../Assets/search-icon.svg"
import Switch from '@mui/material/Switch';
import { Fragment } from 'react';
import FormControlLabel from '@mui/material/FormControlLabel';


export const Notes = () => {

    const [noteCount, setNoteCount] = useState(0)
    const { setAuth } = useContext(AuthContext)
    const { user } = useContext(AuthContext)
    const [notes, setNotes] = useState([])
    const nav = useNavigate();
    const [expanded, setExpanded] = useState(false)
    const location = useLocation()
    const [editNote, setEditNote] = useState(false)
    const [anim, setAnim] = useState(false)
    const [searchQuery, setSearchQuery] = useState('');
    const [checked, setChecked] = useState(false);

    const handleExpand = () => {
        setExpanded(true)
    }

    const handleSetChecked = () => {
        if (checked)
            setChecked(false)
        else   
            setChecked(true)
    }

    const handleEditNote = (id) => {
        setEditNote(id)
        console.log("BUTTON PRESSED")
        console.log(id)
    }

    const handleSearchQuery = (event) => {
        setSearchQuery(event.target.value)
    }


    const handleEditNoteClick = async (event) => {
        event.preventDefault()
        setEditNote(false)

        const data = new FormData(event.target)
        const note = {
            title: data.get('title'),
            text: data.get('text'),
            id: editNote.id
        }


        try{
            const res = await makePostRequest('http://localhost:3001/portal/edit',
             note);
            if (res.error){
                console.log(res.errorMessage)
                console.log('error on editing note')
                return;
            }
        }
        catch(err){
            console.log("error on posting note")
            return
        }
        setNoteCount(noteCount + 1)
    }

    const handleDelete = async (title, text, id) => {
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
            }
            catch (err){
                console.log(err.error)
                return
            }
        
    }

    const RegNote = (title, text, id, date) => {

        const note ={
            title: title,
            text: text,
            date: date,
            id: id
        }

        const newDate = new Date(date)

        const options = { year: 'numeric', 
            month: 'long', 
            day: 'numeric' , 
        };
        const dateString = newDate.toLocaleString(undefined, options)
          
        return (     
            <div className='Note'>

                <Box
                 sx={{
                    height: "80%",
                    '&:hover': {
                        cursor: 'grab',
                    },
                    overflow: "hidden",
                 }}
                 onClick={() => handleEditNote(note)}>
                    <Typography
                        variant="h5"
                        fontFamily="roboto"
                        overflow='hidden'
                        style={{
                            paddingLeft: '5%',
                            paddingTop: '5%',
                        }}
                    >
                        {title}
                    </Typography>
                    <Typography
                        component="p"   
                        style={{
                            paddingLeft: "5%",
                            paddingTop: "5%",
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                        }}      
                    >
                        {text}
                    </Typography>
                </Box>
                    <Box
                    sx={{
                        height: "20%",
                        width: "70%",
                        position: 'absolute',
                        paddingLeft: "5%",
                        paddingTop: "5%"
                    }}>
                        {dateString}
                    </Box>
                    <Button
                        onClick={() => handleDelete(title, text, id)}
                        style={{
                            width: "10%",
                            height: "10%",
                            left: "75%",
                            position: "absolute"
                        }}
                        >
                            <img 
                                src = { Trash }
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
                {editNote && (
                    <AddEditNote/>
                )}
            </div>)
    }


    const AddEditNote = () => {

        return (                
            <div className='BigNote'>  
                <Box
                    component="form"
                    onSubmit={handleEditNoteClick}
                >
                    <TextField
                        name="title"
                        defaultValue={editNote.title}
                    >
                    </TextField>
                    <TextField
                        sx={{
                            height: 100
                        }}
                        defaultValue={editNote.text}
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
                        Edit Note
                    </Button>
                </Box>
            </div>)
    }

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
            console.log(user)
            try{
                const res = await makePostRequest('http://localhost:3001/portal/getnote', user);
                console.log(res)    
                if (res.error){
                    console.log("error")
                    return
                }

                if (!checked){
                    res.sort((a, b) => (new Date(b.date) - new Date(a.date)))
                    setNotes(res) 
                    setNoteCount(res.length)
                }
                if (checked){
                    res.sort((a, b) => (b.text.length - a.text.length))
                    setNotes(res) 
                    setNoteCount(res.length)
                }

                if (searchQuery !== "")
                {
                    console.log(searchQuery)
                    const filtered = res.filter(
                        (note) => {return note.title.includes(searchQuery) || note.text.includes(searchQuery)})
                        setNotes(filtered) 
                        setNoteCount(filtered.length)
                }
                console.log(res)

            }
            catch (err){
                console.log(err.error)
                return
            }
        }
        if (user){
            fetchNotes();
        }
    }, [noteCount, user, searchQuery, checked])

    const notesTest = notes.map((note, i) => (
        RegNote(note.title, note.text, note._id, note.date)
    ))

    const handleClick = async (event) => {
        event.preventDefault();
        setExpanded(false)
        const data = new FormData(event.target)
        const newDate = new Date()
        const note = {
            title: data.get('title'),
            text: data.get('text'),
            date: newDate
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
        <div 
        className='NoteBox'
        style={{
            display: 'flex',
            flexDirection: 'column'
        }}>
            <div className='SearchBar'>
                <div
                style={{
                    width: "50%"
                }}>
                    <TextField
                        sx={{
                            height: 50,
                            width: "50%",
                            top: 0,
                            padding: 0,
                            overflow: "hidden",
                            backgroundColor: "",
                        }}
                        label="Search"
                        variant="filled"
                        value={searchQuery}
                        onChange={handleSearchQuery}
                    />
                    <img 
                        style={{
                            height: "75%",
                        }}
                        src={Search} alt='Search'/>
                </div>
                <div
                style={{width: "25%", display: 'flex'}}>
                    <div className='centered'>
                        <Typography
                            style={{
                                textAlign: "center"
                            }}
                            >
                                Sort by date
                        </Typography>
                    </div>
                    <FormControlLabel 
                        control={
                            <Switch 
                                defaultChecked 
                                checked={checked}
                                onChange={handleSetChecked}
                            />}
                    />
                    <div className='centered'>
                        <Typography
                            style={{
                                textAlign: "center"
                            }}
                            >
                                Sort by size
                        </Typography>
                    </div>
                </div>
            </div>
            <div style={{ display: 'flex',
                flexDirection: 'row',
                gap: '2.5%',
                flexWrap: 'wrap',
                overflow: "auto"}}>
                <AddNote/>
                { notesTest }
            </div>
        </div>
    )
}