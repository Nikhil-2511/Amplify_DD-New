import React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import { Box, Paper, TableHead, TableRow } from '@mui/material';
import styled from '@emotion/styled';

const columns = [
  { field: 'id', headerName: 'ID', width: 70, sortable: false, },
  { field: 'firstName', headerName: 'First name', width: 130, sortable: false, },
  { field: 'lastName', headerName: 'Last name', width: 130, sortable: false, },
  {
    field: 'age',
    headerName: 'Age',
    type: 'number',
    width: 90,
    sortable: false,
  },
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (params) =>
      `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

const rows = [
  { id: 1, lastName: 'Snow', firstName: 'Jon', age: 35 },
  { id: 2, lastName: 'Lannister', firstName: 'Cersei', age: 42 },
  { id: 3, lastName: 'Lannister', firstName: 'Jaime', age: 45 },
  { id: 4, lastName: 'Stark', firstName: 'Arya', age: 16 },
  { id: 5, lastName: 'Targaryen', firstName: 'Daenerys', age: null },
  { id: 6, lastName: 'Melisandre', firstName: null, age: 150 },
  { id: 7, lastName: 'Clifford', firstName: 'Ferrara', age: 44 },
  { id: 8, lastName: 'Frances', firstName: 'Rossini', age: 36 },
  { id: 9, lastName: 'Roxie', firstName: 'Harvey', age: 65 },
];


const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // [`&.${tableCellClasses.head}`]: {
    //   color: theme.palette.common.white,
    // },
    [`&.${tableCellClasses.body}`]: {
      //   fontSize: 16,
      color: theme.palette.common.white,
      border: 'none'
    },
  }));
  
  const StyledTableCellAboutCol = styled(TableCell)(({ theme }) => ({
    // [`&.${tableCellClasses.head}`]: {
    //   color: theme.palette.common.white,
    // },
    [`&.${tableCellClasses.body}`]: {
      //   fontSize: 16,
      color: theme.palette.common.white,
      border: 'none',
      // maxWidth: 250,
    },
  }));
  
  const StyledTableHead = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette.common.white,
      border: 'none'
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 16,
      color: theme.palette.common.white,
      border: 'none'
    },
  }));
  

function TableGrid() {
    function DataTable() {
        // return (
        //   <div style={{ height: 400, width: '100%' }}>
        //     <DataGrid
        //       rows={rows}
        //       columns={columns}
             
        //       checkboxSelection
        //     />
        //   </div>
        // );
    }

    return (
        <div>
             {/* <DataGrid
              rows={rows}
              columns={columns}
              initialState={{
                pagination: {
                  paginationModel: { page: 0, pageSize: 5 },
                },
              }}
              pageSizeOptions={[5, 10]}
              checkboxSelection
            /> */}
            <Box sx={{ width: '100%' }}>
            <Paper className='primary-theme' sx={{ width: '100%', mb: 2, background: 'transparent' }}>
              {/* <TableContainer sx={{ minWidth: 750, border: '1px solid #353535', borderRadius: '13px' }}>
                <Table
                  aria-labelledby="tableTitle"
                >
                  <TableHead>
                    <TableRow className='horizontal-border ' sx={{ color: '#fff' }}>
                      <StyledTableHead sx={{ width: '25%' }}>ID</StyledTableHead>
                      <StyledTableCell>Name</StyledTableHead>
                      <StyledTableHead>Industry</StyledTableHead>
                      <StyledTableHead>Description</StyledTableHead>
                      <StyledTableHead sx={{ width: '20%' }}>Ask Price</StyledTableHead>
                      <StyledTableHead>Status</StyledTableHead>
                      <StyledTableHead align="right">Fat&nbsp;(g)</StyledTableHead>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {adminlistItem?.elements?.length > 0 && adminlistItem?.elements
                      // .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((listItem, index) => {
                        const labelId = `enhanced-table-checkbox-${index}`;

                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, listItem)}
                            className={"cursor-pointer " + (index % 2 === 0 ? 'grad-4' : '') + ((index !== adminlistItem.elements.length - 1) ? ' horizontal-border ' : '')}
                            tabIndex={-1}
                            key={listItem.name + index}
                          >
                            <StyledTableCell >{listItem.companyId}</StyledTableCell>
                            <StyledTableCell >{listItem.category}</StyledTableCell>
                            <StyledTableCellAboutCol ><span>{listItem.about}</span></StyledTableCellAboutCol>
                            <StyledTableCell >{listItem.askPrice ? listItem.askPrice : ''}</StyledTableCell>
                             <StyledTableCell > <span className={"inline-block padding-x20 padding-y4 " + (listItem.completionPercentage === 'active' ? 'block active-block' : 'block passive-block')}>{listItem.completionPercentage}</span></StyledTableCell>
                            <StyledTableCell > <span className={"inline-block padding-x20 padding-y4 " + (listItem.status === 'active' ? 'block active-block' : 'block passive-block')}>{listItem.status ? listItem.status : '-'}</span></StyledTableCell>
                          </TableRow>
                        );
                      })}
                    {adminlistItem?.elements?.length === 0 &&
                      <StyledTableCell sx={{ textAlign: 'center' }} colSpan={5} className='heading1 text-center padding-30' >No data found</StyledTableCell>}
                  </TableBody>
                </Table>
              </TableContainer>
              {/* <TablePagination
                component="div"
                count={rowsPerPage}
                // rowsPerPage={rowsPerPage}
                page={page}
                rowsPerPage=""
                onPageChange={handleChangePage}
              /> */}
              {/* <Pagination
                sx={{
                  padding: '10px', display: 'flex', justifyContent: 'end', color: '#fff', ul: {
                    "& .MuiPaginationItem-root": {
                      color: "#fff",
                      background: '#353535'
                    },
                    "& .Mui-selected": {
                      backgroundImage: `linear-gradient(130deg, $gradientColor1 10%, $gradientColor3 80%)`
                    }
                  }
                }}
                variant="outlined"
                shape="rounded"
                count={adminlistItem?.totalPages || 10}
                page={page}
                // color="#fff"
                onChange={handleChangePage} /> */}
            </Paper>
          </Box>
        </div>
    )
}

export default TableGrid;