// React Imports
import { useRef, useState, useEffect } from 'react'

// MUI Imports
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import Popper from '@mui/material/Popper'
import Fade from '@mui/material/Fade'
import Paper from '@mui/material/Paper'
import ClickAwayListener from '@mui/material/ClickAwayListener'
import Menu from '@mui/material/Menu'
import MenuItem from '@mui/material/MenuItem'

// Third-party Imports
import Picker from '@emoji-mart/react'
import data from '@emoji-mart/data'

// Slice Imports
import { sqla } from '.'

import { sendMsg } from '@/redux-store/slices/chat'

// Component Imports
import CustomIconButton from '@core/components/mui/IconButton'

const axios = require('axios')

const googleApiKey = process.env.GOOGLEGEMINI_API_KEY
const apiKey = process.env.CHATGPT_API_KEY

// Emoji Picker Component for selecting emojis
const EmojiPicker = ({ onChange, isBelowSmScreen, openEmojiPicker, setOpenEmojiPicker, anchorRef }) => {
  return (
    <>
      <Popper
        open={openEmojiPicker}
        transition
        disablePortal
        placement='top-start'
        className='z-[12]'
        anchorEl={anchorRef.current}
      >
        {({ TransitionProps, placement }) => (
          <Fade {...TransitionProps} style={{ transformOrigin: placement === 'top-start' ? 'right top' : 'left top' }}>
            <Paper>
              <ClickAwayListener onClickAway={() => setOpenEmojiPicker(false)}>
                <span>
                  <Picker
                    emojiSize={18}
                    theme='light'
                    data={data}
                    maxFrequentRows={1}
                    onEmojiSelect={emoji => {
                      onChange(emoji.native)
                      setOpenEmojiPicker(false)
                    }}
                    {...(isBelowSmScreen && { perLine: 8 })}
                  />
                </span>
              </ClickAwayListener>
            </Paper>
          </Fade>
        )}
      </Popper>
    </>
  )
}

//reverse proxy api
async function makeOPENCHATAIGetRequest(message) {
  const url = 'https://hroomdeveloper-ai-proxy.hf.space/api/v1/chat/completions'

  let returnResponse = ''

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${apiKey}`
  }

  const data = {
    model: 'gpt-4', // Or use 'gpt-3.5-turbo' if you are using GPT-3.5
    messages: [{ role: 'user', content: message }],
    max_tokens: 150
  }

  try {
    let response = await axios.post(url, data, { headers })

    returnResponse = response.data.choices[0].message.content

    console.log('ChatGPT:', returnResponse)
  } catch (error) {
    returnResponse = ''
    console.error('Error communicating with ChatGPT:', error.response ? error.response.data : error.message)
  }

  return returnResponse
}

async function makeGOOGLEGEMINIGetRequest(message) {
  const url = 'https://workers-playground-rapid-silence-e188.hroomdeveloper.workers.dev/v1/chat/completions'

  let returnResponse = ''

  const headers = {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${googleApiKey}`
  }

  const data = {
    model: 'gpt-3.5-turbo', // Or use 'gpt-3.5-turbo' if you are using GPT-3.5
    messages: [{ role: 'user', content: message }],
    max_tokens: 150
  }

  try {
    let response = await axios.post(url, data, { headers })

    returnResponse = response.data.choices[0].message.content

    console.log('Google gemini:', returnResponse)
  } catch (error) {
    returnResponse = ''
    console.error('Error communicating with Google Gemini:', error.response ? error.response.data : error.message)
  }

  return returnResponse
}

const SendMsgForm = ({ dispatch, activeUser, isBelowSmScreen, messageInputRef }) => {
  // States
  const [msg, setMsg] = useState('')
  const [anchorEl, setAnchorEl] = useState(null)
  const [openEmojiPicker, setOpenEmojiPicker] = useState(false)

  // Refs
  const anchorRef = useRef(null)
  const open = Boolean(anchorEl)

  const handleToggle = () => {
    setOpenEmojiPicker(prevOpen => !prevOpen)
  }

  const handleClick = event => {
    setAnchorEl(prev => (prev ? null : event.currentTarget))
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSendMsg = async (event, msg, rec) => {
    // Example usage
    if (rec == true) {
      event.preventDefault()

      if (msg.trim() !== '') {
        dispatch(sendMsg({ msg }))
        setMsg('')
      }

      let b = await makeOPENCHATAIGetRequest(msg)

      let g = await makeGOOGLEGEMINIGetRequest(msg)

      setMsg(b)

      setMsg(g)

      let chatgpt = 'ChatGPT advice: ' + b
      let gemini = 'Gemini advice: ' + g

      handleSendMsg(event, chatgpt, false)

      handleSendMsg(event, gemini, false)

      console.log('start to end')
      console.log('connect')
      console.log('after end')
    } else {
      dispatch(sendMsg({ msg }))
      setMsg('')
    }
  }

  const handleInputEndAdornment = () => {
    return (
      <div className='flex items-center gap-1'>
        {isBelowSmScreen ? (
          <>
            <IconButton
              size='small'
              id='option-menu'
              aria-haspopup='true'
              {...(open && { 'aria-expanded': true, 'aria-controls': 'share-menu' })}
              onClick={handleClick}
              ref={anchorRef}
            >
              <i className='ri-more-2-line text-textPrimary' />
            </IconButton>
            <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
              <MenuItem
                onClick={() => {
                  handleToggle()
                  handleClose()
                }}
                className='justify-center'
              >
                <i className='ri-emotion-happy-line text-textPrimary' />
              </MenuItem>
              <MenuItem onClick={handleClose} className='justify-center'>
                <i className='ri-mic-line text-textPrimary' />
              </MenuItem>
              <MenuItem onClick={handleClose} className='p-0'>
                <label htmlFor='upload-img' className='plb-2 pli-5'>
                  <i className='ri-attachment-2 text-textPrimary' />
                  <input hidden type='file' id='upload-img' />
                </label>
              </MenuItem>
            </Menu>
            <EmojiPicker
              anchorRef={anchorRef}
              openEmojiPicker={openEmojiPicker}
              setOpenEmojiPicker={setOpenEmojiPicker}
              isBelowSmScreen={isBelowSmScreen}
              onChange={value => {
                setMsg(msg + value)

                if (messageInputRef.current) {
                  messageInputRef.current.focus()
                }
              }}
            />
          </>
        ) : (
          <>
            <IconButton ref={anchorRef} size='small' onClick={handleToggle}>
              <i className='ri-emotion-happy-line text-textPrimary' />
            </IconButton>
            <EmojiPicker
              anchorRef={anchorRef}
              openEmojiPicker={openEmojiPicker}
              setOpenEmojiPicker={setOpenEmojiPicker}
              isBelowSmScreen={isBelowSmScreen}
              onChange={value => {
                setMsg(msg + value)

                if (messageInputRef.current) {
                  messageInputRef.current.focus()
                }
              }}
            />
            <IconButton size='small'>
              <i className='ri-mic-line text-textPrimary' />
            </IconButton>
            <IconButton size='small' component='label' htmlFor='upload-img'>
              <i className='ri-attachment-2 text-textPrimary' />
              <input hidden type='file' id='upload-img' />
            </IconButton>
          </>
        )}
        {isBelowSmScreen ? (
          <CustomIconButton variant='contained' color='primary' type='submit'>
            <i className='ri-send-plane-line' />
          </CustomIconButton>
        ) : (
          <Button variant='contained' color='primary' type='submit' endIcon={<i className='ri-send-plane-line' />}>
            Send
          </Button>
        )}
      </div>
    )
  }

  useEffect(() => {
    setMsg('')
  }, [activeUser.id])

  return (
    <form
      autoComplete='off'
      onSubmit={event => {
        handleSendMsg(event, msg, true)
      }}
      className=' bg-[var(--mui-palette-customColors-chatBg)]'
    >
      <TextField
        fullWidth
        multiline
        maxRows={4}
        placeholder='Type a message'
        value={msg}
        className='p-5'
        onChange={e => setMsg(e.target.value)}
        sx={{
          '& fieldset': { border: '0' },
          '& .MuiOutlinedInput-root': {
            background: 'var(--mui-palette-background-paper)',
            boxShadow: 'var(--mui-customShadows-xs)'
          }
        }}
        onKeyDown={e => {
          if (e.key === 'Enter' && !e.shiftKey) {
            handleSendMsg(e, msg, true)
          }
        }}
        size='small'
        inputRef={messageInputRef}
        InputProps={{ endAdornment: handleInputEndAdornment() }}
      />
    </form>
  )
}

export default SendMsgForm
