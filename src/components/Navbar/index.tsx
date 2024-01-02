import { A, useNavigate } from '@solidjs/router'
import { useStore } from '../../store/storeContext.tsx'
import { RiUserFacesAccountCircleFill } from 'solid-icons/ri'
import { Container, Nav, Navbar, NavDropdown } from 'solid-bootstrap'

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
        <Navbar.Collapse>
          <Nav class="ms-auto">
            <NavDropdown
              align="end"
              title={<RiUserFacesAccountCircleFill class="bi" />}
            >
              {store.currentUser() ? (
                <>
                  <NavDropdown.Item href="#">
                    {store.currentUser()!.email}
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/me">Settings</NavDropdown.Item>
                  <NavDropdown.Item onClick={handleLogout}>
                    Logout
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
