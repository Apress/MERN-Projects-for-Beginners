import React, { useState } from 'react'
import { Avatar, Input } from '@material-ui/core'
import VideocamIcon from '@material-ui/icons/Videocam'
import PhotoLibraryIcon from '@material-ui/icons/PhotoLibrary'
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon'
import styled from 'styled-components'
import { useStateValue } from '../StateProvider'
import axios from '../axios'
import FormData from 'form-data'

const Messenger = () => {
    const [input, setInput] = useState('')
    const [image, setImage] = useState(null)
    const [{ user }, dispatch] = useStateValue()

    const handleChange = e => {
        if(e.target.files[0])
            setImage(e.target.files[0])
    }

    const handleSubmit = e => {
        e.preventDefault()
        console.log(image)
        if(image) {
            const imgForm = new FormData()
            imgForm.append('file',image, image.name)
            axios.post('/upload/image', imgForm, {
                headers: {
                    'accept': 'application/json',
                    'Accept-Language': 'en-US,en;q=0.8',
                    'Content-Type': `multipart/form-data; boundary=${imgForm._boundary}`
                }
            }).then(res => {
                const postData = {
                    text: input,
                    imgName: res.data.filename,
                    user: user.displayName,
                    avatar: user.photoURL,
                    timestamp: Date.now()
                }
                savePost(postData)
            })
        } else {
            const postData = {
                text: input,
                user: user.displayName,
                avatar: user.photoURL,
                timestamp: Date.now()
            }
            savePost(postData)
        }
        setInput('')
        setImage(null)
    }

    const savePost = async postData => {
        await axios.post('/upload/post', postData)
            .then(res => {
                console.log(res)
            })
    }

return (
        <MessengerWrapper>
            <MessengerTop>
                <Avatar src={user.photoURL} />
                <form>
                    <input
                        type="text"
                        className="messenger__input"
                        placeholder="What's on your mind?"
                        value={input}
                        onChange={e => setInput(e.target.value)}
                    />
                    <Input
                        type="file"
                        className="messenger__fileSelector"
                        onChange={handleChange}
                    />
                    <button onClick={handleSubmit} type="submit">Hidden</button>
                </form>
            </MessengerTop>
            <MessengerBottom>
                <div className="messenger__option">
                    <VideocamIcon style={{ color: 'red' }} />
                    <h3>Live Video</h3>
                </div>
                <div className="messenger__option">
                    <PhotoLibraryIcon style={{ color: 'green' }} />
                    <h3>Photo/Video</h3>
                </div>
                <div className="messenger__option">
                    <InsertEmoticonIcon style={{ color: 'orange' }} />
                    <h3>Feeling/Activity</h3>
                </div>
            </MessengerBottom>
        </MessengerWrapper>
    )
}

const MessengerWrapper = styled.div`
    display: flex;
    margin-top: 30px;
    flex-direction: column;
    background-color: white;
    border-radius: 15px;
    box-shadow: 0px 5px 7px -7px rgba(0,0,0,0.75);
    width: 100%;
`

const MessengerTop = styled.div`
    display: flex;
    border-bottom: 1px solid #eff2f5;
    padding: 15px;
    form {
        flex: 1;
        display: flex;
        .messenger__input {
            flex: 1;
            outline-width: 0;
            border: none;
            padding: 5px 20px;
            margin: 0 10px;
            border-radius: 999px;
            background-color: #eff2f5;
        }
        .messenger__fileSelector{
            width: 20%;
        }
        button {
            display: none;
        }
    }
`
const MessengerBottom = styled.div`
    display: flex;
    justify-content: space-evenly;
    .messenger__option{
        padding: 20px;
        display: flex;
        align-items: center;
        color: gray;
        margin: 5px;
        h3{
            font-size: medium;
            margin-left: 10px;
        }
        &:hover{
            background-color: #eff2f5;
            border-radius: 20px;
            cursor: pointer;
        }
    }
`

export default Messenger