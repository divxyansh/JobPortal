import React, { useEffect, useState } from 'react';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Avatar, AvatarImage } from '../ui/avatar';
import { Button } from '../ui/button';
import { LogOut, User2 } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'sonner';
import axios from 'axios';
import { USER_API_END_POINT } from '@/utils/constant';
import { setUser } from '@/redux/authSlice';

const Navbar = () => {
    const { user } = useSelector((store) => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const logoutHandler = async () => {
        try {
            const res = await axios.get(`${USER_API_END_POINT}/logout`, { withCredentials: true },{headers:{'Content-Type':"application/json"}});
            if (res.data.success) {
                dispatch(setUser(null));
                navigate('/');
                toast.success(res.data.message);
            }
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again later.");
            }
        }
    };

    return (
        <>
            <div className='bg-white md:flex hidden'>
                <div className='flex items-center justify-between mx-auto max-w-7xl h-16 w-full'>
                    <div>
                        <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </div>
                    <div className='flex items-center gap-12'>
                        <ul className='flex font-medium items-center gap-5'>
                            {user && user.role === 'recruiter' ? (
                                <>
                                    <li><Link to='/admin/companies'>Companies</Link></li>
                                    <li><Link to='/admin/jobs'>Jobs</Link></li>
                                </>
                            ) : (
                                <>
                                    <li><Link to='/'>Home</Link></li>
                                    <li><Link to='/jobs'>Jobs</Link></li>
                                    <li><Link to='/browse'>Browse</Link></li>
                                </>
                            )}
                        </ul>
                        {!user ? (
                            <div className='flex items-center gap-2'>
                                <Link to='/login'><Button variant='outline'>Login</Button></Link>
                                <Link to='/signup'><Button className='bg-[#6A38C2] hover:bg-[#5b30a6]'>Signup</Button></Link>
                            </div>
                        ) : (
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Avatar className='cursor-pointer'>
                                        <AvatarImage src={user?.profile?.profilePhoto} alt='@shadcn' />
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className='w-80'>
                                    <div className=''>
                                        <div className='flex gap-4 space-y-2'>
                                            <Avatar className='cursor-pointer'>
                                                <AvatarImage src={user?.profile?.profilePhoto} alt='@shadcn' />
                                            </Avatar>
                                            <div>
                                                <h4 className='font-medium'>{user?.fullname}</h4>
                                                <p className='text-sm text-muted-foreground'>{user?.profile?.bio}</p>
                                            </div>
                                        </div>
                                        <div className='flex flex-col text-gray-600'>
                                            {user && user.role === 'student' && (
                                                <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                    <User2 />
                                                    <Button variant='link'><Link to='/profile'>View Profile</Link></Button>
                                                </div>
                                            )}
                                            <div className='flex w-fit items-center gap-2 cursor-pointer'>
                                                <LogOut />
                                                <Button onClick={logoutHandler} variant='link'>Logout</Button>
                                            </div>
                                        </div>
                                    </div>
                                </PopoverContent>
                            </Popover>
                        )}
                    </div>
                </div>
            </div>
            <div className='bg-white md:hidden flex'>
                <div className='flex items-center justify-between mx-auto max-w-7xl h-16 w-full px-4'>
                    <div>
                        <h1 className='text-2xl font-bold'>Job<span className='text-[#F83002]'>Portal</span></h1>
                    </div>
                    <div className='md:hidden'>
                        <button id='menu-btn' onClick={toggleMenu} className='text-gray-800 focus:outline-none'>
                            {menuOpen ? (
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M6 18L18 6M6 6l12 12'></path>
                                </svg>
                            ) : (
                                <svg className='w-6 h-6' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
                                    <path strokeLinecap='round' strokeLinejoin='round' strokeWidth='2' d='M4 6h16M4 12h16m-7 6h7'></path>
                                </svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>
            <div id='mobile-menu' className={`fixed inset-0 bg-white z-10 flex flex-col mt-[5rem] items-start justify-start transform ${menuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`}>
                <ul className='text-center text-gray-800 text-xl space-y-6'>
                    <li><Link to='/' onClick={toggleMenu}>Home</Link></li>
                    <li><Link to='/jobs' onClick={toggleMenu}>Jobs</Link></li>
                    <li><Link to='/browse' onClick={toggleMenu}>Browse</Link></li>
                    <li><Link to='/contact' onClick={toggleMenu}>Contact</Link></li>
                    {!user ? (
                        <div className='flex flex-col items-center gap-4 mt-6'>
                            <Link to='/login' onClick={toggleMenu}><Button variant='outline' className='w-full'>Login</Button></Link>
                            <Link to='/signup' onClick={toggleMenu}><Button className='bg-[#6A38C2] hover:bg-[#5b30a6] w-full'>Signup</Button></Link>
                        </div>
                    ) : (
                        <div className='flex flex-col items-center gap-4 mt-6'>
                            <LogOut />
                            <Button onClick={logoutHandler} variant='link'>Logout</Button>
                        </div>
                    )}
                </ul>
            </div>
        </>
    );
};

export default Navbar;
