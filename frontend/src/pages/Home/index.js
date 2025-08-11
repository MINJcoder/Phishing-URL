import React, { useState } from 'react';
import { Input, Button, Card, Typography, Space, message } from 'antd';
import { SearchOutlined, InfoCircleOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const { Title, Paragraph } = Typography;
const { TextArea } = Input;

const Home = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCheck = async () => {
    if (!url.trim()) {
      message.error('请输入要检测的网址');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post('http://localhost:8000/phishing/check', {
        url: url.trim()
      });
      
      // 跳转到结果页，传递检测结果
      navigate('/result', { 
        state: { 
          result: response.data,
          inputUrl: url 
        } 
      });
    } catch (error) {
      message.error('检测失败，请稍后重试');
      console.error('检测错误:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        paddingTop: '50px' 
      }}>
        {/* 标题区域 */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <Title level={1} style={{ color: 'white', marginBottom: '10px' }}>
            钓鱼网址检测平台
          </Title>
          <Paragraph style={{ color: 'white', fontSize: '16px' }}>
            安全、快速、准确的网址安全检测服务
          </Paragraph>
        </div>

        {/* 检测输入区域 */}
        <Card style={{ marginBottom: '30px' }}>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            <div>
              <Title level={4}>请输入要检测的网址</Title>
              <TextArea
                placeholder="例如：https://example.com"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                rows={3}
                style={{ marginBottom: '16px' }}
              />
              <Button
                type="primary"
                size="large"
                icon={<SearchOutlined />}
                loading={loading}
                onClick={handleCheck}
                style={{ width: '100%' }}
              >
                开始检测
              </Button>
            </div>
          </Space>
        </Card>

        {/* 项目介绍 */}
        <Card>
          <Space direction="vertical" size="middle">
            <Title level={3} icon={<InfoCircleOutlined />}>
              关于我们
            </Title>
            <Paragraph>
              本平台采用先进的机器学习算法，能够快速识别钓鱼网站、恶意链接等安全威胁。
              我们致力于为用户提供安全可靠的网络环境，保护您的个人信息和财产安全。
            </Paragraph>
            <Paragraph>
              <strong>主要功能：</strong>
            </Paragraph>
            <ul>
              <li>实时网址安全检测</li>
              <li>钓鱼网站识别</li>
              <li>恶意链接警告</li>
              <li>检测历史记录</li>
              <li>多端响应式支持</li>
            </ul>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Home; 