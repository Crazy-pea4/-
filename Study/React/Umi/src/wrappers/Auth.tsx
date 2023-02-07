import { Redirect } from 'umi';
import { IRouteComponentProps } from 'umi';

export default (props: IRouteComponentProps) => {
  if (localStorage.getItem('token')) {
    return <div>{props.children}</div>;
  }
  alert('鉴权失败，请先登录！');
  return <Redirect to="/login" />;
};
