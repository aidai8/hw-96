import {User} from "../../../types";
import {Avatar, Button, Menu, MenuItem} from "@mui/material";
import {NavLink} from "react-router-dom";
import React, {useState} from "react";
import {useAppDispatch} from "../../../app/hooks.ts";
import {logout} from "../../../features/users/usersThunks.ts";
import {unsetUser} from "../../../features/users/usersSlice.ts";
import {toast} from "react-toastify";

interface Props {
    user: User;
}

const UserMenu: React.FC<Props> = ({user}) => {
    const dispatch = useAppDispatch();
    const [userOptionsEl, setUserOptionsEl] = useState<HTMLElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setUserOptionsEl(event.currentTarget);
    };

    const handleClose = () => {
        setUserOptionsEl(null);
    };

    const handleLogout = async () => {
        await dispatch(logout());
        dispatch(unsetUser());
        handleClose();
        toast.success("Logout successfully");
    };

    return (
        <>
            <Button onClick={handleClick} color="inherit" sx={{display: 'flex', alignItems: 'center', gap: 1}}>
                <Avatar
                    src={user.avatar ? `http://localhost:8000/${user.avatar}` : undefined}
                    sx={{width: 32, height: 32}}
                >
                    {!user.avatar && user.displayName.charAt(0).toUpperCase()}
                </Avatar>
                {user.displayName}
            </Button>
            <Menu
                keepMounted
                anchorEl={userOptionsEl}
                open={Boolean(userOptionsEl)}
                onClose={handleClose}
            >
                {user && user.role === 'admin' &&
                    <MenuItem>
                        <Button component={NavLink} to='/admin' onClick={handleClose} color={'secondary'}>Admin</Button>
                    </MenuItem>
                }
                <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
        </>
    );
};

export default UserMenu;