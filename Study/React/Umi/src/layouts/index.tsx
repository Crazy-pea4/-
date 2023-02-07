import './index.less';
import { IRouteComponentProps, NavLink } from 'umi';

// 全局layout，通过props.children渲染pages页面里面的所有路由
export default function Layout({
  children,
  location,
  route,
  history,
  match,
}: IRouteComponentProps) {
  return (
    <div>
      111-layouts
      {children}
      <ul>
        <li>
          <NavLink
            to="/home"
            activeClassName="navlink-active"
            className="navlink"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/home/child"
            activeClassName="navlink-active"
            className="navlink"
          >
            Home/child
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/detail/${Math.floor(Math.random() * 10)}`}
            activeClassName="navlink-active"
            className="navlink"
          >
            Detail/:id
          </NavLink>
        </li>
        <li>
          <NavLink
            to={`/center`}
            activeClassName="navlink-active"
            className="navlink"
          >
            Center（需要鉴权是否登录）
          </NavLink>
        </li>
      </ul>
    </div>
  );
}
