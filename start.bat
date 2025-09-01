@echo off
echo Starting Cafe Fausse Application...
echo.

echo Installing dependencies if needed...
cd backend
pip install flask flask-cors flask-sqlalchemy
cd ..

echo.
echo Starting backend server...
start "Backend" cmd /k "cd backend && python app.py"

timeout /t 3

echo Starting frontend server...
start "Frontend" cmd /k "cd frontend && npm start"

echo.
echo Application starting...
echo Frontend: http://localhost:3000
echo Backend: http://localhost:5000
echo.
pause
