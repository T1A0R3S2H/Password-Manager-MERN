import React from 'react'
import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

import 'react-toastify/dist/ReactToastify.css';



const Manager = () => {
    // const ref = useRef(null);

    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const [form, setForm] = useState({ site: '', username: '', password: '' });
    const [passwordArray, setPasswordArray] = useState([]);



    const getPasswords = async () => {
        let req = await fetch("http://localhost:3000/");
        let passwords = await req.json();
        setPasswordArray(passwords);
      };


    useEffect(() => {
        getPasswords()
    }, [])



    const savePassword = async () => {
        if (form.site.length > 3 && form.username.length > 3 && form.password.length > 3) {
          if (form.id) {
            // Editing an existing password
            await fetch("http://localhost:3000/", {
              method: "PUT",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...form }),
            });
            setPasswordArray(prevPasswordArray =>
              prevPasswordArray.map(password =>
                password.id === form.id ? { ...form } : password
              )
            );
          } else {
            // Creating a new password
            setPasswordArray(prevPasswordArray => [...prevPasswordArray, { ...form, id: uuidv4() }]);
            await fetch("http://localhost:3000/", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...form, id: uuidv4() }),
            });
          }
      
          setForm({ site: "", username: "", password: "" });
          toast("Password saved!", {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
          });
      
          // Fetch updated passwords from the server
          await getPasswords();
        } else {
          toast("Error: Password not saved!");
        }
      };


    const deletePassword = async (id) => {
        console.log("Deleting password with id ", id);
        let c = confirm("Do you really want to delete this password?");
        if (c) {
            try {
                // Send delete request to the server first
                await fetch("http://localhost:3000/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id })
                });
                
                // If the server deletion is successful, update the UI
                setPasswordArray(passwordArray.filter(item => item.id !== id));
                
                toast('Password Deleted!', {
                    position: "top-right",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
            } catch (error) {
                console.error("Error deleting password:", error);
                // Handle error, such as displaying an error toast
                toast.error('Error deleting password!');
            }
        }
    }
    



    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(password => password.id === id);
        setForm(passwordToEdit);
    };



    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    //open, closed lock
    const togglePasswordVisibility = () => {
        setIsPasswordVisible((prevState) => !prevState);
    };



    return (
        <>
            <div className="relative overflow-auto">
                {/* Your page content goes here */}

                <div className="fixed inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
                    <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div>
                </div>
            </div>
            <div className="max-w-4xl md:my-container pt-16">
                <h1 className='text-4xl font-bold text-center'>
                    <span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>Man/&gt;</span>
                </h1>
                <p className='text-green-900 text-lg text-center'>Your own password manager</p>
                
                <div className=" flex flex-col p-6 text-black gap-6 items-center">
                    <input
                        value={form.site}
                        onChange={handleChange}
                        placeholder='Enter website URL here'
                        className='rounded-full border border-green-500 w-full px-4 py-1'
                        type="text"
                        name="site"
                        id="site"
                    />
                    <div className="flex flex-col md:flex-row w-full justify-between gap-6">
  <input
    value={form.username}
    onChange={handleChange}
    placeholder="Enter Username"
    className="rounded-full border border-green-500 w-full sm:w-full md:w-full px-4 py-1"
    type="text"
    name="username"
    id="username"
  />
  <div className="relative flex items-center w-1/2 sm:w-full md:w-full">
    <input
      value={form.password}
      onChange={handleChange}
      placeholder="Enter Password"
      className="rounded-full border border-green-500 w-full px-4 py-1 overflow-hidden pr-10"
      type={isPasswordVisible ? 'text' : 'password'}
      name="password"
      id="password"
    />
    <span
      className="absolute right-0 flex items-center justify-center h-full pr-2 cursor-pointer"
      onClick={togglePasswordVisibility}
    >
      <img
        className="p-2"
        width={30}
        src={isPasswordVisible ? './icons/open-lock.svg' : './icons/closed-lock.svg'}
        alt={isPasswordVisible ? 'open lock' : 'closed lock'}
      />
    </span>
  </div>
</div>
                    <button onClick={savePassword} className='flex gap-2 justify-center items-center bg-green-400 rounded-full w-fit px-6 py-2 hover:bg-green-300 border border-green-900 overflow-hidden'>
                        <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json"></lord-icon>
                        Save
                    </button>
                </div>

                <div className="passwords md:flex md:justify-center">
                    <div className="md:w-full md:max-w-3xl">
                        <h2 className='font-bold text-2xl py-4 text-center'>Your Passwords</h2>
                        {passwordArray.length === 0 && <p className='text-center text-red-500'>No passwords saved yet</p>}
                        {passwordArray !== 0 && <table className="table-auto w-full rounded-md overflow-hidden"></table>}
                        <table className="table-auto w-full rounded-md overflow-hidden">
                            <thead className='w-full bg-green-800 text-white'>
                                <tr>
                                    <th className='py-2'>Site</th>
                                    <th className='py-2'>Username</th>
                                    <th className='py-2'>Password</th>
                                    <th className='py-2'>Actions</th>
                                </tr>
                            </thead>
                            <tbody className='bg-green-100'>
                                {passwordArray.map((item, index) => (
                                    <tr key={index}>
                                        <td className='border border-white p-2 text-center width-32 py-2 items-center justify-center'>
                                            <a href={item.site} target="_blank" rel="noopener noreferrer">
                                                {item.site}
                                            </a>
                                        </td>
                                        <td className='border border-white p-2 text-center width-32 py-2'>
                                            {item.username}
                                        </td>
                                        <td className='border border-white p-2 text-center width-32 py-2'>
                                            {item.password}
                                        </td>
                                        <td className='border border-white p-2 text-center width-32 py-2 cursor-pointer justify-center items-center'>
                                            <span className='inline-block text-center vertical-align-middle' onClick={() => editPassword(item.id)}>
                                                <img src="./icons/edit.svg" alt="" className='vertical-align-middle' />
                                            </span>
                                            <span className='inline-block text-center vertical-align-middle' onClick={() => deletePassword(item.id)}>
                                                <img src="./icons/delete.svg" alt="" className='vertical-align-middle' />
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

            </div>
        </>
    );
};

export default Manager;