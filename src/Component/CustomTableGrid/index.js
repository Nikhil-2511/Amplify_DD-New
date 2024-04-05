import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, tableCellClasses, useTheme } from '@mui/material';
import styled from '@emotion/styled';
import { deepClone, getCurrencyValueForTable } from '../../helper/commonHelper';
import { useNavigate } from 'react-router-dom';

const StyledTableHead = styled(TableCell)(({ theme, sx }) => ({
    [`&.${tableCellClasses.head}`]: {
      color: theme.palette?.tableGridStyling?.contrastText,
      fontSize: 12,
      padding: '12px 14px',
      ...sx
    }
  }));

const StyledTableCell = styled(TableCell)(({ theme, sx }) => ({
    [`&.${tableCellClasses.body}`]: {
      color: theme.palette?.tableGridStyling?.contrastText,
      fontSize: 16,
      border: 'none',
      ...sx
    },
  }));

function CustomTableGrid({tableModel, tableData, sx={}, hasNavigation, path}) {
    const {headers, tableContent} = tableModel;
    const navigate = useNavigate();
    const theme = useTheme();
    function getHeaderLabel(labelData) {
        return (
            <div className='flex align-center'>
                <span>{labelData?.label || ''}</span>
                {
                    labelData?.icon &&
                    <span className='margin-l5' style={{height: '20px'}}><labelData.icon sx={{fontSize: '16px'}} /></span>
                }
            </div>
        )
    }

    function renderTableCell(listItem, tableItem, k) {
        // if(listItem.hasCustomData) {
        //     return (
        //         <TableCell >
        //             <React.Fragment key={"tableContent" + k}>
        //                 {tableItem[listItem.key]}
        //             </React.Fragment>
        //         </TableCell>
        //     );
        // }
        return (
            <StyledTableCell 
                className={'' + (listItem?.className || '')}  sx={listItem?.sx}
                key={'tableContent' + k} >{getContent({tableItem, listItem})}</StyledTableCell>
        )
    }

    function getContent({tableItem, listItem}) {
      if(listItem.hasCurrency) {
        return getCurrencyValueForTable(tableItem[listItem.key])
      }
      return tableItem[listItem.key]
    }

    function handleOnClick(tabItem) {
      if(hasNavigation) {
        navigate(`${path}/${tabItem.navigationId}`)
      }
    }
    return (
        <div className='custom-table-grid-container'>
            <TableContainer sx={{ minWidth: 750, borderTopLeftRadius: '8px', borderTopRightRadius: '8px', ...sx }}>
                <Table
                  aria-labelledby="tableTitle"
                >
                  <TableHead sx={{background: theme.palette?.tableGridStyling?.head, color: theme.palette?.tableGridStyling?.contrastText, fontSize: '12px', fontWeight: 500}}>
                    <TableRow className='horizontal-border ' sx={{ color: '#fff' }}>
                        {
                            headers?.length > 0 &&
                            headers.map((headerList, index) => {
                                let sx = headerList?.sx || {};
                                return (
                                    <StyledTableHead className={'' + (headerList?.className || '')}  sx={{...sx}} key={'headers' + index}>
                                        {getHeaderLabel(headerList)}
                                    </StyledTableHead>
                                )
                            })
                        }
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tableData?.length > 0 &&
                      tableData.map((apiData, index) => {
                        return (
                          <TableRow
                            hover
                            className={"relative " + ((index !== tableData?.length - 1) ? ' horizontal-border ' : '') + (hasNavigation ? 'cursor-pointer' : '')}
                            tabIndex={-1}
                            sx={{background: theme.palette?.tableGridStyling?.body, borderBottom: `1px solid ${theme.palette?.tableGridStyling?.border}`}}
                            onClick={(e) => handleOnClick(apiData)}
                            key={'tableRow'+ index}
                          >
                            {
                                tableContent?.length > 0 &&
                                tableContent.map((tableListModel, k) => {
                                    return renderTableCell(tableListModel, apiData, k)
                                })
                            }
                          </TableRow>
                        );
                      })}
                    {
                        tableData?.length === 0 &&
                        <TableRow>
                            <StyledTableCell sx={{ textAlign: 'center' }} colSpan={7} className='heading1 text-center padding-30' >No data found</StyledTableCell>
                        </TableRow>
                    }
                  </TableBody>
                </Table>
              </TableContainer>
        </div>
    )
}

export default CustomTableGrid