import Navbar from "../components/Navbar";

type LayoutProps = {
  children: Node;
}

export default function Layout(props: LayoutProps) {
  return (
    <div>
      <Navbar />
      {props.children}
    </div>
  )
}