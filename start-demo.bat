@echo off
echo ========================================
echo   Phishing URL Detection Platform Demo
echo ========================================
echo.

echo [1/4] Checking Python installation...
py --version >nul 2>&1
if errorlevel 1 (
    echo ERROR: Python is not installed or not in PATH
    echo Please install Python 3.8+ and try again
    echo.
    pause
    exit /b 1
)
echo ✓ Python found: 
py --version

echo.
echo [2/4] Setting up backend environment...
cd backend
if not exist .venv (
    echo Creating virtual environment...
    py -m venv .venv
    if errorlevel 1 (
        echo ERROR: Failed to create virtual environment
        pause
        exit /b 1
    )
)

echo Activating virtual environment and installing dependencies...
call .venv\Scripts\activate.bat
if errorlevel 1 (
    echo ERROR: Failed to activate virtual environment
    pause
    exit /b 1
)

echo Installing Python dependencies...
pip install -r requirements.txt
if errorlevel 1 (
    echo ERROR: Failed to install Python dependencies
    pause
    exit /b 1
)

echo.
echo [3/4] Starting backend server...
echo Starting FastAPI backend on http://localhost:8000
start "Backend Server" cmd /k "cd /d %CD% && call .venv\Scripts\activate.bat && uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload"

echo.
echo [4/4] Starting frontend development server...
cd ..\frontend
echo Installing Node.js dependencies...
npm install
if errorlevel 1 (
    echo ERROR: Failed to install Node.js dependencies
    pause
    exit /b 1
)

echo Starting React frontend on http://localhost:3000
start "Frontend Server" cmd /k "cd /d %CD% && npm start"

echo.
echo ========================================
echo           Demo is starting up!
echo ========================================
echo.
echo ✓ Backend API:     http://localhost:8000
echo ✓ Frontend UI:     http://localhost:3000
echo ✓ API Docs:        http://localhost:8000/docs
echo.
echo Both servers are starting in separate windows.
echo Please wait a moment for them to fully load.
echo.
echo Press any key to close this window...
pause >nul 