import React from 'react';

//Table
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

//Styling
import Container from '@mui/material/Container';

const SubTable = ({subs}) => {

    const StyledTableCell = styled(TableCell)(({ theme }) => ({
        [`&.${tableCellClasses.head}`]: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        [`&.${tableCellClasses.body}`]: {
          fontSize: 14,
        },
    }));
      
    const StyledTableRow = styled(TableRow)(({ theme }) => ({
        '&:nth-of-type(odd)': {
          backgroundColor: theme.palette.action.hover,
        },
        // hide last border
        '&:last-child td, &:last-child th': {
          border: 0,
        },
    }));

    return ( 

        <Container size="sm">
            <TableContainer component={Paper} sx={{mt: 3}}>
                    <Table sx={{ minWidth: 700}} aria-label="customized table">
                        <TableHead>
                        <TableRow>
                            <StyledTableCell>Title</StyledTableCell>
                            <StyledTableCell align="center">Date</StyledTableCell>
                        </TableRow>
                        </TableHead>
                        <TableBody>
                        {subs && subs.map((sub) => (
                            <StyledTableRow key={sub.subid}>
                            <StyledTableCell component="th" scope="row">
                                {sub.title}
                            </StyledTableCell>
                            <StyledTableCell align="center">{sub.date}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                        </TableBody>
                    </Table>
            </TableContainer>
        </Container>
    );
}
 
export default SubTable;