# Phishing URL Detection Platform

A modern web application for detecting phishing URLs and malicious websites using machine learning algorithms.

## Features

- 🔍 **Real-time URL Detection**: Check URLs for phishing and security threats
- 🛡️ **Three Result Categories**: Safe, Unknown, and High Risk classifications
- 📊 **Detailed Analysis**: Comprehensive security reports with safety advice
- 👤 **User Management**: Registration, login, and history tracking
- 🎨 **Modern UI**: Responsive design with Ant Design components
- 🌐 **API Documentation**: Interactive API docs with FastAPI

## Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: Database ORM
- **SQLite**: Lightweight database (configurable for MySQL/PostgreSQL)
- **Uvicorn**: ASGI server

### Frontend
- **React 18**: Modern React with hooks
- **Ant Design**: UI component library
- **Axios**: HTTP client
- **React Router**: Client-side routing

## Quick Start

### Option 1: One-Click Demo (Windows)
```bash
# Double-click the start-demo.bat file
# Or run from command line:
start-demo.bat
```

### Option 2: Manual Setup

#### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv .venv

# Activate virtual environment
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Start backend server
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

#### Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm start
```

## Access Points

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:8000
- **API Documentation**: http://localhost:8000/docs

## Demo Usage

1. **Open the application**: Navigate to http://localhost:3000
2. **Enter a URL**: Type any URL in the input field
3. **Click START**: The system will analyze the URL
4. **View Results**: See the detection result in a modal popup
5. **Check API**: Visit http://localhost:8000/docs for API testing

## API Endpoints

### Core Detection
- `POST /phishing/check` - Check URL for phishing threats

### Authentication
- `POST /auth/register` - User registration
- `POST /auth/login` - User login

### History
- `GET /history/user/{user_id}` - Get user detection history

### Admin
- `GET /admin/users` - List all users (admin only)
- `PUT /admin/users/{user_id}` - Update user status (admin only)

## Configuration

### Database
The application uses SQLite by default for easy setup. To use MySQL:

```bash
# Set environment variable
export DATABASE_URL="mysql+pymysql://user:password@localhost:3306/phishing_db"

# Or on Windows:
set DATABASE_URL=mysql+pymysql://user:password@localhost:3306/phishing_db
```

### CORS
Backend is configured to allow requests from:
- http://localhost:3000
- http://127.0.0.1:3000

## Project Structure

```
phishing-url-detection/
├── backend/
│   ├── app/
│   │   ├── routers/          # API endpoints
│   │   ├── models.py         # Database models
│   │   ├── schemas.py        # Pydantic schemas
│   │   ├── crud.py          # Database operations
│   │   ├── database.py      # Database configuration
│   │   └── main.py          # FastAPI application
│   ├── requirements.txt     # Python dependencies
│   └── README.md
├── frontend/
│   ├── src/
│   │   ├── pages/           # React components
│   │   ├── App.js           # Main app component
│   │   └── index.js         # Entry point
│   ├── package.json         # Node.js dependencies
│   └── README.md
├── start-demo.bat           # Windows demo launcher
└── README.md               # This file
```

## Development

### Backend Development
```bash
cd backend
# Install development dependencies
pip install -r requirements.txt

# Run with auto-reload
uvicorn app.main:app --reload

# Run tests (if available)
pytest
```

### Frontend Development
```bash
cd frontend
# Install dependencies
npm install

# Start development server
npm start

# Build for production
npm run build
```

## Troubleshooting

### Common Issues

1. **Port already in use**
   - Backend: Change port in uvicorn command
   - Frontend: Use different port when prompted

2. **Python not found**
   - Install Python 3.8+ from python.org
   - Ensure Python is in PATH

3. **Node.js not found**
   - Install Node.js from nodejs.org
   - Ensure npm is available

4. **Database connection errors**
   - Check DATABASE_URL environment variable
   - Ensure database server is running (if using MySQL/PostgreSQL)

### Logs
- Backend logs appear in the terminal where uvicorn is running
- Frontend logs appear in the browser console and terminal

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.

---

## 中文说明

### 快速开始

#### 方法一：一键启动（Windows）
```bash
# 双击 start-demo.bat 文件
# 或在命令行运行：
start-demo.bat
```

#### 方法二：手动设置

##### 后端设置
```bash
# 进入后端目录
cd backend

# 创建虚拟环境
python -m venv .venv

# 激活虚拟环境
# Windows:
.venv\Scripts\activate
# macOS/Linux:
source .venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 启动后端服务器
uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
```

##### 前端设置
```bash
# 进入前端目录
cd frontend

# 安装依赖
npm install

# 启动开发服务器
npm start
```

### 访问地址

- **前端界面**: http://localhost:3000
- **后端API**: http://localhost:8000
- **API文档**: http://localhost:8000/docs

### 使用说明

1. **打开应用**: 访问 http://localhost:3000
2. **输入网址**: 在输入框中输入要检测的URL
3. **点击START**: 系统将分析该URL
4. **查看结果**: 在弹窗中查看检测结果
5. **测试API**: 访问 http://localhost:8000/docs 进行API测试 