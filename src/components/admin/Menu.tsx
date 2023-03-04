import Link from 'next/link'
import Divider from '@mui/material/Divider'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'
import ListItemText from '@mui/material/ListItemText'
import SettingsIcon from '@mui/icons-material/Settings'
import WorkIcon from '@mui/icons-material/Work'
import PermIdentityIcon from '@mui/icons-material/PermIdentity'
import CodeIcon from '@mui/icons-material/Code'
import EqualizerIcon from '@mui/icons-material/Equalizer'

export const mainListItems = (
  <>
    <Divider />
    <ListItemButton component="a" href="/admin/work">
      <ListItemIcon>
        <WorkIcon />
      </ListItemIcon>
      <ListItemText primary="Work" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/about">
      <ListItemIcon>
        <PermIdentityIcon />
      </ListItemIcon>
      <ListItemText primary="About" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/skills">
      <ListItemIcon>
        <EqualizerIcon />
      </ListItemIcon>
      <ListItemText primary="Skills" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin/experience">
      <ListItemIcon>
        <CodeIcon />
      </ListItemIcon>
      <ListItemText primary="Experience" />
    </ListItemButton>
    <ListItemButton component="a" href="/admin">
      <ListItemIcon>
        <SettingsIcon />
      </ListItemIcon>
      <ListItemText primary="Settings" />
    </ListItemButton>
    <Divider sx={{ my: 1 }} />
  </>
)
