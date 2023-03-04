import Box from '@mui/material/Box'
import Button, { ButtonProps } from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import AddIcon from '@mui/icons-material/Add'
import { styled } from '@mui/material/styles'
import { green } from '@mui/material/colors'

const ColorButton = styled(Button)<ButtonProps>(() => ({
  color: '#fff',
  backgroundColor: green[500],
  '&:hover': {
    backgroundColor: green[700]
  }
}))

export default function Title({ title, addLink = '' }) {
  return (
    <>
      <Box
        sx={{
          borderBottom: `1px solid #ddd`,
          paddingBottom: 1,
          marginBottom: 4,
          display: 'flex',
          justifyContent: 'space-between'
        }}
      >
        <Typography variant="h4" component="h2">
          {title}
        </Typography>
        {addLink && (
          <ColorButton variant="contained" href={`/admin/${addLink}`}>
            <AddIcon />
            Add
          </ColorButton>
        )}
      </Box>
    </>
  )
}
