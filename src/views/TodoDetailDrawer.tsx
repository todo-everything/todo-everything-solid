export default function TodoDetailDrawer(props) {
  return (
    <div class="drawer drawer-end">
      {/*<input id="my-drawer-4" type="checkbox" class="drawer-toggle" checked={props.isOpen ? "checked" :""} />*/}
      <div class="drawer-content">
        <div>Drawer content</div>
        <label htmlFor="my-drawer-4" class="drawer-button btn btn-primary">Open drawer</label>
      </div>
      <div class="drawer-side">
        <label htmlFor="my-drawer-4" aria-label="close sidebar" class="drawer-overlay" onClick={() => {
          console.log('overlay clicked')
          props.onClose()
        }}></label>
        <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
          <li><a href="">{props.isOpen ? "YES" : "NO"}</a></li>
          <li><a>Sidebar Item 1</a></li>
          <li><a>Sidebar Item 2</a></li>
        </ul>
      </div>
    </div>
  )
}