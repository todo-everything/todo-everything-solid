import { A, useNavigate } from '@solidjs/router'
import { useStore } from '../../store/storeContext.tsx'
import {
  RiSystemLogoutBoxFill,
  RiSystemSettings3Fill,
  RiUserFacesAccountCircleFill,
} from 'solid-icons/ri'
import { Container, Nav, Navbar, NavDropdown, NavLink } from 'solid-bootstrap'

export default function () {
  const [store, actions] = useStore()
  const navigate = useNavigate()

  const handleLogout = async () => {
    await actions.accounts.logout()
    navigate('/login', { replace: true })
  }

  return (
    <Navbar>
      <Container>
        <Navbar.Brand>
          <A class="" href="/">
            todo-everything
          </A>
        </Navbar.Brand>
        <Nav class="me-auto">
          <NavLink href="/dashboard">Dashboard</NavLink>
          <NavLink href="/todos">Todos</NavLink>
        </Nav>
        <Navbar.Collapse>
          <Nav class="ms-auto">
            <NavDropdown
              align="end"
              title={<RiUserFacesAccountCircleFill class="bi" />}
            >
              {store.currentUser() ? (
                <>
                  <NavDropdown.Item href="#">
                    <RiUserFacesAccountCircleFill />{' '}
                    {store.currentUser()!.email}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/me">
                    <RiSystemSettings3Fill /> Settings
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    <RiSystemLogoutBoxFill /> Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <NavDropdown.Item href="/login">Login</NavDropdown.Item>
                  <NavDropdown.Item href="/register">Register</NavDropdown.Item>
                </>
              )}
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  )
}
