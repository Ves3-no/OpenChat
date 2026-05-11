import { useEffect, useState } from 'react'
import './App.css'

function App() {
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([])
  const [username, setUsername] = useState("")
  const [userTrue, setUserTrue] = useState(false)
   useEffect(()=> {
      const interval = setInterval(
        ()=> {
          getMessage(message, setMessage, setMessages, username)
        }, 3000) 
        return () => clearInterval(interval)
    }, [])
  return (
    <div className='bg-slate-800 flex items-center justify-center h-screen w-full'>
    <div className='flex items-center flex-col aspect-[6/8] bg-gray-600 rounded-lg min-w-lg max-h-[85vh] max-w-[90%] overflow-hidden' >
      <h1 className='text-gray-50 font-medium text-4xl flex-2 items-center flex text-shadow-md text-shadow-slate-800 font-[cause]'>Open chat</h1>
      <div className='flex flex-col gap-4 flex-10 border border-slate-200 w-[75%] rounded-lg p-5 overflow-y-scroll' >
          {messages.map((message, index) => (
            message.username == username ? 
            <div className='bg-pink-200 p-3 rounded-2xl font-[cause] text-left self-end w-fit min-w-40 gap-1 flex flex-col'>
            <p className='text-gray-900 font-[cause] opacity-70 border-b border-gray-900'>{message.username}</p>
            <h1 key={index} className='text-gray-900 p-1 bg-gray-50 p-1 rounded-md'>{message.message}</h1>
            </div>
            : <div className='bg-indigo-200 p-3 rounded-2xl font-[cause] text-left self-start w-fit min-w-40 gap-1 flex flex-col '>
            <p className='text-gray-900 font-[cause] border-b border-gray-900 opacity-70 '>{message.username}</p>
            <h1 key={index} className='text-gray-900 p-1 bg-gray-50 p-1 rounded-md'>{message.message}</h1>
            </div>
          ))}
      </div>
      <form onSubmit={(e) => {
        e.preventDefault();
        sendMessage(message, setMessage, setMessages, username);
      }} className='flex gap-4 flex-1 p-6 flex-row gap-1 w-full'>
        <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} required className='flex-2 text-gray-900 bg-slate-200 rounded-lg p-4 font-[cause]' placeholder='Skriv noe da!'/>
        <input className='p-2 flex-1 rounded-md bg-emerald-200 text-gray-900 hover:bg-emerald-300 transition  duration-300 ease-in-out font-[cause]' type='submit' value={"Send"} />
      </form>
    </div>
    <div style={{ display: userTrue ? 'none' : 'flex' }} className='absolute w-full z-2 h-full bg-slate-800'>

    </div>
      <form onSubmit={(e)=> {e.preventDefault(); setUserTrue(true)}} style={{ display: userTrue ? 'none' : 'flex' }} className='z-3 flex items-center flex-col aspect-[9/3] bg-gray-600 rounded-lg min-w-xs py-3 absolute'>
          <h1 className='text-gray-50 font-medium text-2xl flex-2 items-center flex text-shadow-md text-shadow-slate-800 font-[cause]'>Skriv et brukernavn</h1>
          <div className='flex-1 p-2 gap-4 flex items-center flex-row w-[90%]'>
            <input type="text" placeholder='Username' onChange={(e) => setUsername(e.target.value)} className='flex-3 text-gray-900 bg-slate-200 rounded-lg p-4 font-[cause] h-full '/>
            <input type="submit" value={"Lagre"} className='p-2 flex-2 rounded-md bg-emerald-200 text-gray-900 hover:bg-emerald-300 transition  duration-300 ease-in-out font-[cause] w-3xs h-full'/>
          </div>
      </form>
    </div>
  )
}
async function getMessage(message, setMessage, setMessages, username){
    const data = await fetch("https://backendop.ves3.no/Message", {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    });
    data.json().then((data) => {
    console.log(data)
    setMessages(data);
    })
}
async function sendMessage(message, setMessage, setMessages, username){
    await fetch("https://backendop.ves3.no/Message", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ Message: message, Username: username })
    });
    setMessage("")
    getMessage(message, setMessage, setMessages, username)
}
export default App
