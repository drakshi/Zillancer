import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardDoubleArrowLeftIcon from '@mui/icons-material/KeyboardDoubleArrowLeft';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardDoubleArrowRightIcon from '@mui/icons-material/KeyboardDoubleArrowRight';

import './Users.css';

export default function Users({ searchWord }) {
    const names = ['', 'Name', 'Email', 'Roles', 'Actions'];
    const [users, setUsers] = useState([]);
    const [filteredUsers, setFilteredUsers] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [recordsPerPage] = useState(10);

    const fetchData = () => {
        fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
            .then((res) => res.json())
            .then((data) => {
                const updatedUsers = data.map((user) => ({
                    ...user,
                    selected: false,
                    isEditing: false // Add isEditing property
                }));
                setUsers(updatedUsers);
                setFilteredUsers(updatedUsers);
            });
    };

    const handleDelete = (id) => {
        const updatedUsers = users.filter((user) => user.id !== id);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handleEdit = (id) => {
        const updatedUsers = users.map((user) => {
            if (user.id === id) {
                return { ...user, isEditing: true };
            }
            return user;
        });
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handleSave = (id) => {
        const updatedUsers = users.map((user) => {
            if (user.id === id) {
                return { ...user, isEditing: false };
            }
            return user;
        });
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handleCancel = (id) => {
        const updatedUsers = users.map((user) => {
            if (user.id === id) {
                return { ...user, isEditing: false };
            }
            return user;
        });
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };
    console.log(users);
    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        const filteredUsers = users.filter((user) =>
            user.name.toLowerCase().includes(searchWord.toLowerCase()) ||
            user.email.toLowerCase().includes(searchWord.toLowerCase()) ||
            user.role.toLowerCase().includes(searchWord.toLowerCase())
        );
        setFilteredUsers(filteredUsers);
    }, [searchWord]);

    const handleSelectedDelete = () => {
        const updatedUsers = users.filter((user) => !user.selected);
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    // Pagination logic
    const indexOfLastRecord = currentPage * recordsPerPage;
    const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
    const currentRecords = filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord);
    const totalPages = Math.ceil(filteredUsers.length / recordsPerPage);

    const paginationButtons = [];
    for (let i = 1; i <= totalPages; i++) {
        paginationButtons.push(
            <button
                key={i}
                onClick={() => handlePageChange(i)}
                className={currentPage === i ? 'page-active' : ''}
            >
                {i}
            </button>
        );
    }
    const handleSelect = (userId) => {
        const updatedUsers = users.map((user) => {
            if (user.id === userId) {
                return { ...user, selected: !user.selected };
            }
            return user;
        });
        setUsers(updatedUsers);
        setFilteredUsers(updatedUsers);
    };
    const onSelectAll = () => {
        const updatedUsers = users.map((user) => ({
            ...user,
            selected: user.selected === true ? false : true
        }));
        setFilteredUsers(updatedUsers);
        setUsers(updatedUsers);
    };

    return (
        <>

            <div className="table-container">
                {currentRecords.length > 0 ? (
                    <table className="full-width-table">

                        <thead>
                            <div className="button-section">
                                <div className="select-button">
                                    <input type="checkbox" onClick={onSelectAll} />
                                    Select All
                                </div>

                            </div>
                            <tr>
                                {names.map((head, index) => (
                                    <th key={index}>{head}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {currentRecords.map((user) => (
                                <tr key={user.id} className={user.selected ? 'active' : ''}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className="input-checkbox"
                                            checked={user.selected}
                                            onChange={() => handleSelect(user.id)}
                                        />
                                    </td>
                                    <td>
                                        {user.isEditing ? (
                                            <input
                                                type="text"
                                                value={user.name}
                                                onChange={(e) => {
                                                    const updatedUsers = users.map((u) => {
                                                        if (u.id === user.id) {
                                                            return { ...u, name: e.target.value };
                                                        }
                                                        return u;
                                                    });
                                                    setUsers(updatedUsers);
                                                    setFilteredUsers(updatedUsers);
                                                }}
                                            />
                                        ) : (
                                            user.name
                                        )}
                                    </td>
                                    <td>{user.email}</td>
                                    <td>{user.role}</td>
                                    <td>
                                        <div className="icons">
                                            {user.isEditing ? (
                                                <>
                                                    <button className='edit-buttons save' onClick={() => handleSave(user.id)}>Save</button>
                                                    <button className='edit-buttons cancel' onClick={() => handleCancel(user.id)}>Cancel</button>
                                                </>
                                            ) : (
                                                <>
                                                    <EditIcon
                                                        className="edit-icon"
                                                        onClick={() => handleEdit(user.id)}
                                                    />
                                                    <DeleteIcon
                                                        className="delete-icon"
                                                        onClick={() => handleDelete(user.id)}
                                                    />
                                                </>
                                            )}
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                        <div className="button-section">

                            <div className="deleteSelected-button" onClick={handleSelectedDelete}>
                                Delete Selected
                            </div>
                        </div>
                    </table>
                ) : (
                    <h2 style={{ textAlign: 'center' }}>No records found</h2>
                )}

            </div>

            {currentRecords.length > 0 && (
                <div className="pagination-container">
                    <button
                        className="pagination_buttons"
                        onClick={() => handlePageChange(1)}
                        disabled={currentPage === 1}
                    >
                        <KeyboardDoubleArrowLeftIcon />
                    </button>
                    <button
                        className="pagination_buttons"
                        onClick={() => handlePageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                    >
                        <KeyboardArrowLeftIcon />
                    </button>
                    {paginationButtons}
                    <button
                        className="pagination_buttons"
                        onClick={() => handlePageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                    >
                        <KeyboardArrowRightIcon />
                    </button>
                    <button
                        className="pagination_buttons"
                        onClick={() => handlePageChange(totalPages)}
                        disabled={currentPage === totalPages}
                    >
                        <KeyboardDoubleArrowRightIcon />
                    </button>
                </div>
            )}

        </>
    );
}
