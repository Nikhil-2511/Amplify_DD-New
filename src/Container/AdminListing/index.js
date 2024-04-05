import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { ENDPOINT } from '../../config/endpoint';
import { useDispatch } from 'react-redux';
import { getAdminListingData } from '../../Redux/slice/AdminSlice';
import { Pagination, styled, TableHead } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './style.scss';
import FiltersSection from './FiltersSection/FiltersSection';

function createData(name, calories, fat, carbs, protein) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
  };
}
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

function AdminListing() {
  const [adminlistItem, setAdminListItem] = useState({});
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const dispatch = useDispatch();
  const redirect = useNavigate();
  const [selectedFilters, setSelectedFilters] = useState({});

  useEffect(() => {
    getListItem(page);
  }, [])


  function getListItem(pageNo) {
    let url = ENDPOINT.ADMIN.listingPageApi()
    url += `?page=${pageNo}`;
    url += `&size=${rowsPerPage}`
    let dataToSend = {
      callback: handleCallback,
      url
    }
    dispatch(getAdminListingData(dataToSend));
  }

  function handleCallback(res) {
    if (res?.status === '200') {
      setAdminListItem(res?.data || {});
    }
    else {
      alert(res?.message);
    }
  }

  const handleClick = (event, adminListItem) => {
    // debugger
    let path = '/admin/dashboard/';
    if (adminListItem?.companyId) {
      path += adminListItem?.companyId;
    }
    redirect(path);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getListItem(newPage);
  };

  function handleFilters() {

  }

  return (
    <div className='admin-listing-container'>
      <div>
        <div className='admin-filter-section'>
          <FiltersSection handleFilters={handleFilters} selectedFilters={selectedFilters} />
        </div>
        <div className='admin-content-section'>
          <Box sx={{ width: '100%' }}>
            <Paper className='primary-theme' sx={{ width: '100%', mb: 2, background: 'transparent' }}>
              <TableContainer sx={{ minWidth: 750, border: '1px solid #353535', borderRadius: '13px' }}>
                <Table
                  aria-labelledby="tableTitle"
                >
                  <TableHead>
                    <TableRow className='horizontal-border ' sx={{ color: '#fff' }}>
                      <StyledTableHead sx={{ width: '25%' }}>ID</StyledTableHead>
                      {/* <StyledTableCell>Name</StyledTableHead> */}
                      <StyledTableHead>Industry</StyledTableHead>
                      <StyledTableHead>Description</StyledTableHead>
                      <StyledTableHead sx={{ width: '20%' }}>Ask Price</StyledTableHead>
                      <StyledTableHead>Status</StyledTableHead>
                      {/* <StyledTableHead align="right">Fat&nbsp;(g)</StyledTableHead> */}
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
                            {/* <StyledTableCell > <span className={"inline-block padding-x20 padding-y4 " + (listItem.completionPercentage === 'active' ? 'block active-block' : 'block passive-block')}>{listItem.completionPercentage}</span></StyledTableCell> */}
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
              <Pagination
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
                onChange={handleChangePage} />
            </Paper>
          </Box>
        </div>
      </div>
    </div>
  )
}

export default AdminListing;