import React, { useEffect, useState } from 'react'
import { useRef } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import './Manager.css'

const Manager = () => {
    const ref = useRef()
    const [form, setForm] = useState({ site: '', username: '', password: '', id: '' })
    const passwordref = useRef()
    const [passwordArray, setpasswordArray] = useState([])


    useEffect(() => {
        let password = localStorage.getItem("password");
        if (password) {
            const parsedPasswordArray = JSON.parse(password);
            setpasswordArray(parsedPasswordArray);
            setpasswordArray(JSON.parse(password));
        } else {
            setpasswordArray([]);
        }
    }, [])

    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
        navigator.clipboard.writeText(text)
    }


    const showPassword = () => {
        passwordref.current.type = passwordref.current.type === "password" ? "text" : "password"
        if (ref.current.src.includes("icons/eye-slash-bootstrap.svg")) {
            ref.current.src = "icons/eye-bootstrap.svg"
        }
        else {
            ref.current.src = "icons/eye-slash-bootstrap.svg"
        }
    }

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast.error('All fields are required', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            return;
        }
        const newPasswordArray = [...passwordArray, { ...form, id: uuidv4() }];
        setpasswordArray(newPasswordArray);

        localStorage.setItem("password", JSON.stringify(newPasswordArray));
        setForm({ site: '', username: '', password: '', id: '' });
        toast('Password saved succesfully', {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "dark",

        });
    }
    const editPassword = (id) => {
        const newpasswordArray = passwordArray.filter((item) => item.id !== id)
        const editingItem = passwordArray.find((item) => item.id === id)
        setForm(editingItem)
        setpasswordArray(newpasswordArray)
        localStorage.setItem("password", JSON.stringify(newpasswordArray))
    }
    const deletePassword = (id) => {
        let c = window.confirm("Are you sure you want to delete this password?")
        if (c) {
            const newpasswordArray = passwordArray.filter((item) => item.id !== id)
            setpasswordArray(newpasswordArray)
            localStorage.setItem("password", JSON.stringify(newpasswordArray))
            toast('Password deleted succesfully', {
                position: "bottom-right",
                autoClose: 2500,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: false,
                draggable: true,
                progress: undefined,
                theme: "dark",

            });
        }

    }
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }


    return (
        <>
            <ToastContainer
                position="bottom-right"
                autoClose={2500}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"

            />
            <div className="fixed inset-0 -z-10 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]"></div>
            <div className="maincontent md:container rounded-3xl mycontainer  hover:border-zinc-900">
                <h1 className='font-bold text-white text-4xl text-center'><span className='text-green-800'>
                    &lt;
                </span>
                    <span>SchlüsselSAFE</span>
                    <span className='text-green-800'>
                        /&gt;
                    </span></h1>
                <p className='text-lg text-center text-green-800 font-bold py-2'>Your Personal Password Manager</p>

                <div className='text-black flex flex-col font-semibold p-4 gap-3 items-center'>
                    <input value={form.site} onChange={handleChange} placeholder='URL' className='inputfield rounded-full border border-violet-950 w-full border-[3px] p-3 py-1' type="text" id='site' name="site" />
                    <div className="flex md:flex-row w-full gap-[80px] justify-between p-4 px-0">
                        <input onChange={handleChange} value={form.username} placeholder='Username' className='inputfield rounded-full border border-violet-950 w-full border-[3px] p-3 py-1' type="text" name="username" id='username'/>
                        <div className="relative">
                            <input ref={passwordref} onChange={handleChange} value={form.password} placeholder='Password' className='inputfield rounded-full border w-full border-[3px] p-3 py-1' type="password" name="password" id='password' />
                            <span className='p-1 absolute right-[3px] top-[2px]' onClick={showPassword}>
                                <img width="26px" ref={ref} src="icons/eye-bootstrap.svg" alt="" />

                            </span>

                        </div>
                    </div>
                    <button onClick={savePassword} className='text-white flex justify-center items-center gap-2 rounded-full px-3 py-3 w-fit buttonbackground'>
                        <lord-icon
                            src="https://cdn.lordicon.com/sbnjyzil.json"
                            trigger="hover"
                            stroke="bold"
                            colors="primary:#0a5c15,secondary:#16c72e"
                        >
                        </lord-icon>
                        Add password</button>
                </div>

                <div className="password">
                    <h2 className='text-white font-bold text-2xl py-5'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-white text-center'>No passwords saved yet</div>}
                    {passwordArray.length != 0 &&
                        <table className="table-auto w-full yourpasswords rounded-3xl text-white">
                            <thead>
                                <tr>
                                    <th className=' py-2 w-[28%] rounded-s-3xl'>Site</th>
                                    <th className=' py-2 w-[28%]'>Username</th>
                                    <th className=' py-2 w-[28%] '>Password</th>
                                    <th className='py-2 w-[16px] rounded-e-3xl '>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {passwordArray.map((item) => {
                                    return <tr key={item.site}>
                                        <td className='border-b border-r xyz py-2 text-center w-32'>
                                            <div className='flex justify-center items-center gap-3'>
                                                <div className='w-24 flex overflow-hidden' >
                                                    <a className='hover:text-purple-500' href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                                </div>
                                                <div className='w-8 flex justify-center items-center mx-4' onClick={() => { copyText(item.site) }}>
                                                    <img className='copy cursor-pointer' src="src/assets/svg/copy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border-b border-x xyz py-2 text-center w-32'>
                                            <div className='flex justify-center items-center gap-3'>
                                                <div className='w-24 flex overflow-hidden' >
                                                    <span>{item.username}</span>
                                                </div>
                                                <div className='w-8 flex justify-center items-center mx-4' onClick={() => { copyText(item.username) }}>
                                                    <img className='copy cursor-pointer' src="src/assets/svg/copy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border-b border-l xyz py-2 text-center w-32'>
                                            <div className='flex justify-center items-center gap-3'>
                                                <div className='w-24 flex overflow-hidden' >
                                                    <span>{item.password}</span>
                                                </div>
                                                <div className='w-8 flex justify-center items-center mx-4' onClick={() => { copyText(item.password) }}>
                                                    <img className='copy cursor-pointer' src="src/assets/svg/copy.svg" alt="" />
                                                </div>
                                            </div>
                                        </td>
                                        <td className='border-b border-l xyz py-2 text-center flex justify-center items-center gap-6'>
                                            <div>
                                                <button className='Edit' onClick={() => { editPassword(item.id) }}>
                                                    <img src="src/assets/svg/edit.svg" alt="" />
                                                </button>
                                            </div>
                                            <div>
                                                <button className='delete' onClick={() => { deletePassword(item.id) }}>
                                                    <img src="src/assets/svg/delete.svg" alt="" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                })}

                            </tbody>
                        </table>
                    }
                </div>
            </div>
        </>
    )
}

export default Manager