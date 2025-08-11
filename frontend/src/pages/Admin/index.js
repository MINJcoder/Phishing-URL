import React, { useState, useEffect } from 'react';
import { Layout, Menu, Card, Typography, Space, Button, Table, Tag, message, Modal } from 'antd';
import { 
  UserOutlined, 
  HistoryOutlined, 
  SettingOutlined,
  LogoutOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Header, Sider, Content } = Layout;
const { Title } = Typography;

const Admin = () => {
  const [selectedKey, setSelectedKey] = useState('users');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 获取当前登录用户
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  useEffect(() => {
    const user = getCurrentUser();
    if (!user || !user.is_admin) {
      message.error('您没有管理员权限');
      navigate('/');
      return;
    }
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:8000/admin/users');
      setUsers(response.data);
    } catch (error) {
      message.error('获取用户列表失败');
      console.error('获取用户列表错误:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUserAction = async (userId, action) => {
    try {
      await axios.post(`http://localhost:8000/admin/users/${userId}/${action}`);
      message.success(`用户${action === 'enable' ? '启用' : action === 'disable' ? '禁用' : '设为管理员'}成功`);
      fetchUsers();
    } catch (error) {
      message.error('操作失败');
      console.error('用户操作错误:', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    message.success('已退出登录');
    navigate('/');
  };

  const userColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '状态',
      dataIndex: 'is_active',
      key: 'is_active',
      render: (isActive) => (
        <Tag color={isActive ? 'success' : 'error'}>
          {isActive ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '角色',
      dataIndex: 'is_admin',
      key: 'is_admin',
      render: (isAdmin) => (
        <Tag color={isAdmin ? 'blue' : 'default'}>
          {isAdmin ? '管理员' : '普通用户'}
        </Tag>
      ),
    },
    {
      title: '注册时间',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (date) => new Date(date).toLocaleString(),
    },
    {
      title: '操作',
      key: 'action',
      render: (_, record) => (
        <Space>
          {record.is_active ? (
            <Button 
              size="small" 
              danger 
              onClick={() => handleUserAction(record.id, 'disable')}
            >
              禁用
            </Button>
          ) : (
            <Button 
              size="small" 
              type="primary" 
              onClick={() => handleUserAction(record.id, 'enable')}
            >
              启用
            </Button>
          )}
          {!record.is_admin && (
            <Button 
              size="small" 
              onClick={() => handleUserAction(record.id, 'set_admin')}
            >
              设为管理员
            </Button>
          )}
        </Space>
      ),
    },
  ];

  const menuItems = [
    {
      key: 'users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: 'history',
      icon: <HistoryOutlined />,
      label: '历史记录',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const renderContent = () => {
    switch (selectedKey) {
      case 'users':
        return (
          <Card>
            <div style={{ marginBottom: '16px' }}>
              <Title level={3}>用户管理</Title>
            </div>
            <Table
              columns={userColumns}
              dataSource={users}
              rowKey="id"
              loading={loading}
              pagination={{
                pageSize: 10,
                showSizeChanger: true,
                showQuickJumper: true,
              }}
            />
          </Card>
        );
      case 'history':
        return (
          <Card>
            <Title level={3}>历史记录管理</Title>
            <p>历史记录管理功能开发中...</p>
          </Card>
        );
      case 'settings':
        return (
          <Card>
            <Title level={3}>系统设置</Title>
            <p>系统设置功能开发中...</p>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={200} theme="dark">
        <div style={{ 
          height: '64px', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          color: 'white',
          fontSize: '18px',
          fontWeight: 'bold'
        }}>
          管理后台
        </div>
        <Menu
          mode="inline"
          selectedKeys={[selectedKey]}
          items={menuItems}
          onClick={({ key }) => setSelectedKey(key)}
          theme="dark"
        />
      </Sider>
      <Layout>
        <Header style={{ 
          background: '#fff', 
          padding: '0 20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')}
            >
              返回首页
            </Button>
          </Space>
          <Button 
            icon={<LogoutOutlined />} 
            onClick={handleLogout}
          >
            退出登录
          </Button>
        </Header>
        <Content style={{ 
          margin: '20px',
          background: '#fff',
          padding: '20px',
          minHeight: 'calc(100vh - 104px)'
        }}>
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Admin; 