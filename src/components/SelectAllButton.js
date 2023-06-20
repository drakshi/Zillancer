import React from 'react'

export default function SelectAllButton({users}) {
    const handleSelectAll = () => {
        const updatedUsers = users.map((users) =>({
            ...users,
            selected: true
        }))
        console.log(updatedUsers);
    }
  return (
    <div className='selectAll'>
      <input type='checkbox' onClick={handleSelectAll}>
      </input>
      Select All
    </div>
  )
}
