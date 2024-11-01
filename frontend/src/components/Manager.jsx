import { React, useState, useRef, useEffect } from 'react';
import { ToastContainer, toast, Bounce } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useAuthContext} from '../hooks/useAuthContext'

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([])
    const [editingId, setEditingId] = useState(null);
    const {user} = useAuthContext()

    useEffect(() => {
        getPasswords();
    }, [])

    const getPasswords = async () => {
        let req = await fetch('http://localhost:4000/api/passwords', {
            headers : {
                'Authorization' : `Bearer ${user.token}`
            }
        })
        let passwords = await req.json()
        setPasswordArray(passwords)
    }

    const showPassword = () => {

        if (ref.current.src.includes("icons/eye.png")) {
            passwordRef.current.type = "password"
            ref.current.src = "icons/eyecross.png"
        }

        else {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "text"
        }
    }

    const savePassword = async () => {
        if(form.site.length > 0 && form.username.length > 0 && form.password.length > 0) {
            let updatedPasswords;
            if (editingId) {
                return saveEditedPassword();
            } else {
                updatedPasswords = [...passwordArray, { ...form }];
            }

            setPasswordArray(updatedPasswords);
            let res = await fetch('http://localhost:4000/api/passwords', {method : 'POST', headers : {'Authorization' : `Bearer ${user.token}`, 
            "Content-Type" : "application/json"}, body : JSON.stringify(form)}) 

            toast.success('Password saved successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            getPasswords()
            setForm({ site: "", username: "", password: "" })
        } else{
            toast.error('Enter all fields', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const editPassword = async (id) => {
        const passwordToEdit = passwordArray.find(item => item._id === id)
        setForm(passwordToEdit);
        setEditingId(id);
    }

    const saveEditedPassword = async () => {  
        const id = editingId

        let res = await fetch('http://localhost:4000/api/passwords/' + id, {method : 'PUT',  headers : {'Authorization' : `Bearer ${user.token}`,
            "Content-Type" : "application/json"}, body : JSON.stringify({...form, _id : id})}) 

        if(!res.ok){
            toast.error('Could not edit password', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: true,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });

            setForm({ site: "", username: "", password: "" });
            setEditingId(null);

            return;
        }
        
        const updatedPasswords = passwordArray.map(item => 
            item._id === editingId ? { ...form, _id: id } : item
        );

        setPasswordArray(updatedPasswords);

        setForm({ site: "", username: "", password: "" });
        setEditingId(null);

        toast.success('Password edited successfully', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const deletePassword = async (id) => {        
        let conf = confirm("Are you sure you want to delete this password")
        if(conf){
            setPasswordArray(passwordArray.filter(item => item._id !== id))
            let res = await fetch('http://localhost:4000/api/passwords/' + id, {method : 'DELETE', headers : {'Authorization' : `Bearer ${user.token}`,
            "Content-Type" : "application/json"}}) 

            if(!res.ok){
                toast.error('Could not delete password', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                    transition: Bounce,
                });
                
                return;
            }

            toast.success('Password deleted successfully', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                transition: Bounce,
            });
        }
    }

    const copyText = async (text) => {
        await navigator.clipboard.writeText(text);
        toast.info('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Bounce,
        });
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
                transition="Bounce"
            />
            <div className="absolute inset-0 -z-10 h-full w-full bg-white 
            bg-[linear-gradient(to_right,#f0f0f0_1px,transparent_1px),
            linear-gradient(to_bottom,#f0f0f0_1px,transparent_1px)] bg-[size:6rem_4rem]">
                <div className="absolute bottom-0 left-0 right-0 top-0 
            bg-[radial-gradient(circle_500px_at_50%_200px,#C9EBFF,transparent)]"></div>
            </div>

            <div className="md:mycontainer">
                <h1 className='text-blue-900 text-4xl font-bold text-center'>SecureNest</h1>
                <p className='text-black text-lg text-center'>Your own Password Manager</p>

                <div className="flex flex-col p-4 text-black gap-5">
                    <input value={form.site} onChange={handleChange} placeholder='Enter Website URL'
                        className='rounded-full border border-green-200 px-4 py-1' type="text" name='site' id='site' />
                    <div className="flex flex-col md:flex-row w-full gap-4 justify-between">
                        <input value={form.username} onChange={handleChange} placeholder='Enter Username'
                            className='rounded-full w-full border border-green-200 px-4 py-1' type="text" name='username' id='usernmame' />
                        <div className="relative">
                            <input ref={passwordRef} value={form.password} onChange={handleChange} placeholder='Enter Password'
                                className='rounded-full w-full border border-green-200 px-4 py-1' type="password" name='password' id='password' />
                            <span className='absolute right-[2px] top-[2px] cursor-pointer' onClick={showPassword}><img ref={ref} width={30}
                                className='p-1' src="/icons/eyecross.png" alt="eyecross" /></span>
                        </div>
                    </div>

                    <button onClick={savePassword} className='w-fit mx-auto flex justify-center items-center gap-2 bg-blue-400
                  hover:bg-green-500 rounded-full px-4 py-2 border border-green-200'>
                        <lord-icon
                            src="https://cdn.lordicon.com/jgnvfzqg.json"
                            trigger="hover">
                        </lord-icon>
                        Save
                    </button>
                </div>

                <div>
                    <h2 className='font-bold text-2xl px-2 py-4'>Your Passwords</h2>
                    {passwordArray.length == 0 && <div className='text-center text-lg'>No Passwords saved currently </div>}
                    {passwordArray.length != 0 && <table className=" md:table-auto w-full rounded-md overflow-hidden mb-10">
                        <thead className='bg-blue-500 text-white'>
                            <tr>
                                <th className='py-2 border border-gray-200' >Website</th>
                                <th className='py-2 border border-gray-200'>Username</th>
                                <th className='py-2 border border-gray-200'>Password</th>
                                <th className='py-2 border border-gray-200'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-blue-50 '>
                            {passwordArray.map((item, index) => {
                                const siteUrl = item.site.startsWith("http://") || item.site.startsWith("https://")
                                    ? item.site
                                    : `https://${item.site}`;

                                return <tr key={index}>
                                    <td className='text-center py-2 border border-gray-200' >
                                        <div className='flex justify-center items-center'>
                                            <a className = 'hover:underline' href={siteUrl} target='_blank'>{item.site}</a>
                                            <div className='size-5 cursor-pointer' onClick={() => copyText(item.site)}>
                                                <img className='ml-2' src="./icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-gray-200' >
                                        <div className='flex justify-center items-center '>
                                            <span>{item.username}</span>
                                            <div className='size-5 cursor-pointer' onClick={() => copyText(item.username)}>
                                                <img className='ml-2' src="./icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-2 border border-gray-200' >
                                        <div className='flex justify-center items-center '>
                                            <span>{item.password}</span>
                                            <div className='size-5 cursor-pointer' onClick={() => copyText(item.password)}>
                                                <img className='ml-2' src="./icons/copy.png" alt="" />
                                            </div>
                                        </div>
                                    </td>

                                    <td className='flex justify-center items-center gap-2 my-1'>
                                        <span className='cursor-pointer' onClick={() => editPassword(item._id)}>
                                            <img width = {26} src="./icons/edit.png" alt="" />
                                        </span>

                                        <span className='cursor-pointer' onClick={() => deletePassword(item._id)}>
                                            <lord-icon
                                                src="https://cdn.lordicon.com/skkahier.json"
                                                trigger="hover"
                                                style={{ "width": "25px", "height": "25px" }}>
                                            </lord-icon>
                                        </span>
                                    </td>

                                </tr>
                            })}
                        </tbody>
                    </table>}
                </div>
            </div>

        </>

    );
};

export default Manager;
