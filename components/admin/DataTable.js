import { useState } from 'react'
import axios from 'axios'
import PropTypes from 'prop-types'
import Link from 'next/link'
import DeleteIcon from '@material-ui/icons/Delete'
import EditIcon from '@material-ui/icons/Edit'
import IconButton from '@material-ui/core/IconButton'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import { makeStyles } from '@material-ui/core/styles'
import Alerts from './Alerts'
import Confirm from './Confirm'

const useStyles = makeStyles({
  table: {
    minWidth: 750
  },
  tableHeader: {
    backgroundColor: '#f1f1f1',
    fontSize: 16,
    fontWeight: 'bold'
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1
  }
})

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1
  }
  if (b[orderBy] > a[orderBy]) {
    return 1
  }
  return 0
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy)
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index])
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0])
    if (order !== 0) return order
    return a[1] - b[1]
  })
  return stabilizedThis.map((el) => el[0])
}

function EnhancedTableHead({
  classes,
  order,
  orderBy,
  onRequestSort,
  headCells
}) {
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property)
  }

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align ? headCell.align : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
            className={classes.tableHeader}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
        <TableCell className={classes.tableHeader}></TableCell>
      </TableRow>
    </TableHead>
  )
}

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired
}

export default function EnhancedTable({ data, headCells, pageName }) {
  const classes = useStyles()
  const [pageData, setPageData] = useState(data)
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState('')
  const [page, setPage] = useState(0)
  const [rowsPerPage, setRowsPerPage] = useState(5)
  const [openDialog, setOpenDialog] = useState(false)
  const [deleteId, setDeleteId] = useState(0)
  const [alert, setAlert] = useState(false)
  const [alertData, setAlertData] = useState({})

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10))
    setPage(0)
  }

  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, data.length - page * rowsPerPage)

  const openConfirmation = (id) => {
    setDeleteId(id)
    setOpenDialog(true)
  }

  const closeConfirmation = () => {
    setOpenDialog(false)
  }

  const deleteItem = async () => {
    const newList = [...pageData]
    let id = newList.findIndex((x) => x._id === deleteId)

    await axios
      .delete(`/api/admin/${pageName}/${deleteId}`)
      .then(function (response) {
        newList.splice(id, 1)
        setPageData(newList)
        setOpenDialog(false)
        setAlert(true)
        setAlertData({
          severity: 'success',
          message: 'Success! Item has been deleted'
        })
        return response.data
      })
      .catch(function (error) {
        setOpenDialog(false)
        setAlert(true)
        setAlertData({
          severity: 'error',
          message: `${error.response.status} - ${error.response.statusText}`
        })
      })
  }

  const closeAlert = () => {
    setAlert(false)
  }

  return (
    <div>
      <Alerts isOpen={alert} data={alertData} closeAlert={closeAlert} />
      <Confirm
        openConfirmation={openDialog}
        closeConfirmation={closeConfirmation}
        confirmFunction={deleteItem}
      />
      <TableContainer>
        <Table
          className={classes.table}
          aria-labelledby="tableTitle"
          size="medium"
          aria-label="enhanced table"
        >
          <EnhancedTableHead
            classes={classes}
            order={order}
            orderBy={orderBy}
            onRequestSort={handleRequestSort}
            rowCount={pageData.length}
            headCells={headCells}
          />
          <TableBody>
            {stableSort(pageData, getComparator(order, orderBy))
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                //const labelId = `enhanced-table-checkbox-${index}`
                return (
                  <TableRow hover key={row._id}>
                    {headCells.map((cell, index) => (
                      <TableCell
                        component="th"
                        scope="row"
                        align={cell.align ? cell.align : 'left'}
                        key={index}
                      >
                        {row[cell.id]}
                      </TableCell>
                    ))}
                    <TableCell>
                      <Link href={`/admin/${pageName}/${row._id}`}>
                        <IconButton aria-label="edit" color="primary">
                          <EditIcon />
                        </IconButton>
                      </Link>
                      <IconButton
                        aria-label="delete"
                        color="primary"
                        onClick={() => openConfirmation(row._id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                )
              })}
            {emptyRows > 0 && (
              <TableRow>
                <TableCell colSpan={6} />
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={pageData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  )
}
