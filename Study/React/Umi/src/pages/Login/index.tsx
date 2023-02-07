import React, { useState } from 'react';
import { useHistory } from 'umi';

export default function Login() {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  return (
    <div>
      <div>登录页：</div>
      <div>
        登录：
        <input
          type="text"
          placeholder="yarh"
          onChange={(e) => {
            setUsername(e.target.value);
          }}
        ></input>
        密码：
        <input
          type="text"
          placeholder="123456"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
      </div>
      <button
        type={'button'}
        onClick={() => {
          fetch('/api/login', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username,
              password,
            }),
          })
            .then((res) => res.json())
            .then((res) => {
              if (res.ok) {
                localStorage.setItem('token', '123123');
                history.push('/center');
              } else alert('账号密码错误');
            });
        }}
      >
        登录
      </button>
    </div>
  );
}
