import { Layout } from 'antd';
import React from 'react';

export default function UserLogin(props) {
  return (
    <Layout>
      <div>
        {props.children}
      </div>
    </Layout>
  )
}