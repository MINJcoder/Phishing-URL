import React from 'react';
import { Card, Typography, Tag, Space, Button, Descriptions } from 'antd';
import { CheckCircleOutlined, ExclamationCircleOutlined, CloseCircleOutlined, ArrowLeftOutlined } from '@ant-design/icons';
import { useLocation, useNavigate } from 'react-router-dom';

const { Title, Paragraph } = Typography;

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { result, inputUrl } = location.state || {};

  // 如果没有结果数据，返回首页
  if (!result) {
    navigate('/');
    return null;
  }

  const getResultIcon = (result) => {
    switch (result.result) {
      case 'safe':
        return <CheckCircleOutlined style={{ color: '#52c41a', fontSize: '24px' }} />;
      case 'suspicious':
        return <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '24px' }} />;
      case 'phishing':
        return <CloseCircleOutlined style={{ color: '#ff4d4f', fontSize: '24px' }} />;
      default:
        return <ExclamationCircleOutlined style={{ color: '#faad14', fontSize: '24px' }} />;
    }
  };

  const getResultColor = (result) => {
    switch (result.result) {
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
    switch (result.result) {
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

  return (
    <div style={{ 
      minHeight: '100vh', 
      background: '#f0f2f5',
      padding: '20px'
    }}>
      <div style={{ 
        maxWidth: '800px', 
        margin: '0 auto', 
        paddingTop: '20px' 
      }}>
        {/* 返回按钮 */}
        <Button 
          icon={<ArrowLeftOutlined />} 
          onClick={() => navigate('/')}
          style={{ marginBottom: '20px' }}
        >
          返回首页
        </Button>

        {/* 检测结果卡片 */}
        <Card>
          <Space direction="vertical" size="large" style={{ width: '100%' }}>
            {/* 结果标题 */}
            <div style={{ textAlign: 'center' }}>
              <Space direction="vertical" size="middle">
                {getResultIcon(result.result)}
                <Title level={2}>检测结果</Title>
                <Tag color={getResultColor(result.result)} size="large">
                  {getResultText(result.result)}
                </Tag>
              </Space>
            </div>

            {/* 详细信息 */}
            <Descriptions title="检测详情" bordered>
              <Descriptions.Item label="检测网址" span={3}>
                {inputUrl || result.url}
              </Descriptions.Item>
              <Descriptions.Item label="检测结果" span={3}>
                <Tag color={getResultColor(result.result)}>
                  {getResultText(result.result)}
                </Tag>
              </Descriptions.Item>
              <Descriptions.Item label="检测时间" span={3}>
                {new Date(result.checked_at).toLocaleString()}
              </Descriptions.Item>
              {result.detail && (
                <Descriptions.Item label="详细信息" span={3}>
                  {result.detail}
                </Descriptions.Item>
              )}
            </Descriptions>

            {/* 建议 */}
            <Card title="安全建议" type="inner">
              {result.result === 'safe' && (
                <Paragraph>
                  该网址通过安全检查，可以安全访问。但仍建议您保持警惕，注意保护个人信息。
                </Paragraph>
              )}
              {result.result === 'suspicious' && (
                <Paragraph>
                  该网址存在可疑特征，建议谨慎访问。如需访问，请确保您的设备安全，不要输入敏感信息。
                </Paragraph>
              )}
              {result.result === 'phishing' && (
                <Paragraph>
                  <strong style={{ color: '#ff4d4f' }}>警告：</strong>
                  该网址被识别为钓鱼网站，强烈建议不要访问。钓鱼网站可能会窃取您的个人信息、密码或财务信息。
                </Paragraph>
              )}
            </Card>

            {/* 操作按钮 */}
            <div style={{ textAlign: 'center' }}>
              <Space size="middle">
                <Button type="primary" onClick={() => navigate('/')}>
                  继续检测
                </Button>
                <Button onClick={() => navigate('/history')}>
                  查看历史
                </Button>
              </Space>
            </div>
          </Space>
        </Card>
      </div>
    </div>
  );
};

export default Result; 