//import { useRef } from 'react'
import { useState,useCallback ,useEffect,useRef} from 'react'

//import './App.css'
//import { useEffect } from 'react'
// Approach: To make this Project
// first we have to take length, number character: by using usestate
// default value : length=8, number=false character=flase
//
/*
password ko bhi state me rakhna hoga : default value ""
password generator method : 



// useRef : hook used for the reference 






*/ 
function App() {
  const[length, setLength]=useState(8)
  const[numberAllowed, setNumberAllowed]=useState(false)
  const[character, setCharacter]=useState(false)
  const[password, setPassword]=useState("")
const passwordGenerator=useCallback(()=>{
  // create varaible 
  let pass=""
  // iss string k andar wo deta hoga jisse mai password 
  // bana raha hu 
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
  // if number allowed and charachter allowed
  if(numberAllowed) str+="0123456789"
  if(character) str+="!@#$%^&*-_+=[]{}~`"
  for(let i=1; i<=length; i++){
   // here we create our password: use Math.random
   let char= Math.floor(Math.random()*str.length+1)
   pass+=str.charAt(char)
  }
  setPassword(pass)
},[length,numberAllowed,character,setPassword])

useEffect(()=>{
  passwordGenerator()
},[length,numberAllowed,character,passwordGenerator])

// ref hook
const passwordref=useRef(null)

const copyPasswordClipboard= useCallback(()=>{
  // password ko copy karne k liye use kiya hai 
  passwordref.current?.select();
  passwordref.current?.setSelectionRange(0,100);
window.navigator.clipboard.writeText(password)
},[password])


  return (
    <>
     <div className='w-full max-w-md max-auto shadow-md px-4 py-3
     my-8 bg-gray-800 text-orange-600'>
     <h1 className='text-4xl text-center my-3' >Password generator </h1>
     <div className='flex shadow rounded-lg overflow-hidden mb-4'>
      <input 
      type="text"
      value={password}
      placeholder='Password'
      className='outline-none w-full py-1 px-3'
      readOnly
      ref={passwordref}
      
      />
      <button className='outline-none bg-blue-700 text-white px-3 
      py-0.5 '
      onClick={copyPasswordClipboard}>Copy</button>

    </div>
    <div className='flex text-sm gap-x-2'>
      <div className='flex items-center gap-x-1'>
<input 
type="range"
min={6}
max={100}
value={length}
className='cursor-pointer'
onChange={(e)=>{setLength(e.target.value)}}
/>
<label for="length">Length:{length}</label>
      </div>
      <div className='flex items-center gap-x-1'>
<input 
type='checkbox'
id='numberInput'
onChange={()=>{setNumberAllowed((prev)=>!prev);}}
/>
<label for="numberInput">Numbers</label>
      </div>

      <div className='flex items-center gap-x-1'>
<input 
type='checkbox'
id='characterInput'
onChange={()=>{setCharacter((prev)=>!prev);}}
/>
<label for="characterInput">Character</label>
      </div>
    </div>

     
     </div>
    </>
  )
}

export default App
