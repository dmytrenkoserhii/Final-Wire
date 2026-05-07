import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { AppShell, Avatar, Group, Menu, Tooltip } from '@mantine/core'
import { Logo } from '../../shared/ui/Logo'
import { ThemeToggle } from '../../shared/ui/ThemeToggle'
import { useAuth } from '../providers/auth.provider'
import classes from './AppLayout.module.css'

export function AppLayout() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  return (
    <AppShell
      header={{ height: 60 }}
      classNames={{
        root: classes.shell,
        header: classes.header,
        main: classes.main,
      }}
    >
      <AppShell.Header>
        <Group justify="space-between" align="center" h="100%" px="lg">
          <NavLink to="/home" className={classes.brand}>
            <Logo size="sm" />
          </NavLink>

          <Group component="nav" gap="xs" className={classes.nav}>
            <NavLink
              to="/home"
              className={({ isActive }) =>
                [classes.navLink, isActive ? classes.navLinkActive : ''].join(' ')
              }
            >
              Lobby
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                [classes.navLink, isActive ? classes.navLinkActive : ''].join(' ')
              }
            >
              Profile
            </NavLink>
          </Group>

          <Group gap="sm" align="center">
            <ThemeToggle />
            {user && (
              <Menu shadow="md" width={200} position="bottom-end">
                <Menu.Target>
                  <Tooltip label={user.displayName} position="bottom">
                    <Avatar src={user.avatarUrl} radius="xl" size="md" style={{ cursor: 'pointer' }}>
                      {user.displayName.slice(0, 1)}
                    </Avatar>
                  </Tooltip>
                </Menu.Target>
                <Menu.Dropdown>
                  <Menu.Label>{user.displayName}</Menu.Label>
                  <Menu.Item onClick={() => navigate('/profile')}>Profile</Menu.Item>
                  <Menu.Divider />
                  <Menu.Item color="red" onClick={() => { signOut(); navigate('/auth') }}>
                    Sign out
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            )}
          </Group>
        </Group>
      </AppShell.Header>

      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
    </AppShell>
  )
}
