## Zillancer Assignment

This basic model fetches the table data from an API and allows you to display the data, Search through it, Edit, Delete, and select and includes good UI practices such as pagination(fetches 10 users per page).

### Functional Requirements 

There are various functional requirements it covers as listed in the assignment doc :
1. Column titles must stand out from the entries.
2. There should be a search bar that can filter on any property.
3. You should be able to edit or delete rows in place. (There is no expectation of persistence. Edit and delete are expected to only happen in memory.)
4. You need to implement pagination: Each page contains 10 rows. Buttons at the bottom allow you to jump to any page including special buttons for the first page, previous page, next page, and last page. Pagination must update based on search/filtering. If 25 records for example match a search query, then pagination buttons should only go to 3.
5. You should be able to select one or more rows. A selected row is highlighted with a grayish background color. Multiple selected rows can be deleted at once using the 'Delete Selected' button at the bottom left.
6. Checkbox on the top left is a shortcut to select or deselect all displayed rows. This should only apply to the ten rows displayed on the current page, and not all 50 rows.

### Screenshot
![screenshot-zillancer vercel app-2023 06 20-17_12_18](https://github.com/drakshi/Zillancer/assets/62384655/cbb0446e-e9c8-4c32-9eda-e9ca7a31c025)

### Deployed Site 

Deployed on Vercel : https://zillancer.vercel.app/
