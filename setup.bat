@echo off
echo Setting up Cafe Fausse Full-Stack Application...
echo.

echo Installing root dependencies...
npm install

echo.
echo Installing frontend dependencies...
cd frontend
npm install
cd ..

echo.
echo Installing backend dependencies...
cd backend
pip install -r requirements.txt
cd ..

echo.
echo Setup complete!
echo.
echo Next steps:
echo 1. Set up PostgreSQL database:
echo    - Create database: createdb cafe_fausse
echo    - Run schema: psql cafe_fausse < database/schema.sql
echo.
echo 2. Create backend/.env file with your database URL:
echo    DATABASE_URL=postgresql://username:password@localhost/cafe_fausse
echo.
echo 3. Start the application:
echo    npm run dev
echo.
echo Frontend will be available at: http://localhost:3000
echo Backend API will be available at: http://localhost:5000
echo.
pause
