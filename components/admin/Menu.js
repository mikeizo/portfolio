import Link from 'next/link'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import WorkIcon from '@material-ui/icons/Work'
import PermIdentityIcon from '@material-ui/icons/PermIdentity'
import CodeIcon from '@material-ui/icons/Code'
import EqualizerIcon from '@material-ui/icons/Equalizer'

export const mainListItems = (
  <>
    <Link href="/admin/work">
      <ListItem button>
        <ListItemIcon>
          <WorkIcon />
        </ListItemIcon>
        <ListItemText primary="Work" />
      </ListItem>
    </Link>
    <Link href="/admin/about">
      <ListItem button>
        <ListItemIcon>
          <PermIdentityIcon />
        </ListItemIcon>
        <ListItemText primary="About" />
      </ListItem>
    </Link>
    <Link href="/admin/skills">
      <ListItem button>
        <ListItemIcon>
          <EqualizerIcon />
        </ListItemIcon>
        <ListItemText primary="Skills" />
      </ListItem>
    </Link>
    <Link href="/admin/experience">
      <ListItem button>
        <ListItemIcon>
          <CodeIcon />
        </ListItemIcon>
        <ListItemText primary="Experience" />
      </ListItem>
    </Link>
    <Link href="/admin">
      <ListItem button>
        <ListItemIcon>
          <SettingsIcon />
        </ListItemIcon>
        <ListItemText primary="Settings" />
      </ListItem>
    </Link>
  </>
)
