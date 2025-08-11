import React, { useState, useEffect } from 'react';
import { Table, Card, Typography, Space, Button, Tag, message } from 'antd';
import { ArrowLeftOutlined, ReloadOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title } = Typography;

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // 获取当前登录用户
  const getCurrentUser = () => {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  };

  const fetchHistory = async () => {
    const user = getCurrentUser();
    if (!user) {
      message.error('请先登录');
      navigate('/login');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:8000/history/user/${user.id}`);
      setHistory(response.data);
    } catch (error) {
      message.error('获取历史记录失败');
      console.error('获取历史记录错误:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const getResultColor = (result) => {
    switch (result) {
      case 'safe':
        return 'success';
      case 'suspicious':
        return 'warning';
      case 'phishing':
        return 'error';
      default:
        return 'default';
    }
  };

  const getResultText = (result) => {
    switch (result) {
      case 'safe':
        return '安全';
      case 'suspicious':
        return '可疑';
      case 'phishing':
        return '钓鱼网站';
      default:
        return '未知';
    }
  };

  const columns = [
    {
      title: '检测网址',
      dataIndex: 'url',
      key: 'url',
      ellipsis: true,
      render: (text) => (
        <a href={text} target="_blank" rel="noopener noreferrer">
          {text}
        </a>
      ),
    },
    {
      title: '检测结果',
      dataIndex: 'result',
      key: 'result',
      render: (result) => (
        <Tag color={getResultColor(result)}>
          {getResultText(result)}
        </Tag>
      ),
    },
    {
      title: '检测时间',
      dataIndex: 'checked_at',
      key: 'checked_at',
      render: (date) => new Date(date).toLocaleString(),
    },
  ];

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f2f5',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '1200px', 
        margin: '0 auto', 
        paddingTop: '20px' 
      }}>
        {/* 页面头部 */}
        <div style={{ marginBottom: '20px' }}>
          <Space>
            <Button 
              icon={<ArrowLeftOutlined />} 
              onClick={() => navigate('/')}
            >
              返回首页
            </Button>
            <Button 
              icon={<ReloadOutlined />} 
              onClick={fetchHistory}
              loading={loading}
            >
              刷新
            </Button>
          </Space>
        </div>

        {/* 历史记录表格 */}
        <Card>
          <div style={{ marginBottom: '16px' }}>
            <Title level={3}>检测历史记录</Title>
          </div>
          
          <Table
            columns={columns}
            dataSource={history}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) => 
                `第 ${range[0]}-${range[1]} 条，共 ${total} 条记录`,
            }}
            locale={{
              emptyText: '暂无检测历史记录',
            }}
          />
        </Card>
      </div>
    </div>
  );
};

export default History; 